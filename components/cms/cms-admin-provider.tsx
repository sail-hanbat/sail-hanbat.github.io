'use client';

import type { FormEvent, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

type AdminRole = 'owner' | 'admin';

type AdminProfile = {
  email: string;
  role: AdminRole;
};

type EditorRegistration = {
  isDirty: () => boolean;
  save: () => Promise<void>;
  cancel: () => void;
};

type CmsAdminContextValue = {
  editMode: boolean;
  isAdmin: boolean;
  registerEditor: (id: string, editor: EditorRegistration) => () => void;
  requestEdit: () => void;
  signOut: () => Promise<void>;
};

const CmsAdminContext = createContext<CmsAdminContextValue | null>(null);

const OWNER_EMAIL = 'ajs0420@hanbat.ac.kr';

export function CmsAdminProvider({ children }: { children: ReactNode }) {
  const editors = useRef(new Map<string, EditorRegistration>());
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const editRequested = useRef(false);

  const loadProfile = useCallback(async (nextEmail: string) => {
    if (!nextEmail) {
      setProfile(null);
      setUserEmail('');
      return;
    }

    setUserEmail(nextEmail);
    const { data } = await supabase
      .from('site_admins')
      .select('email, role')
      .eq('email', nextEmail)
      .maybeSingle();
    const nextProfile = (data as AdminProfile | null) ?? null;
    setProfile(nextProfile);

    if (nextProfile && editRequested.current) {
      editRequested.current = false;
      setLoginOpen(false);
      setEditMode(true);
    }
  }, []);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      void loadProfile(data.user?.email?.toLowerCase() ?? '');
    });

    const { data } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => {
        void supabase.auth.getUser().then(({ data: userData }) => {
          void loadProfile(userData.user?.email?.toLowerCase() ?? '');
        });
      }, 0);
    });

    return () => data.subscription.unsubscribe();
  }, [loadProfile]);

  const hasDirtyEditors = useCallback(
    () => [...editors.current.values()].some((editor) => editor.isDirty()),
    [],
  );

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!editMode || !hasDirtyEditors()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [editMode, hasDirtyEditors]);

  const registerEditor = useCallback((id: string, editor: EditorRegistration) => {
    editors.current.set(id, editor);
    return () => editors.current.delete(id);
  }, []);

  const requestEdit = useCallback(() => {
    setSaveMessage('');
    if (profile) {
      setEditMode(true);
      return;
    }
    editRequested.current = true;
    setMessage('');
    setError(userEmail ? 'This account is not approved as a SAIL administrator.' : '');
    setLoginOpen(true);
  }, [profile, userEmail]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    const authEmail = email.trim().toLowerCase();

    if (authMode === 'signup') {
      const { data, error: authError } = await supabase.auth.signUp({
        email: authEmail,
        password,
        options: { emailRedirectTo: window.location.href },
      });
      if (authError) setError(authError.message);
      else if (data.session) setMessage('Account created. Checking administrator access…');
      else setMessage('Check your email, confirm the account, and then sign in here.');
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password,
      });
      if (authError) setError(authError.message);
    }
    setBusy(false);
  }

  const saveAll = useCallback(async () => {
    const dirtyEditors = [...editors.current.values()].filter((editor) => editor.isDirty());
    if (dirtyEditors.length === 0) {
      setSaveMessage('No changes to save.');
      return;
    }

    setBusy(true);
    setSaveMessage('Saving…');
    try {
      for (const editor of dirtyEditors) await editor.save();
      setSaveMessage('Saved. The public page has been updated.');
      window.setTimeout(() => setSaveMessage(''), 3500);
    } catch (saveError) {
      setSaveMessage(saveError instanceof Error ? saveError.message : 'The page could not be saved.');
    } finally {
      setBusy(false);
    }
  }, []);

  const cancelAll = useCallback(() => {
    if (hasDirtyEditors() && !window.confirm('Discard all unsaved changes on this page?')) return;
    for (const editor of editors.current.values()) editor.cancel();
    setEditMode(false);
    setSaveMessage('');
  }, [hasDirtyEditors]);

  const signOut = useCallback(async () => {
    if (hasDirtyEditors() && !window.confirm('Discard unsaved changes and sign out?')) return;
    for (const editor of editors.current.values()) editor.cancel();
    setEditMode(false);
    await supabase.auth.signOut();
  }, [hasDirtyEditors]);

  const contextValue = useMemo<CmsAdminContextValue>(() => ({
    editMode,
    isAdmin: Boolean(profile),
    registerEditor,
    requestEdit,
    signOut,
  }), [editMode, profile, registerEditor, requestEdit, signOut]);

  return (
    <CmsAdminContext.Provider value={contextValue}>
      {children}

      {!editMode && (
        <button className="cms-edit-page-button" type="button" onClick={requestEdit}>
          Edit Page
        </button>
      )}

      {editMode && (
        <div className="cms-toolbar" role="toolbar" aria-label="Page editing controls">
          <div>
            <strong>Editing</strong>
            <span>{profile?.email}</span>
          </div>
          {saveMessage && <p role="status">{saveMessage}</p>}
          <button type="button" className="admin-button primary" disabled={busy} onClick={() => void saveAll()}>
            {busy ? 'Saving…' : 'Save'}
          </button>
          <button type="button" className="admin-button secondary" disabled={busy} onClick={cancelAll}>Cancel</button>
          <button type="button" className="admin-button text-button" disabled={busy} onClick={() => void signOut()}>Sign out</button>
        </div>
      )}

      {loginOpen && (
        <div className="cms-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setLoginOpen(false);
        }}>
          <form className="cms-login-modal" onSubmit={handleAuth} role="dialog" aria-modal="true" aria-labelledby="cms-login-title">
            <button className="cms-modal-close" type="button" aria-label="Close" onClick={() => setLoginOpen(false)}>×</button>
            <h2 id="cms-login-title">Administrator {authMode === 'signin' ? 'sign in' : 'account'}</h2>
            <p>Only administrators approved by the SAIL owner can edit the website.</p>
            <label className="admin-field">
              <span>Email</span>
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
            </label>
            <label className="admin-field">
              <span>Password</span>
              <input type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'} />
            </label>
            {message && <p className="admin-message" role="status">{message}</p>}
            {error && <p className="admin-error" role="alert">{error}</p>}
            <div className="admin-actions">
              <button className="admin-button primary" type="submit" disabled={busy}>{busy ? 'Please wait…' : authMode === 'signin' ? 'Sign in' : 'Create account'}</button>
              <button className="admin-button text-button" type="button" onClick={() => {
                setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                setMessage('');
                setError('');
              }}>
                {authMode === 'signin' ? 'First visit? Create account' : 'Already registered? Sign in'}
              </button>
            </div>
          </form>
        </div>
      )}
    </CmsAdminContext.Provider>
  );
}

export function useCmsAdmin() {
  const context = useContext(CmsAdminContext);
  if (!context) throw new Error('useCmsAdmin must be used inside CmsAdminProvider.');
  return context;
}
