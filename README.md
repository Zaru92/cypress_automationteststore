# Cypress E2E — Automation Test Store

[![Cypress E2E Tests](https://github.com/Zaru92/cypress_automationteststore/actions/workflows/cypress-e2e.yml/badge.svg)](https://github.com/Zaru92/cypress_automationteststore/actions/workflows/cypress-e2e.yml)
[![Quality Check](https://github.com/Zaru92/cypress_automationteststore/actions/workflows/quality-check.yml/badge.svg)](https://github.com/Zaru92/cypress_automationteststore/actions/workflows/quality-check.yml)

End-to-end testing portfolio project built with **Cypress 15 + TypeScript**, targeting the public demo site [automationteststore.com](https://automationteststore.com). It demonstrates a strictly layered test architecture, UI / API / mocked coverage, tag-based test selection, and Allure reporting wired into CI.

## Tech stack

| Concern              | Tooling                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| Test runner          | [Cypress](https://www.cypress.io/) `^15`                                            |
| Language             | TypeScript `^5.9` (`strict`, path aliases)                                          |
| Test selection       | [`@cypress/grep`](https://github.com/cypress-io/cypress/tree/develop/npm/grep) tags |
| Reporting            | [Allure 3](https://allurereport.org/) via `allure-cypress`                          |
| Linting / formatting | ESLint (typescript-eslint, cypress, mocha plugins) + Prettier                       |
| Git hooks            | Husky + lint-staged (`pre-commit`)                                                  |
| CI                   | GitHub Actions (E2E + quality-check workflows)                                      |

## Requirements

- **Node.js 24** (CI runs on `node-version: 24`)
- npm

## Getting started

```bash
npm ci              # install dependencies
npm run cy:open     # launch the Cypress GUI
npm run cy:run      # run all specs headless
```

The site under test is set as `baseUrl` in `cypress.config.ts`, so specs navigate with `cy.visit('/')`.

## Project architecture

Tests follow a strict **4-layer stack**. Each layer talks **only** to the layer directly below it — specs never touch page objects or raw selectors directly.

```
cypress/e2e/**/*.cy.ts            specs — only call cy.* custom commands
        │
        ▼
cypress/support/commands/*.ts     thin Cypress.Commands.add wrappers → delegate to flows
        │
        ▼
cypress/flows/**/*.flow.ts        business-level orchestration (e.g. openHomePageFlow)
        │
        ▼
cypress/pages/*.ts                page objects extending BasePage (semantic actions)
        │
        ▼
cypress/selectors/*.selectors.ts  raw DOM selectors, exported `as const`
```

Supporting directories:

| Path                                         | Alias          | Purpose                                                                      |
| -------------------------------------------- | -------------- | ---------------------------------------------------------------------------- |
| `cypress/api/{clients,endpoints,validators}` | `@api/*`       | request clients, endpoint wrappers, response validation for direct-API tests |
| `cypress/test-data/{factories,static}`       | `@test-data/*` | data factories and static test fixtures (users, products, search criteria)   |
| `cypress/types`                              | `@app-types/*` | domain types + the shared `cypress.d.ts` command augmentations               |
| `cypress/utils`                              | `@utils/*`     | shared helpers (e.g. text / money parsing)                                   |
| `cypress/support`                            | `@support/*`   | command barrel, Allure metadata helper, `e2e.ts` setup                       |

Path aliases (`@pages/*`, `@selectors/*`, `@flows/*`, `@fixtures/*`, `@config/*`, …) are defined in `tsconfig.json` and preferred over deep relative imports.

### Spec roots

- `cypress/e2e/ui/` — UI specs (navigation, auth, products, cart, checkout)
- `cypress/e2e/api/` — direct-API specs (products, cart, negative cases)
- `cypress/e2e/mocked/` — `cy.intercept`-mocked specs

## Commands

```bash
# Run
npm run cy:open                  # Cypress GUI
npm run cy:run                   # headless, all specs
npm run cy:run:chrome            # headless in Chrome
npm run cy:run:firefox           # headless in Firefox
npx cypress run --spec 'cypress/e2e/ui/navigation/home-page-healthcheck.cy.ts'   # single spec

# Tag-based selection (@cypress/grep)
npm run test:smoke               # @smoke
npm run test:regression          # @regression
npm run test:ui                  # @ui
npm run test:api                 # @api
npm run test:mocked              # @mocked
npm run test:negative            # @negative

# Quality
npm run typecheck                # tsc --noEmit
npm run lint                     # eslint .
npm run lint:fix
npm run format                   # prettier --write .
npm run format:check
npm run quality:check            # typecheck + lint + format:check (run before pushing)
```

`pre-commit` runs `lint-staged` (eslint --fix + prettier on staged files), so most formatting/lint issues are auto-fixed at commit time.

## Reporting (Allure)

```bash
npm run test:allure          # clean reports + run, emitting reports/allure-results
npm run report:generate      # generate reports/allure-report from results
npm run report:open          # serve the HTML report
npm run test:allure:open     # full pipeline: run → generate → open
npm run report:clean         # wipe reports/{allure-results,allure-report,screenshots,videos,downloads}
```

Cypress artifacts (videos, failure screenshots, downloads) and Allure output all live under `reports/` (gitignored). Each spec declares Allure metadata via `setAllureMetadata({ epic, feature, story, severity?, tags? })` to drive the report's Behaviors tree. See **[REPORTING.md](REPORTING.md)** for the full workflow and the Allure-3-vs-2 caveats.

## Continuous integration

Two GitHub Actions workflows run on pushes and PRs to `main`:

- **Quality Check** (`.github/workflows/quality-check.yml`) — typecheck, ESLint, and Prettier checks.
- **Cypress E2E** (`.github/workflows/cypress-e2e.yml`):
  - PRs → `@smoke` suite
  - pushes to `main` → cross-browser `@regression` (Chrome, Firefox, Electron)
  - `workflow_dispatch` → manual run of a chosen test group (smoke / regression / api / mocked / negative / full)

  All jobs generate an Allure report and upload Cypress + Allure artifacts (7-day retention).

## Conventions

- **TypeScript** is `strict` with `noImplicitAny` / `strictNullChecks`; use `import type` for type-only imports.
- Every new custom command needs a declaration in `cypress/types/cypress.d.ts` **and** registration in the `cypress/support/commands.ts` barrel.
- No hard waits (`cy.wait(<ms>)`), no `.only`, no empty tests — assertions/commands already use generous timeouts (`defaultCommandTimeout: 10000`).
- See **[CLAUDE.md](CLAUDE.md)** for the full architecture guide and **[AGENTS.md](AGENTS.md)** for PR review priorities and anti-patterns.
