# Reporting

Test runs produce three artifact streams, all under `reports/` (gitignored):

- **Allure results** (`reports/allure-results/*.json`) — auto-emitted during every Cypress run via the `allure-cypress` integration, registered in `cypress.config.ts` (`allureCypress(on, config, { resultsDir: 'reports/allure-results' })`) and imported in `cypress/support/e2e.ts`. Raw JSON, transient — regenerated into an HTML report.
- **Allure HTML report** (`reports/allure-report/`) — generated from the JSON results by `allure generate`. The human-readable output.
- **Cypress videos & failure screenshots** (`reports/videos/`, `reports/screenshots/`) — produced by Cypress itself; paths configured in `cypress.config.ts`.

## Commands

```bash
npm run test:allure        # report:clean + cypress run (emits reports/allure-results)
npm run report:generate    # allure generate -> reports/allure-report
npm run report:open        # allure open reports/allure-report (serves the HTML)
npm run test:allure:open   # full pipeline: test:allure && report:generate && report:open
npm run report:clean       # rimraf reports/{allure-results,allure-report,screenshots,videos,downloads}
```

## Allure 3, not Allure 2

This project depends on the new `allure` npm package (`allure@^3.x`), **not** the legacy Java `allure-commandline`. Differences that bite:

- `allure generate` in v3 has **no `--clean` flag** — the output directory is overwritten in place. Passing `--clean` fails with `Unknown Syntax Error`. (`report:clean` already wipes the dir, so no flag is needed.)
- The supported `generate` flag set is smaller: `--config`, `--output`, `--cwd`, `--report-name`, `--dump`, `--open`, `--port`, `--history-limit`, `--hide-labels`.
- The familiar Allure 2 sidebar (separate **Overview / Categories / Suites / Graphs / Timeline / Behaviors / Packages** tabs) is gone. Allure 3's default "awesome" report produces a single test tree; per-tab data files like `data/behaviors.json` do not exist.

## Report configuration (`allurerc.mjs`)

`allurerc.mjs` at the repo root configures the Allure 3 "awesome" report. The CLI auto-discovers it — no `--config` flag needed. The current config groups tests by labels to give an Allure-2-style **Behaviors** layout (epic → feature → story → test):

```js
import { defineConfig } from 'allure';

export default defineConfig({
  plugins: {
    awesome: {
      options: {
        groupBy: ['epic', 'feature', 'story'],
      },
    },
  },
});
```

This relies on every spec calling `setAllureMetadata({ epic, feature, story?, ... })` (see below). Tests missing those labels fall into an `__unknown__` bucket at each level, so reviewers should flag specs without metadata. `appendTitlePath: true` is intentionally **not** set — it appends the full file/package path under each story and makes the tree 8+ levels deep.

## Adding metadata in specs

`cypress/support/allure.ts` exposes `setAllureMetadata({ epic, feature, story, severity?, owner?, tags?, description? })`, called from every spec's top-level `before(...)`. `epic` / `feature` / `story` are **required** because the report's Behaviors tree is grouped by them (see `allurerc.mjs`). Severities are typed: `'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'` (exported as `AllureSeverity`). Mirror this pattern when adding a new spec:

```ts
import { setAllureMetadata } from '@support/allure';

describe('Home Page Healthcheck', () => {
  before(() => {
    setAllureMetadata({
      epic: 'Test Infrastructure',
      feature: 'Healthcheck',
      story: 'Home page availability',
      severity: 'critical',
      tags: ['@ui', '@smoke'],
    });
  });
  // ...
});
```

Under the hood `setAllureMetadata` calls `allure.epic/feature/severity/owner/description/tags` from `allure-js-commons` — use those primitives directly if you need anything the helper doesn't cover (e.g. `allure.step(...)`, `allure.link(...)`, `allure.attachment(...)`).

## Not configured (yet)

- **No trend / history** — Allure history requires persisting `reports/allure-report/history/` between runs (typically via CI artifact storage). Not set up; reports are single-run snapshots.
- **No CI publishing** — reports are generated locally only. No GitHub Pages / S3 / Allure TestOps hook.
