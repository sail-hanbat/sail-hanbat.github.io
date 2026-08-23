'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCmsAdmin } from '@/components/cms/cms-admin-provider';
import { NewsBody } from '@/components/news-body';
import { formatNewsDate, newsRowToPost, type NewsPost } from '@/lib/news';
import { newsRepository } from '@/lib/news-repository';

type NewsDraft = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  body: string;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function dateInput(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? today() : parsed.toISOString().slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '');
}

function toDraft(post: NewsPost): NewsDraft {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: dateInput(post.date),
    body: post.body,
  };
}

function InlineNewsTitle({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  const onKeyDown = (event: KeyboardEvent<HTMLHeadingElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  return (
    <h1
      ref={ref}
      className="cms-editable-text"
      contentEditable
      suppressContentEditableWarning
      spellCheck
      onKeyDown={onKeyDown}
      onInput={(event) => onChange(event.currentTarget.innerText)}
    >
      {value}
    </h1>
  );
}

export function NewsPostClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') ?? '';
  const isNew = searchParams.get('new') === '1';
  const { editMode, registerEditor, requestEdit } = useCmsAdmin();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [draft, setDraft] = useState<NewsDraft | null>(null);
  const [savedDraft, setSavedDraft] = useState<NewsDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const autoEditRequested = useRef(false);

  const loadPost = useCallback(async () => {
    if (isNew) {
      const blank: NewsDraft = { slug: '', title: 'New News Post', body: '', date: today() };
      setPost(null);
      setDraft(blank);
      setSavedDraft(blank);
      setLoading(false);
      return;
    }

    if (!slug) {
      setPost(null);
      setDraft(null);
      setSavedDraft(null);
      setLoading(false);
      return;
    }

    const data = await newsRepository.getPostBySlug(slug).catch(() => null);
    const nextPost = data ? newsRowToPost(data) : null;
    setPost(nextPost);
    setDraft(nextPost ? toDraft(nextPost) : null);
    setSavedDraft(nextPost ? toDraft(nextPost) : null);
    setLoading(false);
  }, [isNew, slug]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => void loadPost(), 0);
    const unsubscribe = newsRepository.subscribe(() => {
      if (!editMode) void loadPost();
    }, `news-post-${slug || (isNew ? 'new' : 'missing')}`);

    return () => {
      window.clearTimeout(loadTimer);
      unsubscribe();
    };
  }, [editMode, isNew, loadPost, slug]);

  useEffect(() => {
    if (!isNew || autoEditRequested.current) return;
    autoEditRequested.current = true;
    requestEdit();
  }, [isNew, requestEdit]);

  const isDirty = useCallback(() => {
    if (isNew) return true;
    return JSON.stringify(draft) !== JSON.stringify(savedDraft);
  }, [draft, isNew, savedDraft]);

  const save = useCallback(async () => {
    const current = draft;
    if (!current) return;
    const title = current.title.trim();
    const body = current.body.trim();
    if (!title) throw new Error('Enter a news title before saving.');
    if (!body) throw new Error('Enter news content before saving.');

    const nextSlug = slugify(current.slug || title) || `news-${Date.now()}`;
    const payload = {
      title,
      slug: nextSlug,
      body,
      published: true,
      published_at: new Date(`${current.date}T12:00:00Z`).toISOString(),
    };

    const data = await newsRepository.savePost(payload, current.id);
    const nextPost = newsRowToPost(data);
    const nextDraft = toDraft(nextPost);
    setPost(nextPost);
    setDraft(nextDraft);
    setSavedDraft(nextDraft);
    if (isNew) router.replace(`/activities/news/post/?slug=${encodeURIComponent(nextPost.slug)}`, { scroll: false });
  }, [draft, isNew, router]);

  const cancel = useCallback(() => {
    if (isNew) {
      router.push('/activities/news/');
      return;
    }
    setDraft(savedDraft ? { ...savedDraft } : null);
  }, [isNew, router, savedDraft]);

  useEffect(
    () => registerEditor(`news:${isNew ? 'new' : slug || 'missing'}`, { isDirty, save, cancel }),
    [cancel, isDirty, isNew, registerEditor, save, slug],
  );

  if (loading) return <p className="news-status">Loading news…</p>;

  if ((!post && !isNew) || !draft) {
    return (
      <div className="news-status">
        <p>This news post is not available.</p>
        <Link className="arrow" href="/activities/news/">Back to News</Link>
      </div>
    );
  }

  return (
    <>
      <header className="news-article-header">
        <div className="container article-container">
          <Link className="back-link" href="/activities/news/">← News</Link>
          {editMode ? (
            <InlineNewsTitle value={draft.title} onChange={(title) => setDraft((current) => current ? { ...current, title } : current)} />
          ) : (
            <h1>{draft.title}</h1>
          )}
          <div className="news-article-meta">
            {editMode ? (
              <label className="cms-news-date">
                <span>Publication date</span>
                <input type="date" value={draft.date} onChange={(event) => setDraft((current) => current ? { ...current, date: event.target.value } : current)} />
              </label>
            ) : (
              <time dateTime={draft.date}>{formatNewsDate(draft.date)}</time>
            )}
            {!editMode && (
              <button className="admin-button primary news-edit-button" type="button" onClick={requestEdit}>
                Edit News
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="container article-container news-article-content">
        {editMode ? (
          <textarea
            className="cms-news-body-editor"
            aria-label="News content"
            value={draft.body}
            placeholder="Write the news content here. Basic Markdown is supported."
            onChange={(event) => setDraft((current) => current ? { ...current, body: event.target.value } : current)}
          />
        ) : (
          <NewsBody body={draft.body} />
        )}
      </div>
    </>
  );
}
