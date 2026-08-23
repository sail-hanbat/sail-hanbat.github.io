# SAIL — Safe & Applied Intelligence Lab

Official website for SAIL at the Department of Artificial Intelligence Software,
Hanbat National University, Sejong Joint Campus.

## Development

```bash
npm install
npm run dev
```

Create a production export with:

```bash
npm run build
```

GitHub Pages is deployed by `.github/workflows/deploy-pages.yml` on every push
and every five minutes. The scheduled build refreshes static HTML and search or
link-preview metadata from the current public content.

## Inline content management

Every public page includes an `Edit Page` button. Approved administrators sign
in with Supabase Auth, edit text and images in the page's normal layout, and use
the floating `Save` or `Cancel` controls. Saved content is visible immediately
through client-side fetching and Realtime subscriptions.

Page content is stored in `public.site_pages`, uploaded images in the public
`site-media` bucket, and news in `public.news_posts`. Row-level security allows
public reads while restricting writes to emails in `public.site_admins`.
Database changes are recorded under `supabase/migrations/`.

The UI depends only on the `ContentRepository` interface in
`lib/content-repository.ts`. To move from Supabase to a NAS or another server,
implement that interface against the new service and replace the exported
repository; page components and inline editing controls do not need to change.

## Design note

The site takes high-level inspiration from the editorial layout and geometric
visual rhythm of the [Stanford AI Lab website](https://ai.stanford.edu/). All
code, copy, colors, and graphic treatments in this repository are original to
SAIL.
