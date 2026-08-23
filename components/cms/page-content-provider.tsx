'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { contentRepository } from '@/lib/content-repository';
import { useCmsAdmin } from '@/components/cms/cms-admin-provider';

type PendingImage = { file: File; previewUrl: string };

type PageContentContextValue<T> = {
  pageKey: string;
  content: T;
  editMode: boolean;
  setContent: (content: T | ((current: T) => T)) => void;
  getValue: (path: string) => unknown;
  setValue: (path: string, value: unknown) => void;
  selectImage: (path: string, file: File) => void;
  removeImage: (path: string) => void;
  getImageUrl: (path: string) => string;
};

const PageContentContext = createContext<PageContentContextValue<unknown> | null>(null);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getAtPath(value: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current === null || typeof current !== 'object') return undefined;
    return (current as Record<string, unknown>)[segment];
  }, value);
}

function setAtPath<T>(value: T, path: string, nextValue: unknown): T {
  const result = clone(value);
  const segments = path.split('.');
  let cursor: Record<string, unknown> = result as Record<string, unknown>;
  segments.slice(0, -1).forEach((segment) => {
    cursor = cursor[segment] as Record<string, unknown>;
  });
  cursor[segments.at(-1)!] = nextValue;
  return result;
}

export function PageContentProvider<T>({
  pageKey,
  initialContent,
  children,
}: {
  pageKey: string;
  initialContent: T;
  children: ReactNode;
}) {
  const { editMode, registerEditor } = useCmsAdmin();
  const [content, setContentState] = useState<T>(() => clone(initialContent));
  const [savedContent, setSavedContent] = useState<T>(() => clone(initialContent));
  const [version, setVersion] = useState(1);
  const [pendingImages, setPendingImages] = useState<Record<string, PendingImage>>({});
  const contentRef = useRef(content);
  const savedRef = useRef(savedContent);
  const versionRef = useRef(version);
  const pendingRef = useRef(pendingImages);

  useEffect(() => {
    contentRef.current = content;
    savedRef.current = savedContent;
    versionRef.current = version;
    pendingRef.current = pendingImages;
  }, [content, pendingImages, savedContent, version]);

  const setContent = useCallback((next: T | ((current: T) => T)) => {
    setContentState((current) => clone(typeof next === 'function' ? (next as (value: T) => T)(current) : next));
  }, []);

  useEffect(() => {
    let active = true;
    const cacheKey = `sail-site-page-v1:${pageKey}`;
    const cacheTimer = window.setTimeout(() => {
      try {
        const cached = window.localStorage.getItem(cacheKey);
        if (cached && active) {
          const parsed = JSON.parse(cached) as { content: T; version: number };
          setContentState(clone(parsed.content));
          setSavedContent(clone(parsed.content));
          setVersion(parsed.version);
        }
      } catch {
        // Live data below remains authoritative when local storage is unavailable.
      }
    }, 0);

    void contentRepository.getPage<T>(pageKey).then((record) => {
      if (!active || !record) return;
      setContentState(clone(record.content));
      setSavedContent(clone(record.content));
      setVersion(record.version);
      try {
        window.localStorage.setItem(cacheKey, JSON.stringify({ content: record.content, version: record.version }));
      } catch {
        // Ignore cache failures.
      }
    }).catch(() => undefined);

    const unsubscribe = contentRepository.subscribePage<T>(pageKey, (record) => {
      if (!active) return;
      const dirty = JSON.stringify(contentRef.current) !== JSON.stringify(savedRef.current) || Object.keys(pendingRef.current).length > 0;
      if (dirty) return;
      setContentState(clone(record.content));
      setSavedContent(clone(record.content));
      setVersion(record.version);
      try {
        window.localStorage.setItem(cacheKey, JSON.stringify({ content: record.content, version: record.version }));
      } catch {
        // Ignore cache failures.
      }
    });

    return () => {
      active = false;
      window.clearTimeout(cacheTimer);
      unsubscribe();
    };
  }, [pageKey]);

  const revokePendingImages = useCallback(() => {
    Object.values(pendingRef.current).forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
    setPendingImages({});
  }, []);

  useEffect(() => () => {
    Object.values(pendingRef.current).forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
  }, []);

  const isDirty = useCallback(
    () => JSON.stringify(contentRef.current) !== JSON.stringify(savedRef.current) || Object.keys(pendingRef.current).length > 0,
    [],
  );

  const save = useCallback(async () => {
    let nextContent = clone(contentRef.current);
    for (const [path, pending] of Object.entries(pendingRef.current)) {
      const uploadedPath = await contentRepository.uploadImage(pageKey, path, pending.file);
      nextContent = setAtPath(nextContent, path, uploadedPath);
    }

    const record = await contentRepository.savePage(pageKey, nextContent, versionRef.current);
    revokePendingImages();
    setContentState(clone(record.content));
    setSavedContent(clone(record.content));
    setVersion(record.version);
    try {
      window.localStorage.setItem(`sail-site-page-v1:${pageKey}`, JSON.stringify({ content: record.content, version: record.version }));
    } catch {
      // Ignore cache failures.
    }
  }, [pageKey, revokePendingImages]);

  const cancel = useCallback(() => {
    revokePendingImages();
    setContentState(clone(savedRef.current));
  }, [revokePendingImages]);

  useEffect(() => registerEditor(`page:${pageKey}`, { isDirty, save, cancel }), [cancel, isDirty, pageKey, registerEditor, save]);

  const getValue = useCallback((path: string) => getAtPath(content, path), [content]);
  const setValue = useCallback((path: string, value: unknown) => {
    setContentState((current) => setAtPath(current, path, value));
  }, []);

  const selectImage = useCallback((path: string, file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPendingImages((current) => {
      if (current[path]) URL.revokeObjectURL(current[path].previewUrl);
      return { ...current, [path]: { file, previewUrl } };
    });
  }, []);

  const removeImage = useCallback((path: string) => {
    setPendingImages((current) => {
      if (current[path]) URL.revokeObjectURL(current[path].previewUrl);
      const next = { ...current };
      delete next[path];
      return next;
    });
    setContentState((current) => setAtPath(current, path, ''));
  }, []);

  const getImageUrl = useCallback((path: string) => {
    const pending = pendingImages[path];
    if (pending) return pending.previewUrl;
    return contentRepository.getImageUrl(String(getAtPath(content, path) ?? ''));
  }, [content, pendingImages]);

  const value: PageContentContextValue<T> = {
    pageKey,
    content,
    editMode,
    setContent,
    getValue,
    setValue,
    selectImage,
    removeImage,
    getImageUrl,
  };

  return <PageContentContext.Provider value={value as PageContentContextValue<unknown>}>{children}</PageContentContext.Provider>;
}

export function usePageContent<T>() {
  const context = useContext(PageContentContext);
  if (!context) throw new Error('usePageContent must be used inside PageContentProvider.');
  return context as PageContentContextValue<T>;
}
