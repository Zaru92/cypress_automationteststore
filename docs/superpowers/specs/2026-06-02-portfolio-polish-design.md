# Portfolio Polish — Design Spec

**Date:** 2026-06-02
**Status:** Approved (pending written-spec review)
**Repo:** `Zaru92/cypress_automationteststore`

## Goal

Make the existing (already mature) Cypress test project _legible_ to a skimming
mid-level QA Automation recruiter. The code quality, architecture, CI, and
report tooling already exist — they are just not visible. This is a
presentation/visibility pass, **not** a test-coverage expansion.

Explicit non-goal: **no new specs, page objects, flows, or selectors.** Adding
coverage does not move a skimming recruiter and would consume the time budget.

## Audience

Mid-level QA Automation Engineer roles. Reviewer skims for "can they write
maintainable tests + have CI." Often first seen by a non-technical recruiter,
so the README and a clickable report matter more than deep code reading.

## Scope — Four Deliverables

### 1. README rewrite (centerpiece, English)

Replace the one-line `README.md` with a recruiter-oriented document. Sections,
in order:

1. **Title + one-line pitch** — what this is (Cypress + TypeScript E2E suite
   against `automationteststore.com`) and why it exists (skills portfolio).
2. **Status badges** — see deliverable 2.
3. **Live report link** — prominent link to the hosted Allure report (deliverable 3).
4. **Tech stack** — Cypress, TypeScript (strict), Allure, `@cypress/grep`,
   ESLint, Prettier, Husky, GitHub Actions.
5. **What's covered** — short table/list: UI (auth, cart, checkout, products,
   navigation), **API** (cart/product, positive + negative), **mocked**
   (`cy.intercept` empty-results + server-error).
6. **Architecture** — the strict 4-layer stack rendered as a diagram
   (selectors → pages → flows → commands → specs), reusing the description from
   `CLAUDE.md`. One paragraph on _why_ (each layer talks only to the one below).
7. **Screenshot / GIF** — embedded visual (deliverable 4).
8. **Running locally** — the key npm scripts (`cy:open`, `cy:run`, tag scripts,
   `quality:check`).
9. **CI overview** — describe the two workflows: smoke-on-PR, cross-browser
   (chrome/firefox/electron) matrix on push, manual `workflow_dispatch`, plus
   the quality-check workflow.

Tone: concise, scannable, lots of headers. Markdown only — no new dependencies.

### 2. CI status badges

Add GitHub Actions workflow-status badges to the top of the README:

- **Cypress E2E Tests** (`cypress-e2e.yml`)
- **Quality Check** (`quality-check.yml`)

Standard shields.io / GitHub Actions badge URLs pointing at the `main` branch.
Optionally a static "tests: N specs" or tech badges (Cypress/TypeScript) for
visual polish. No workflow changes required for the badges themselves.

### 3. Publish Allure report to GitHub Pages

Make the report a clickable public URL: `https://zaru92.github.io/cypress_automationteststore/`.

Approach:

- Add a dedicated **publish job** (or extend the push path of
  `cypress-e2e.yml`) that, on push to `main`, runs a representative suite once
  (regression, single browser to keep it fast/cheap), generates the Allure
  report, and deploys `reports/allure-report` to GitHub Pages.
- Use a single-report publish (avoid the 3-way matrix producing three reports).
- **History/trends:** preserve Allure history across runs so the report shows
  trend graphs (restore previous `history/` before `allure generate`, e.g. via
  the gh-pages deploy keeping prior files). This is desirable but secondary —
  the hard requirement is a stable, current, public report URL.
- Deploy mechanism: a `gh-pages` branch deploy (e.g. `peaceiris/actions-gh-pages`)
  or the official `actions/deploy-pages` Pages flow — implementer's choice,
  whichever is simplest to get green. Pages must be enabled in repo settings.
- `report:generate` (existing npm script) is reused for report generation.

Acceptance: after a push to `main`, the Pages URL serves the latest report and
the README link resolves to it.

### 4. Screenshot / GIF

Embed one visual in the README so it isn't a text wall. Candidate: the Allure
dashboard overview, or the Cypress runner. Store under a repo path (e.g.
`docs/assets/`). A static screenshot is sufficient; a short GIF is a bonus, not
required.

## Out of Scope

- New tests / coverage of any kind.
- Refactoring existing test code, page objects, or architecture.
- Polish workflows beyond what's needed to publish the report.
- Translating the README to Polish (English only).

## Risks / Notes

- GitHub Pages must be enabled for the repo (manual settings step or via the
  deploy action's permissions). Document this in the plan.
- The publish job runs against the live public site; this matches existing CI
  behavior, so no new flakiness category is introduced.
- Keep the publish suite small (one browser) to limit CI minutes.

## Success Criteria

A recruiter landing on the repo sees: a real README with green badges, an
architecture diagram, a "what's covered" summary, a screenshot, and a working
link to a live passing test report — all without reading a single spec file.
