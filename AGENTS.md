# Agent Instructions — alankay.net

Guidelines for AI coding agents (and human maintainers) working in this repo.
Short and actionable; the rationale lives in the design reference.

**Primary design reference: [`docs/DESIGN.md`](docs/DESIGN.md).** Read it before
making any visual or copy change. If a rule here conflicts with the user's
current request, the user wins — but call out the deviation.

## Project overview

`alankay.net` is a single-page personal site built with **Astro** (static
output), deployed on **Cloudflare Pages**. The design is built on one metaphor:
**DNA → four building blocks → four letters (P·P·B·V) with fixed colors.**

- Stack: Astro (no frontend framework), plain CSS, self-hosted fonts, one small
  canvas animation. No client-side framework, no heavy deps.
- Build: `npm install` / `npm run build` → outputs to `dist/`. Preview:
  `npm run preview`.

## Hard rules

1. **Read `docs/DESIGN.md` first.** Every palette, typeface, spacing token, and
   layout decision originates there.
2. **The four building-block colors are sacred.** Personal `#2d9cdb`,
   Professional `#23a26d`, Background `#e0675a`, Values `#d9a521`. They never
   change and never differ between light/dark themes.
3. **Never hardcode neutral colors.** Use the CSS custom properties
   (`--bg`, `--text`, `--surface`, `--line`, `--ink`, `--on-ink`, etc.). Both
   themes must stay in sync.
4. **Letter + color + anchor mapping is a unit.** If you change a building
   block's letter or color, update `src/data/influences.ts`, `DnaHelix.astro`,
   the chips, and the building-block badges together.
5. **The helix script is plain JavaScript.** `define:vars` does not strip
   TypeScript annotations — `type`/`interface` in an inline `<script>` causes a
   runtime `Unexpected identifier` error. Don't reintroduce TS there.
6. **Respect `prefers-reduced-motion`.** The helix must render a static frame
   when reduced motion is requested.
7. **Keep the signature in one place.** The helix is the bold moment; everything
   else stays quiet. Don't add decorative animation elsewhere.
8. **The About copy may be rewritten.** The owner has authorized reworking the
   About/influences copy (e.g. to show how influences drive outcomes). Preserve
   any verbatim origin-story passages the owner wants kept, but re-authoring is
   allowed.
9. **Accessibility floor:** semantic landmarks, one visible focus style, skip
   link, keyboard-accessible nav; the helix's links must have a keyboard
   alternative (the chips).
10. **Mobile parity:** every layout change must be verified at ~375px and won't
    break the single-column stacking (nav menu, hero column collapse).

## Workflow

### Before a visual change

- Read `docs/DESIGN.md`.
- Identify which token/rule governs the area.

### When editing

- Prefer editing data (`src/data/*.ts`) for content; CSS tokens for theme/layout.
- Multiple independent edits → batch them.
- After editing a component that renders inline `<script>`, keep it `is:inline`
  or plain JS as appropriate.

### After any change

- `npm run build` must pass with no errors (`get_errors` clean).
- If you changed render/output, start `npm run preview` and spot-check at
  desktop (≥1280px) and mobile (~390px).
- Verify the helix still animates (it draws pixels and the frame changes over
  time) — a common regression is an empty canvas from a JS error.

## Tuning the helix (frequent request)

If the helix "doesn't look like DNA," it's usually one of these, in order:

- **Too wide** → lower `R` (radius) in `DnaHelix.astro`.
- **Too few/too many twists** → adjust `TURNS`.
- **Too fast/slow** → adjust `SPEED` (rad/ms; 0.0008 ≈ 7.9s/rev).
- **Too few rungs** → the sequence is `RUNGS` (10 = 2.5× the P·P·B·V repeat).

## Content & contact

- Social links: `src/data/socials.ts`. Keep all URLs `https://`.
- Resume: `public/files/AlanKayResume.pdf` (referenced as `/files/...`).
- Portrait: `assets/portrait.jpg` → regenerated to `public/portrait.jpg` via
  `python3 scripts/generate-assets.py` (requires Pillow). Same script builds the
  favicon set.
- Cloudflare Web Analytics beacon + token: `src/layouts/BaseLayout.astro`.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
