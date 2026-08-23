import type { RealtimeChannel } from '@supabase/supabase-js';
import type { NewsRow } from '@/lib/news';
import { publicSupabase, supabase } from '@/lib/supabase';

export type NewsPostInput = {
  title: string;
  slug: string;
  body: string;
  published: boolean;
  published_at: string;
};

export interface NewsRepository {
  listPosts(options?: { limit?: number; includeUnpublished?: boolean }): Promise<NewsRow[]>;
  getPostBySlug(slug: string, options?: { includeUnpublished?: boolean }): Promise<NewsRow | null>;
  savePost(input: NewsPostInput, id?: string): Promise<NewsRow>;
  deletePost(id: string): Promise<void>;
  subscribe(onChange: () => void, channelName: string): () => void;
}

const NEWS_COLUMNS = 'id, slug, title, body, published, published_at, created_at, updated_at';

class SupabaseNewsRepository implements NewsRepository {
  async listPosts(options: { limit?: number; includeUnpublished?: boolean } = {}) {
    const client = options.includeUnpublished ? supabase : publicSupabase;
    let query = client
      .from('news_posts')
      .select(NEWS_COLUMNS)
      .order('published_at', { ascending: false });

    if (!options.includeUnpublished) query = query.eq('published', true);
    if (options.limit) query = query.limit(options.limit);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as NewsRow[];
  }

  async getPostBySlug(slug: string, options: { includeUnpublished?: boolean } = {}) {
    const client = options.includeUnpublished ? supabase : publicSupabase;
    let query = client
      .from('news_posts')
      .select(NEWS_COLUMNS)
      .eq('slug', slug);

    if (!options.includeUnpublished) query = query.eq('published', true);
    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    return (data as NewsRow | null) ?? null;
  }

  async savePost(input: NewsPostInput, id?: string) {
    const operation = id
      ? supabase.from('news_posts').update(input).eq('id', id)
      : supabase.from('news_posts').insert(input);
    const { data, error } = await operation.select(NEWS_COLUMNS).single();
    if (error) throw error;
    return data as NewsRow;
  }

  async deletePost(id: string) {
    const { error } = await supabase.from('news_posts').delete().eq('id', id);
    if (error) throw error;
  }

  subscribe(onChange: () => void, channelName: string) {
    const channel: RealtimeChannel = publicSupabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news_posts' },
        onChange,
      )
      .subscribe();

    return () => {
      void publicSupabase.removeChannel(channel);
    };
  }
}

export const newsRepository: NewsRepository = new SupabaseNewsRepository();
