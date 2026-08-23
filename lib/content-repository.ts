import type { RealtimeChannel } from '@supabase/supabase-js';
import { publicSupabase, supabase, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase';

export type SitePageRecord<T> = {
  pageKey: string;
  content: T;
  version: number;
  updatedAt: string;
};

type SitePageRow = {
  page_key: string;
  content: unknown;
  version: number;
  updated_at: string;
};

export interface ContentRepository {
  getPage<T>(pageKey: string): Promise<SitePageRecord<T> | null>;
  savePage<T>(pageKey: string, content: T, expectedVersion: number): Promise<SitePageRecord<T>>;
  subscribePage<T>(pageKey: string, onChange: (record: SitePageRecord<T>) => void): () => void;
  uploadImage(pageKey: string, fieldPath: string, file: File): Promise<string>;
  getImageUrl(path: string): string;
}

export function mergeContentDefaults<T>(defaults: T, stored: T): T {
  if (Array.isArray(defaults) || Array.isArray(stored)) return stored;
  if (
    defaults === null || stored === null ||
    typeof defaults !== 'object' || typeof stored !== 'object'
  ) return stored;

  const merged: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
  for (const [key, value] of Object.entries(stored as Record<string, unknown>)) {
    const fallbackValue = (defaults as Record<string, unknown>)[key];
    merged[key] = fallbackValue === undefined
      ? value
      : mergeContentDefaults(fallbackValue, value);
  }
  return merged as T;
}

function toRecord<T>(row: SitePageRow): SitePageRecord<T> {
  return {
    pageKey: row.page_key,
    content: row.content as T,
    version: row.version,
    updatedAt: row.updated_at,
  };
}

function safeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'image';
}

class SupabaseContentRepository implements ContentRepository {
  async getPage<T>(pageKey: string): Promise<SitePageRecord<T> | null> {
    const { data, error } = await publicSupabase
      .from('site_pages')
      .select('page_key, content, version, updated_at')
      .eq('page_key', pageKey)
      .maybeSingle();

    if (error) throw error;
    return data ? toRecord<T>(data as SitePageRow) : null;
  }

  async savePage<T>(pageKey: string, content: T, expectedVersion: number): Promise<SitePageRecord<T>> {
    const { data, error } = await supabase
      .from('site_pages')
      .update({ content })
      .eq('page_key', pageKey)
      .eq('version', expectedVersion)
      .select('page_key, content, version, updated_at')
      .maybeSingle();

    if (error) throw error;
    if (data) return toRecord<T>(data as SitePageRow);

    if (expectedVersion === 1) {
      const { data: inserted, error: insertError } = await supabase
        .from('site_pages')
        .insert({ page_key: pageKey, content, version: 1 })
        .select('page_key, content, version, updated_at')
        .maybeSingle();
      if (!insertError && inserted) return toRecord<T>(inserted as SitePageRow);
    }

    throw new Error('This page was changed in another browser. Reload the page before saving again.');
  }

  subscribePage<T>(pageKey: string, onChange: (record: SitePageRecord<T>) => void) {
    const channel: RealtimeChannel = publicSupabase
      .channel(`site-page-${pageKey}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'site_pages', filter: `page_key=eq.${pageKey}` },
        (payload) => onChange(toRecord<T>(payload.new as SitePageRow)),
      )
      .subscribe();

    return () => {
      void publicSupabase.removeChannel(channel);
    };
  }

  async uploadImage(pageKey: string, fieldPath: string, file: File) {
    if (!file.type.startsWith('image/')) throw new Error('Only image files can be uploaded.');
    if (file.size > 10 * 1024 * 1024) throw new Error('Images must be 10 MB or smaller.');

    const extension = safeSegment(file.name.split('.').pop() || file.type.split('/').pop() || 'jpg');
    const unique = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const path = `${safeSegment(pageKey)}/${safeSegment(fieldPath)}-${unique}.${extension}`;
    const { error } = await supabase.storage.from('site-media').upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    });

    if (error) throw error;
    return path;
  }

  getImageUrl(path: string) {
    if (!path || path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
      return path;
    }
    return publicSupabase.storage.from('site-media').getPublicUrl(path).data.publicUrl;
  }
}

export const contentRepository: ContentRepository = new SupabaseContentRepository();

export async function getBuildPageContent<T>(pageKey: string, fallback: T): Promise<T> {
  try {
    const url = new URL(`${SUPABASE_URL}/rest/v1/site_pages`);
    url.searchParams.set('select', 'content');
    url.searchParams.set('page_key', `eq.${pageKey}`);
    url.searchParams.set('limit', '1');

    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return fallback;
    const rows = await response.json() as Array<{ content?: T }>;
    return rows[0]?.content ? mergeContentDefaults(fallback, rows[0].content) : fallback;
  } catch {
    return fallback;
  }
}
