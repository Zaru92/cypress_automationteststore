# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cypress + TypeScript E2E testing portfolio project targeting the public site `https://automationteststore.com` (configured as `baseUrl` in `cypress.config.ts`, so specs use `cy.visit('/')` etc.). `AGENTS.md` lists the PR review priorities and anti-patterns this project cares about — consult it before suggesting changes to test code.

## Commands

```bash
npm run cy:open                  # Cypress GUI
npm run cy:run                   # headless, all specs (default browser)
npm run cy:run:chrome            # headless in Chrome
npm run cy:run:firefox           # headless in Firefox

# Run a single spec (no dedicated script):
npx cypress run --spec 'cypress/e2e/ui/navigation/home-page-healthcheck.cy.ts'

# Run by @cypress/grep tag (the test:* npm scripts wrap this for common tags):
npx cypress run --expose grepTags=@smoke

npm run typecheck                # tsc --noEmit
npm run lint                     # eslint .
npm run lint:fix
npm run format                   # prettier --write .
npm run format:check
npm run quality:check            # typecheck + lint + format:check (run before pushing)
```

Husky `pre-commit` runs `lint-staged` (eslint --fix + prettier on staged files), so most formatting/lint issues are auto-fixed at commit time. Run `quality:check` for the full sweep.

Cypress artifacts go to `reports/{screenshots,videos,downloads}` (not the default `cypress/` subfolders).

## Architecture

Tests are built as a strict 4-layer stack. Each layer talks **only** to the layer directly below it — do not skip layers (e.g. a spec must not call a page object or use a raw selector directly).

```
cypress/e2e/**/*.cy.ts          specs — only use cy.* custom commands
       │
       ▼
cypress/support/commands/*.ts   Cypress.Commands.add(...) — thin wrappers, delegate to flows
       │
       ▼
cypress/flows/**/*.flow.ts      business-level orchestration (e.g. openHomePageFlow)
       │
       ▼
cypress/pages/*.ts              page objects extending BasePage, expose semantic actions
       │
       ▼
cypress/selectors/*.selectors.ts  raw DOM selectors, exported `as const`
```

Concrete example to mirror when adding new commands:

- selector: `cypress/selectors/home.selectors.ts` → `homeSelectors.searchInput`
- page object: `cypress/pages/HomePage.ts` → `homePage.assertLoaded()` (uses `BasePage` helpers: `visit`, `getElement`, `shouldBeVisible`, `containsText`)
- flow: `cypress/flows/navigation/home.flow.ts` → `openHomePageFlow()`, `verifyHomePageIsVisibleFlow()`
- command: `cypress/support/commands/navigation.commands.ts` → `cy.openHomePage()`, `cy.shouldSeeHomePage()`
- spec: `cypress/e2e/ui/navigation/home-page-healthcheck.cy.ts`

`cypress/support/commands.ts` is the central import barrel — any new `*.commands.ts` file must be added there or its `Cypress.Commands.add` calls will never run.

### Custom command type augmentation

**Every new custom command requires a declaration in `cypress/types/cypress.d.ts`** under `namespace Cypress { interface Chainable { ... } }`. Without it `cy.myCommand()` fails type-checking. This is a single shared file — do not scatter `declare global` blocks across the codebase.

`cypress.d.ts` is reserved for Cypress namespace augmentation. Domain-specific types live in sibling files named `<domain>.types.ts` (e.g. `cypress/types/product.types.ts`) — keep new domain types there rather than appending them to `cypress.d.ts`.

### Page objects

`BasePage` (`cypress/pages/BasePage.ts`) provides `getElement`, `containsText`, `visit`, `shouldBeVisible`. Page-object methods that wrap base helpers must not collide with their names (e.g. don't define a no-arg `shouldBeVisible()` on a subclass — it shadows the base method and causes infinite recursion when the subclass calls `this.shouldBeVisible(selector)`). Use distinct verbs like `assertLoaded()` for page-level assertions.

## TypeScript

`strict: true` with `noImplicitAny` and `strictNullChecks`. Path aliases are defined in `tsconfig.json` and should be preferred over deep relative imports: `@pages/*`, `@selectors/*`, `@flows/*`, `@fixtures/*`, `@support/*`, `@app-types/*`, `@utils/*`, `@api/*`, `@config/*`, `@test-data/*`.

ESLint uses `typescript-eslint`'s `recommendedTypeChecked` config plus `eslint-plugin-cypress` and `eslint-plugin-mocha`. Notable rules enforced:

- `@typescript-eslint/consistent-type-imports` — use `import type { ... }` for type-only imports.
- `cypress/no-unnecessary-waiting` (warn) — no `cy.wait(<ms>)`; wait on commands/assertions instead.
- `cypress/no-force` (warn) — avoid `{ force: true }`.
- `mocha/no-exclusive-tests` (error) — no `.only`.
- `mocha/no-pending-tests` (error) — no empty `it(...)`.

### Scaffolded-but-empty areas

These directories exist with their path aliases reserved but contain no implementation yet — extend them rather than introducing parallel structures:

- `cypress/api/{clients,endpoints,schemas}` (alias `@api/*`) — request clients, endpoint wrappers, response schemas for direct-API tests.
- `cypress/e2e/api/` and `cypress/e2e/mocked/` — sibling spec roots to `cypress/e2e/ui/`; API tests and `cy.intercept`-mocked specs go here, not under `ui/`.
- `cypress/test-data/{factories,static}` (alias `@test-data/*`) — prefer factories over inline literals; static blobs (large JSON payloads, snapshots) go in `static/`.
- `cypress/fixtures/api/` — JSON fixtures consumed by `cy.fixture()` / `cy.intercept()`.
- `cypress/utils/` (alias `@utils/*`) and `cypress/config/` (alias `@config/*`) — shared helpers and environment/config wiring.

## Cypress config notes

- `defaultCommandTimeout: 10000`, `pageLoadTimeout: 60000`, `requestTimeout`/`responseTimeout: 15000` — assertions/commands have a generous timeout already, so resist adding `cy.wait`.
- `retries: { runMode: 1, openMode: 0 }` — one retry in headless CI runs, none in interactive mode.
- Viewport: 1440×900.
- `specPattern: 'cypress/e2e/**/*.cy.ts'` — specs must end in `.cy.ts` and live under `cypress/e2e/`.

## Reporting

Allure results are auto-emitted by `allure-cypress` (registered in `cypress.config.ts:setupNodeEvents` and imported in `cypress/support/e2e.ts`). Spec metadata uses the `setAllureMetadata` helper at `cypress/support/allure.ts` — see `REPORTING.md` for the full generate/open workflow and the Allure-3-vs-2 caveats. Don't remove the `allure-cypress` import from `cypress/support/e2e.ts` or results stop being emitted.
