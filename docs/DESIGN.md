# Design Language — alankay.net

Internal reference for maintainers and AI agents. This document describes the
*source of truth* for how this site should look and feel, and why. When making
visual changes, follow the direction here rather than improvising new palettes,
typefaces, or layouts.

> Companion file: [`AGENTS.md`](../AGENTS.md) contains the actionable workflow
> rules agents should follow. This doc is the reference they point to.

---

## 1. The concept: "Your genome"

The entire design is an extended metaphor: **DNA has four bases (A·T·G·C), and
Alan's story has four strands.** Everything visual hangs off that parallel.

| Strand | Base | Color | Hex |
|--------|------|-------|-----|
| Personal | **P** | ice blue | `#2d9cdb` |
| Professional | **C** | phosphor green | `#23a26d` |
| Background | **B** | warm clay | `#e0675a` |
| Values | **V** | brass | `#d9a521` |

These four colors are the **identity sequence**. They never change between
themes, and they are the *only* place full color is allowed to carry meaning.
The rest of the page stays deliberately quiet so the sequence reads.

### Rules of the metaphor

- Every strand maps to one letter, one color, one anchor (`#track-{id}`).
- The hero helix, the About strand cards, and the base chips must all use the
  same letter+color mapping — never diverge.
- Don't add a fifth strand or reorder them without updating
  `src/data/influences.ts`, the helix, and the chips together.

---

## 2. Color

Palette is defined as **role-based CSS custom properties** in
`src/styles/global.css`. Two themes, both declared in the same file.

### Light theme (`:root`)

```css
--bg:        #f4f7f9;   /* cool "rink ice" off-white page base */
--bg-soft:   #e9eff4;
--surface:   #ffffff;   /* cards */
--text:      #15202b;   /* ink */
--text-muted:#53616f;
--line:      rgba(21, 32, 43, 0.14);
--line-strong: rgba(21, 32, 43, 0.24);
--ink:       #15202b;   /* filled buttons / resume band */
--on-ink:    #ffffff;
```

### Dark theme (`[data-theme='dark']`)

Deep ink navy — near-black blue, **not** pure black and **not** grey.

```css
--bg:        #0b1219;
--surface:   #111c26;
--text:      #e8eef4;
--ink:       #1a2632;   /* stays visibly darker than --bg so bands read */
```

### Rules

- **Always** reference the token, never hardcode a neutral hex in a component.
- **Never** change `--color-personal/professional/background/values` per theme.
  A separate `--accent` token (same blue) drives generic UI accents so the four
  identity colors stay reserved for their strands.
- A dark-on-light "band" (e.g. `.resume`) uses `--ink` + `--on-ink`, so it works
  in both themes.
- Prefer `color-mix(in srgb, …)` for translucent tints of a token.

---

## 3. Typography

Self-hosted via `@fontsource` (Latin subsets only — imported in
`src/layouts/BaseLayout.astro`). No Google Fonts requests.

| Role | Face | Notes |
|------|------|-------|
| Display | **Space Grotesk** (500/700) | Headlines only; used with restraint |
| Body | **Inter** (400/500/600) | All running text |
| Mono / utility | **IBM Plex Mono** (400/500/600) | Eyebrows, labels, nav, captions, chips — the "geek vernacular" |

### Rules

- Mono is the personality carrier: labels, numbers, the wordmark `alankay.net`,
  base letters, and the footer are all mono + `text-transform: uppercase` with
  wide letter-spacing for small labels.
- Type scale is a named `--text-*` series (1.25 minor third) in the tokens.
- Keep display type in kebab/lowercase sentence case; reserve all-caps for
  mono labels, not Space Grotesk.

---

## 4. Layout & structure

Single page, three sections, one signature element. Order in
`src/pages/index.astro`:

1. **Nav** — sticky, mono wordmark `alankay.net` + blinking cursor (`--accent`
   blue, matching the "Professional geek" accent), links About/Resume/Contact,
   theme toggle (sun/moon), mobile menu button.
2. **Hero** — two columns:
   - *Left*: headline ("Personal roots. / Professional outcomes."), intro
     line, portrait below.
   - *Right*: the DNA helix column (tall + narrow).
3. **About** — intro paragraph, then four "strand" cards with letter badges
   (P/C/B/V). Each strand has an intro line and a tabbed set of sub-pieces
   (tabs on wide screens, accordion on narrow screens). Then the "So who am I?"
   close.
4. **Resume** — dark `--ink` band, PDF embed + download button.
5. **Contact** — four social links as cards.
6. **Footer** — copyright line only (no tooling credits).

### Rules

- Section vertical rhythm is two tokens: `--space-section` and `--space-tight`.
  The hero→About gap is intentionally `--space-tight` (a lead-in, not a break).
- `01 — About`, `02 — Resume`, `03 — Contact` eyebrows encode actual order.
- Numbers/eyebrows should encode something *true*; don't decorate.

---

## 5. The signature: the DNA helix

`src/components/DnaHelix.astro` renders a **3D double helix on a `<canvas>`,
animated with `requestAnimationFrame`**.

- **What spins**: the whole helix rotates P·C·B·Vously. Depth-sorting makes the
  two strands cross in front of/behind each other.
- **Base pairs**: the rungs cycle through H·B·C·P. Currently **10 rungs** =
  2.5 sequences. Tuning knobs live at the top of the script:
  - `TURNS = 1.75` twists over the helix length.
  - `RUNGS = 10` base pairs.
  - `SPEED = 0.0008` rad/ms (~7.9s per revolution).
  - Radius `R = Math.min(w * 0.2, h * 0.42)` — middle-ground width, height-capped.
- **Fluid backbones**: each segment is subdivided 5× and sampled from a real
  helix function (`helixPoint`), so the strands curve, not facet.
- **Interaction**: hovering a rung (or a matching chip below) highlights that
  base; clicking scrolls to `#track-{id}`. The colored rungs are a *pointer
  enhancement*; the four chips below are the keyboard-accessible fallback.
- **Acknowledgment badges**: canvas is `aria-hidden`; accessibility is carried
  by the chips and the section anchors.

### Rules

- The helix script is **plain JavaScript** — `define:vars` does not strip
  TypeScript `type`/`interface` annotations, which cause `Unexpected identifier`
  runtime errors.
- Respect `prefers-reduced-motion`: draw a single static frame instead of the
  loop.
- Keep the letter+color+anchor mapping in sync with `influences.ts`.
- If it "doesn't look like DNA," it's usually too wide (radius) or too few
  twists. Tune `R`/`TURNS` before anything else.

---

## 6. Theming (light/dark)

- Theme is a `data-theme` attribute on `<html>`.
- **No-flash**: `src/layouts/BaseLayout.astro` has an inline `is:inline` script
  that sets `data-theme` from `localStorage` (or `prefers-color-scheme`) before
  first paint.
- **Toggle**: the nav button flips `data-theme` and persists to `localStorage`.
- `color-scheme` is set per theme. The body has a short background transition so
  switching is smooth, not jarring.

---

## 7. Motion & restraint

- Spend boldness **in one place**: the helix. Everything else is quiet.
- Reveal-on-scroll is opt-in behind a `.js` class so no-JS/crawlers see content.
- All animation respects `prefers-reduced-motion`.
- Chanel rule: before finishing, remove one accessory. If something new doesn't
  serve the DNA metaphor, don't add it.

---

## 8. Writing (copy voice)

- Words are design material. Prefer the user's actual voice over cleverness.
- The About/strand copy may be re-authored (owner-authorized) to show how
  influences drive outcomes. Preserve verbatim origin-story passages the owner
  wants kept. Tone is personal + professional, polished but human.
- Keep labels plain and specific; avoid marketing filler.

---

## 9. Where things live

| Concern | File |
|---------|------|
| Tokens, themes, all styles | `src/styles/global.css` |
| Strands (letters, colors, copy, tabs) | `src/data/influences.ts` |
| Strand card (one category) | `src/components/StrandSection.astro` |
| Tabs / accordion widget | `src/components/Tabs.astro` |
| Social links | `src/data/socials.ts` |
| Helix | `src/components/DnaHelix.astro` |
| Theme init | `src/layouts/BaseLayout.astro` |
| Page order | `src/pages/index.astro` |
| Asset generation (portrait, favicon) | `scripts/generate-assets.py` |
