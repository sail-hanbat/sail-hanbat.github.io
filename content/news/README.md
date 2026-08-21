# Publishing SAIL news

Add one Markdown file per article in this folder. Use a lowercase, hyphenated filename because it becomes the article URL.

```md
---
title: Your article title
date: 2026-08-21
---

Write the article here. Paragraphs, **bold text**, links, headings, and bullet lists are supported.
```

The News page lists every article by date. The homepage automatically shows the five newest articles. After adding a post, run `npm run build:pages`, then commit and push the post together with the regenerated `docs` folder.
