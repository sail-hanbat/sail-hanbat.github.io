# SAIL — Safe & Applied Intelligence Lab

Official website for SAIL at the Department of Artificial Intelligence Software,
Hanbat National University, Sejong Joint Campus.

## Development

```bash
npm install
npm run dev
```

The production site is statically exported to the tracked `docs/` directory:

```bash
npm run build:pages
git add -f docs
```

GitHub Pages serves that directory from the `main` branch.

## Design note

The site takes high-level inspiration from the editorial layout and geometric
visual rhythm of the [Stanford AI Lab website](https://ai.stanford.edu/). All
code, copy, colors, and graphic treatments in this repository are original to
SAIL.
