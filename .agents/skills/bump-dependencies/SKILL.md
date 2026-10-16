---
name: bump-dependencies
description: Bump every dependency to its latest stable version and adjust the code to match — npm packages, the Cloudflare runtime compatibility date, GitHub Actions pinned to commit SHAs, and skills installed via `npx skills`. Use when the user wants to update or modernize dependencies, move off deprecated APIs, pin actions to SHAs, or asks to "bump deps".
---

# Bump dependencies

A **bump** moves every dependency to its latest stable version and adjusts the code to match, so the project stays supported and modern. Four surfaces, each with its own mechanism:

- **npm packages** — `package.json` / `package-lock.json`.
- **Runtime** — the Cloudflare Workers `compatibility_date` in `wrangler.toml`.
- **GitHub Actions** — `uses:` refs in `.github/workflows/*.yml`, pinned to a commit SHA.
- **Skills** — vendored under `.agents/skills/`, locked in `skills-lock.json`.

A bump is not done when the versions change. It is done when the code still builds **green** and no deprecated mechanism remains: a version bump that leaves a deprecation warning behind is half a bump. Read each major's migration guide and move the code onto the current API, rather than pinning back to the old one.

## Process

### 1. Survey the drift

Enumerate all four surfaces before changing anything, so the run has a known scope.

- **npm**: `npm outdated` — current vs. wanted vs. latest for every package.
- **Runtime**: the `compatibility_date` in `wrangler.toml`.
- **Actions**: `grep -rn 'uses:' .github/workflows/` — every action ref.
- **Skills**: `npx skills list --json` — installed skills and their locked hashes.

Flag every **major** bump: those are the ones that carry breaking changes and need code work, not just a version edit.

**Done when:** every surface is enumerated, and the majors that need code changes are named.

### 2. Bump npm packages

```bash
npx npm-check-updates -u   # rewrite package.json to latest stable
npm install                # update the lockfile
```

`npm-check-updates` targets the `latest` dist-tag, so prereleases are excluded by default. Then, for each major you flagged in step 1, read its changelog / migration guide and update the code to the new API — replace deprecated calls, drop removed options, adopt the replacement mechanism. Prefer the current API over pinning to the old major.

Bump the Node version in the same pass when a newer LTS is out: `engines.node` in `package.json` and `node-version` in every workflow move together, or CI and local drift apart.

**Done when:** `package.json` is at latest stable, the lockfile is updated, and every major's breaking change is handled in code.

### 3. Bump the runtime compatibility date

Set `compatibility_date` in `wrangler.toml` to today's date. It gates which Workers runtime behaviours are active, so advancing it is how the project opts into current runtime semantics — and it is the one bump that can change behaviour without any package version moving.

**Done when:** `compatibility_date` is today's date and the build still passes.

### 4. Pin GitHub Actions to the latest stable SHA

For each `uses: owner/repo@ref`, resolve the latest stable tag, then that tag's commit SHA. The `/commits/<tag>` endpoint resolves annotated tags to the underlying commit, so it is safe for both tag styles:

```bash
# latest stable tag
tag=$(curl -sL https://api.github.com/repos/OWNER/REPO/releases/latest | jq -r .tag_name)
# that tag's commit SHA (annotated-tag safe)
sha=$(curl -sL "https://api.github.com/repos/OWNER/REPO/commits/$tag" | jq -r .sha)
```

Rewrite the ref to the full 40-character SHA and keep the human-readable version as a trailing comment:

```yaml
uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
```

Pin to a SHA, not a moving tag: a tag can be repointed, a SHA cannot.

**Done when:** every action in every workflow is pinned to a full commit SHA with a version comment, and no `@vN` ref remains.

### 5. Update skills

```bash
npx skills update -p -y   # project-scoped skills
```

Confirm `skills-lock.json` hashes changed. Skills are vendored third-party code, hash-locked to upstream — don't hand-edit them, and don't lint them (`.markdownlint-cli2.jsonc` already excludes `.agents/**`).

**Done when:** `npx skills update` reports no further updates, and `skills-lock.json` reflects the new hashes.

### 6. Verify green

```bash
npm run build
npm run lint
```

Both must pass with no errors. If the change touches rendered output, start `npm run preview` and spot-check desktop (≥1280px) and mobile (~390px), per `AGENTS.md`.

**Done when:** build and lint are green, and any render change is spot-checked.

### 7. Hand off for review

**Check the current branch first.** On `main`, create a `bump-deps-YYYYMMDD` branch (today's date). On any other branch, assume the user already made one and stay on it — but if it isn't a `bump-deps-*` branch, ask before proceeding rather than bumping on an unrelated branch.

Then **leave every change unstaged** — do not `git add`, do not commit. The user stages and commits themselves.

Then print a review summary so the changes are visible without digging through the lockfile:

- **Direct deps**: each `package.json` version that moved, old → new, with its bump type (major/minor/patch).
- **Lockfile**: the `git diff --stat` line count, and the notable transitive packages that moved.
- **Runtime**: the `compatibility_date` old → new.
- **Actions**: each action, old ref → new SHA + version comment.
- **Skills**: how many skills updated.
- **Code adjustments**: every source file changed to handle a breaking change, and why.
- **Left alone**: anything deliberately not bumped (e.g. advisories whose only fix is a downgrade), and the reason.

**Done when:** you are on a `bump-deps-*` branch, every change is unstaged, and the summary names every change across all four surfaces.

## Notes

- **One surface at a time.** Bump npm, then the runtime, then actions, then skills — a failure in one is easier to isolate than four interleaved.
- **Read before you rewrite.** A major bump without its migration guide is guesswork; the guide names the deprecated mechanism and its replacement.
- **`gh` may be absent.** This repo's issue tracker assumes `gh`, but the bump run needs only `curl` and `jq`, which are present.
