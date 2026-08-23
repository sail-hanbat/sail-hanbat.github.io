'use client';

import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { formatNewsDate, type NewsRow } from '@/lib/news';
import { newsRepository } from '@/lib/news-repository';
import { supabase } from '@/lib/supabase';

type AdminRole = 'owner' | 'admin';

type AdminRow = {
  email: string;
  role: AdminRole;
  created_at: string;
  created_by: string | null;
};

type EditorState = {
  id: string | null;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  publishedAt: string;
};

const OWNER_EMAIL = 'ajs0420@hanbat.ac.kr';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function emptyEditor(): EditorState {
  return {
    id: null,
    title: '',
    slug: '',
    body: '',
    published: true,
    publishedAt: today(),
  };
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

function dateInput(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? today() : date.toISOString().slice(0, 10);
}

export function NewsAdmin() {
  const searchParams = useSearchParams();
  const requestedEditSlug = searchParams.get('edit') ?? '';
  const handledEditRequest = useRef('');
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [accessReady, setAccessReady] = useState(false);
  const [profile, setProfile] = useState<AdminRow | null>(null);
  const [posts, setPosts] = useState<NewsRow[]>([]);
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [editor, setEditor] = useState<EditorState>(emptyEditor);
  const [authEmail, setAuthEmail] = useState(OWNER_EMAIL);
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('admin');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const currentEmail = session?.user.email?.toLowerCase() ?? '';
  const isOwner = profile?.role === 'owner';

  const clearNotice = () => {
    setMessage('');
    setError('');
  };

  const loadPosts = useCallback(async () => {
    try {
      setPosts(await newsRepository.listPosts({ includeUnpublished: true }));
    } catch (queryError) {
      setError(queryError instanceof Error ? queryError.message : 'News could not be loaded.');
    }
  }, []);

  const loadAdmins = useCallback(async () => {
    const { data, error: queryError } = await supabase
      .from('site_admins')
      .select('email, role, created_at, created_by')
      .order('created_at', { ascending: true });

    if (queryError) {
      setError(queryError.message);
      return;
    }
    setAdmins((data ?? []) as AdminRow[]);
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setProfile(null);
      setAccessReady(!data.session?.user.email);
      setAuthReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setProfile(null);
      setAccessReady(!nextSession?.user.email);
      setAuthReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    if (!currentEmail) return () => { active = false; };

    void supabase
      .from('site_admins')
      .select('email, role, created_at, created_by')
      .eq('email', currentEmail)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setProfile((data as AdminRow | null) ?? null);
        setAccessReady(true);
      });

    return () => { active = false; };
  }, [currentEmail]);

  useEffect(() => {
    if (!profile) return;
    const loadTimer = window.setTimeout(() => {
      void Promise.all([loadPosts(), loadAdmins()]);
    }, 0);

    const unsubscribeNews = newsRepository.subscribe(() => void loadPosts(), 'news-admin-posts');
    const adminChannel = supabase
      .channel('news-admin-list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_admins' },
        () => void loadAdmins(),
      )
      .subscribe();

    return () => {
      window.clearTimeout(loadTimer);
      unsubscribeNews();
      void supabase.removeChannel(adminChannel);
    };
  }, [loadAdmins, loadPosts, profile]);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.published_at.localeCompare(a.published_at)),
    [posts],
  );

  useEffect(() => {
    if (!profile || !requestedEditSlug || posts.length === 0) return;
    const requestKey = `${profile.email}:${requestedEditSlug}`;
    if (handledEditRequest.current === requestKey) return;
    handledEditRequest.current = requestKey;

    const requestedPost = posts.find((post) => post.slug === requestedEditSlug);
    const openTimer = window.setTimeout(() => {
      if (!requestedPost) {
        setError('The requested news post could not be found.');
        return;
      }
      setMessage('');
      setError('');
      setEditor({
        id: requestedPost.id,
        title: requestedPost.title,
        slug: requestedPost.slug,
        body: requestedPost.body,
        published: requestedPost.published,
        publishedAt: dateInput(requestedPost.published_at),
      });
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 0);

    return () => window.clearTimeout(openTimer);
  }, [posts, profile, requestedEditSlug]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearNotice();
    setBusy(true);
    const email = authEmail.trim().toLowerCase();

    if (authMode === 'signup') {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password: authPassword,
        options: {
          emailRedirectTo: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        },
      });

      if (authError) setError(authError.message);
      else if (data.session) setMessage('Account created and signed in.');
      else setMessage('Check your email and open the confirmation link, then return here to sign in.');
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: authPassword,
      });
      if (authError) setError(authError.message);
    }
    setBusy(false);
  }

  function editPost(post: NewsRow) {
    clearNotice();
    setEditor({
      id: post.id,
      title: post.title,
      slug: post.slug,
      body: post.body,
      published: post.published,
      publishedAt: dateInput(post.published_at),
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }

  async function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearNotice();
    setBusy(true);

    const generatedSlug = slugify(editor.slug || editor.title) || `news-${Date.now()}`;
    const payload = {
      title: editor.title.trim(),
      slug: generatedSlug,
      body: editor.body.trim(),
      published: editor.published,
      published_at: new Date(`${editor.publishedAt}T12:00:00Z`).toISOString(),
    };

    try {
      await newsRepository.savePost(payload, editor.id ?? undefined);
      setMessage(editor.id ? 'News post updated.' : 'News post published.');
      setEditor(emptyEditor());
      await loadPosts();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'News could not be saved.');
    }
    setBusy(false);
  }

  async function deletePost(post: NewsRow) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    clearNotice();
    setBusy(true);
    try {
      await newsRepository.deletePost(post.id);
      if (editor.id === post.id) setEditor(emptyEditor());
      setMessage('News post deleted.');
      await loadPosts();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'News could not be deleted.');
    }
    setBusy(false);
  }

  async function addAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearNotice();
    setBusy(true);
    const email = newAdminEmail.trim().toLowerCase();
    const { error: insertError } = await supabase.from('site_admins').insert({
      email,
      role: newAdminRole,
      created_by: currentEmail,
    });
    if (insertError) setError(insertError.message);
    else {
      setNewAdminEmail('');
      setNewAdminRole('admin');
      setMessage(`${email} added. They can now create an account on this page.`);
      await loadAdmins();
    }
    setBusy(false);
  }

  async function changeAdminRole(admin: AdminRow, role: AdminRole) {
    clearNotice();
    setBusy(true);
    const { error: updateError } = await supabase
      .from('site_admins')
      .update({ role })
      .eq('email', admin.email);
    if (updateError) setError(updateError.message);
    else {
      setMessage(`${admin.email} is now ${role}.`);
      await loadAdmins();
    }
    setBusy(false);
  }

  async function removeAdmin(admin: AdminRow) {
    if (!window.confirm(`Remove administrator ${admin.email}?`)) return;
    clearNotice();
    setBusy(true);
    const { error: deleteError } = await supabase
      .from('site_admins')
      .delete()
      .eq('email', admin.email);
    if (deleteError) setError(deleteError.message);
    else {
      setMessage(`${admin.email} removed.`);
      await loadAdmins();
    }
    setBusy(false);
  }

  if (!authReady || (session && !accessReady)) {
    return <section className="admin-shell"><div className="container"><p className="news-status">Checking access…</p></div></section>;
  }

  if (!session) {
    return (
      <section className="admin-shell">
        <div className="container">
          <form className="admin-panel admin-login" onSubmit={handleAuth}>
            <h2>{authMode === 'signin' ? 'Administrator sign in' : 'Create administrator account'}</h2>
            <p>
              Only email addresses approved by the SAIL owner can access the dashboard.
              The initial owner is <strong>{OWNER_EMAIL}</strong>. No password has been
              preassigned; on your first visit, create an account and choose your own password.
            </p>
            <label className="admin-field">
              <span>Email</span>
              <input type="email" required value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} autoComplete="email" />
            </label>
            <label className="admin-field">
              <span>Password</span>
              <input type="password" required minLength={6} value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'} />
            </label>
            {message && <p className="admin-message" role="status">{message}</p>}
            {error && <p className="admin-error" role="alert">{error}</p>}
            <div className="admin-actions">
              <button className="admin-button primary" type="submit" disabled={busy}>
                {busy ? 'Please wait…' : authMode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
              <button
                className="admin-button text-button"
                type="button"
                onClick={() => {
                  clearNotice();
                  setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                }}
              >
                {authMode === 'signin' ? 'First visit? Create account' : 'Already registered? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="admin-shell">
        <div className="container">
          <div className="admin-panel admin-login">
            <h2>Access not approved</h2>
            <p><strong>{currentEmail}</strong> is signed in but is not on the SAIL administrator list.</p>
            <button className="admin-button primary" type="button" onClick={() => void supabase.auth.signOut()}>Sign out</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <div className="container admin-dashboard">
        <div className="admin-toolbar">
          <div>
            <strong>{currentEmail}</strong>
            <span>{profile.role === 'owner' ? 'Owner' : 'Administrator'}</span>
          </div>
          <button className="admin-button secondary" type="button" onClick={() => void supabase.auth.signOut()}>Sign out</button>
        </div>

        {message && <p className="admin-message" role="status">{message}</p>}
        {error && <p className="admin-error" role="alert">{error}</p>}

        <div className="admin-layout">
          <form className="admin-panel admin-editor" onSubmit={savePost}>
            <div className="admin-panel-heading">
              <div>
                <h2>{editor.id ? 'Edit post' : 'New post'}</h2>
              </div>
              {editor.id && (
                <button className="admin-button secondary" type="button" onClick={() => setEditor(emptyEditor())}>New post</button>
              )}
            </div>
            <label className="admin-field">
              <span>Title</span>
              <input
                type="text"
                required
                maxLength={200}
                value={editor.title}
                onChange={(event) => setEditor((value) => ({
                  ...value,
                  title: event.target.value,
                }))}
              />
            </label>
            <div className="admin-grid">
              <label className="admin-field">
                <span>URL slug (optional)</span>
                <input type="text" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="Generated from the title" value={editor.slug} onChange={(event) => setEditor((value) => ({ ...value, slug: slugify(event.target.value) }))} />
              </label>
              <label className="admin-field">
                <span>Publication date</span>
                <input type="date" required value={editor.publishedAt} onChange={(event) => setEditor((value) => ({ ...value, publishedAt: event.target.value }))} />
              </label>
            </div>
            <label className="admin-field">
              <span>Content</span>
              <textarea required rows={16} value={editor.body} onChange={(event) => setEditor((value) => ({ ...value, body: event.target.value }))} />
              <small>Basic Markdown is supported: ## heading, ### heading, **bold**, links, and hyphen lists.</small>
            </label>
            <label className="admin-check">
              <input type="checkbox" checked={editor.published} onChange={(event) => setEditor((value) => ({ ...value, published: event.target.checked }))} />
              <span>Published — visible immediately on the website</span>
            </label>
            <button className="admin-button primary" type="submit" disabled={busy}>
              {busy ? 'Saving…' : editor.id ? 'Save changes' : 'Publish post'}
            </button>
          </form>

          <aside className="admin-panel admin-posts">
            <div className="admin-panel-heading">
              <div>
                <h2>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</h2>
              </div>
            </div>
            <div className="admin-post-list">
              {sortedPosts.map((post) => (
                <article className="admin-post-item" key={post.id}>
                  <div>
                    <span className={`admin-badge${post.published ? ' published' : ''}`}>{post.published ? 'Published' : 'Draft'}</span>
                    <h3>{post.title}</h3>
                    <time dateTime={post.published_at}>{formatNewsDate(post.published_at)}</time>
                  </div>
                  <div className="admin-actions">
                    <button className="admin-button secondary" type="button" onClick={() => editPost(post)}>Edit</button>
                    <button className="admin-button danger" type="button" onClick={() => void deletePost(post)} disabled={busy}>Delete</button>
                  </div>
                </article>
              ))}
              {posts.length === 0 && <p>No news posts yet.</p>}
            </div>
          </aside>
        </div>

        {isOwner && (
          <section className="admin-panel admin-manager">
            <div className="admin-panel-heading">
              <div>
                <h2>Administrators</h2>
              </div>
            </div>
            <form className="admin-add-form" onSubmit={addAdmin}>
              <label className="admin-field">
                <span>Email</span>
                <input type="email" required placeholder="name@hanbat.ac.kr" value={newAdminEmail} onChange={(event) => setNewAdminEmail(event.target.value)} />
              </label>
              <label className="admin-field">
                <span>Role</span>
                <select value={newAdminRole} onChange={(event) => setNewAdminRole(event.target.value as AdminRole)}>
                  <option value="admin">Administrator</option>
                  <option value="owner">Owner</option>
                </select>
              </label>
              <button className="admin-button primary" type="submit" disabled={busy}>Add administrator</button>
            </form>
            <div className="admin-list">
              {admins.map((admin) => (
                <div className="admin-row" key={admin.email}>
                  <div>
                    <strong>{admin.email}</strong>
                    {admin.email === currentEmail && <span className="admin-you">You</span>}
                  </div>
                  <select
                    aria-label={`Role for ${admin.email}`}
                    value={admin.role}
                    disabled={busy}
                    onChange={(event) => void changeAdminRole(admin, event.target.value as AdminRole)}
                  >
                    <option value="owner">Owner</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <button className="admin-button danger" type="button" disabled={busy} onClick={() => void removeAdmin(admin)}>Remove</button>
                </div>
              ))}
            </div>
            <p className="admin-help">Newly approved administrators create their own password on this page. At least one owner must always remain.</p>
          </section>
        )}
      </div>
    </section>
  );
}
