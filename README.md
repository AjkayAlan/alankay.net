# alankay.net

Personal website of **Alan Kay** — a technology enthusiast and professional geek.

A lightweight, fast, static site built with [Astro](https://astro.build) and
deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Design

The site tells the story of the four influences that shaped me — **Hockey**,
**Band**, **Computers**, and **Parents** — presented as four "tracks" on a
mixing desk, rendered in a mono/terminal visual language. Full color only
appears in that four-track context, so it stays meaningful.

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server
npm run build     # build the production site to ./dist
npm run preview   # preview the built site locally
```

## Project structure

```
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
  components/           # Nav, Hero, TrackEq, About, Resume, Contact
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
