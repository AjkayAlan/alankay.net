# alankay.net

Personal website of **Alan Kay** — a technology enthusiast and professional geek.

A lightweight, fast, static site built with [Astro](https://astro.build) and
deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Design

The site is built on one metaphor: **DNA has four bases, and Alan's story has
four building blocks** — Personal, Professional, Background, and Values. Each
building block maps to a letter (P·C·B·V) and a fixed color. Full color appears
only in that DNA context so it stays meaningful. A spinning 3D double helix
(canvas) is the signature element; a light/dark theme follows the system
preference with a manual toggle. See [`docs/DESIGN.md`](docs/DESIGN.md) for the
full design language and [`AGENTS.md`](AGENTS.md) for workflow rules.

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server
npm run build     # build the production site to ./dist
npm run preview   # preview the built site locally
```

## Linting

Source code (JavaScript/TypeScript/Astro), styles, and Markdown docs are all
linted. Run everything with:

```bash
npm run lint
```

Or run an individual linter:

```bash
npm run lint:js     # ESLint (JS/TS/Astro)
npm run lint:css    # Stylelint (CSS + styles inside .astro templates)
npm run lint:md     # markdownlint (docs)
```

Configuration lives in:

- `eslint.config.mjs` — ESLint flat config (typescript-eslint + eslint-plugin-astro).
- `stylelint.config.mjs` — Stylelint (BEM-friendly class naming).
- `.markdownlint-cli2.jsonc` — markdownlint rules.

A GitHub Action (`.github/workflows/lint.yml`) runs `npm run lint` on pull
requests and pushes to `main`.

## Project structure

```text
AGENTS.md              # agent/maintainer workflow instructions (start here)
docs/
  DESIGN.md            # design language: concept, palette, type, layout, helix
assets/                # source assets (not shipped — used to generate public/)
  portrait.jpg         # original portrait (add/replace this to update the site photo)
  header.jpg           # original hero photo (currently unused)
public/                # static assets (copied as-is)
  files/AlanKayResume.pdf
  portrait.jpg         # web-optimized portrait shown in the hero
  favicon.svg
  favicon.ico
  apple-touch-icon.png
scripts/
  generate-assets.py   # builds the portrait + the favicon set
src/
  layouts/BaseLayout.astro
  components/           # Nav, Hero, DnaHelix, About, StrandSection, Tabs, Resume, Contact
  pages/index.astro
  data/                 # influences.ts, socials.ts
  styles/global.css
astro.config.mjs
package.json
```

## Regenerating derived assets

The web-optimized portrait and the favicon set are generated from source assets:

```bash
python3 -m pip install pillow   # one-time
python3 scripts/generate-assets.py
```

## Deploying to Cloudflare Pages

1. Connect this repository in the Cloudflare dashboard.
2. Set the **build command** to `npm run build`.
3. Set the **build output directory** to `dist`.
4. (Optional) Enable **Cloudflare Web Analytics**:
   - The beacon snippet is already in `src/layouts/BaseLayout.astro`, **or**
   - Enable proxy-based analytics in the dashboard (no snippet needed).

## Contact links

The social links live in `src/data/socials.ts`. Update URLs there as needed.

## License

See [LICENSE](LICENSE).
