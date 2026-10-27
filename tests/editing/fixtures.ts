import { test as base, expect, type Page, type Locator, type Dialog } from '@playwright/test';
import { SITE_CONTENT_DEFAULTS, type SitePageKey } from '../../lib/site-content';
import { readEditableText } from '../../lib/editable-text';

type MockContent = {
  pages: typeof SITE_CONTENT_DEFAULTS;
  writes: Array<{ key: string; content: unknown }>;
};

// Every browser request to the content/auth service is intercepted. Tests never
// sign in to a real account or write to the public website.
export const test = base.extend<{ content: MockContent }>({
  content: async ({ context }, provideContent) => {
    const pages = structuredClone(SITE_CONTENT_DEFAULTS);
    pages.home.hero.description = 'I am a ';
    const writes: MockContent['writes'] = [];
    const versions = new Map<string, number>();
    let news = {
      id: 'test-news', slug: 'test-news', title: 'I am a ', body: 'First line\nSecond line',
      published: true, published_at: '2026-10-27T12:00:00Z',
      created_at: '2026-10-27T12:00:00Z', updated_at: '2026-10-27T12:00:00Z',
    };
    const user = { id: 'test-admin', email: 'editor@example.invalid', aud: 'authenticated', role: 'authenticated' };
    await context.routeWebSocket('**/*.supabase.co/**', (socket) => socket.close());
    await context.route('**/*.supabase.co/**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const respond = (json: unknown) => route.fulfill({ json });
      const row = (value: unknown) => respond(request.headers().accept?.includes('vnd.pgrst.object') ? value : [value]);
      if (url.pathname === '/auth/v1/token') {
        const payload = Buffer.from(JSON.stringify({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url');
        return respond({ access_token: `eyJhbGciOiJIUzI1NiJ9.${payload}.test`, refresh_token: 'test-only', token_type: 'bearer', expires_in: 3600, user });
      }
      if (url.pathname === '/auth/v1/user') return respond(user);
      if (url.pathname === '/rest/v1/site_admins') return row({ email: user.email, role: 'owner' });
      if (url.pathname === '/rest/v1/site_pages') {
        const key = url.searchParams.get('page_key')?.replace(/^eq\./, '') as SitePageKey;
        if (!key || !(key in pages)) throw new Error(`Unexpected test page: ${key}`);
        if (request.method() === 'PATCH') {
          const { content } = request.postDataJSON();
          Object.assign(pages, { [key]: content });
          versions.set(key, (versions.get(key) ?? 1) + 1);
          writes.push({ key, content });
        }
        return row({ page_key: key, content: pages[key], version: versions.get(key) ?? 1, updated_at: new Date().toISOString() });
      }
      if (url.pathname === '/rest/v1/news_posts') {
        if (request.method() === 'PATCH' || request.method() === 'POST') {
          news = { ...news, ...request.postDataJSON() };
          writes.push({ key: 'news-post', content: news });
        }
        return row(news);
      }
      // No unknown request may fall through to production.
      await route.abort();
    });
    await provideContent({ pages, writes });
  },
});

export { expect };

export async function startEditing(page: Page) {
  await page.getByRole('button', { name: 'Edit Page', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Email', { exact: true }).fill('editor@example.invalid');
  await dialog.getByLabel('Password', { exact: true }).fill('not-a-real-password');
  await dialog.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('toolbar', { name: 'Page editing controls' })).toBeVisible();
}

export async function expectText(field: Locator, text: string) {
  await expect.poll(async () => {
    const editing = await field.getAttribute('contenteditable');
    return editing === 'plaintext-only'
      ? field.evaluate(readEditableText)
      : field.innerText();
  }).toBe(text);
}

export async function cancelEditing(page: Page) {
  const accept = (dialog: Dialog) => dialog.accept();
  page.on('dialog', accept);
  try {
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Edit Page', exact: true })).toBeVisible();
  } finally {
    page.off('dialog', accept);
  }
}
