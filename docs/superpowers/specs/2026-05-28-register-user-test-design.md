# Register User Test — Design

**Date:** 2026-05-28
**Branch:** `test/registerUserTest`

## Goal

Add a Cypress E2E test that registers a new user via the live
`https://automationteststore.com` registration form (`/index.php?rt=account/create`).
Happy path only. The test must stay consistent with the project's 4-layer
architecture (selectors → pages → flows → commands → spec).

## Scope

- One spec: `cypress/e2e/ui/auth/register-user.cy.ts`.
- Single `it` covering successful registration with valid unique data.
- Verifies the post-registration "Your Account Has Been Created" page.
- Tagged `@ui` + `@smoke` (matches other core happy-path specs like
  `add-product-to-cart.cy.ts`).

## Out of scope

- Negative scenarios (missing fields, password mismatch, duplicate username,
  privacy-policy unchecked). These can be added later as a separate
  `register-negative.cy.ts`.
- Email verification, login-after-register continuity, API-level registration.
- Cleanup of created accounts (the public test site does not expose a delete
  endpoint; uniqueness via factory prevents reruns from colliding).

## Layered breakdown

### 1. Selectors — `cypress/selectors/register.selectors.ts` (new)

Separate file (not appended to `auth.selectors.ts`) because the form has many
fields. Same precedent as `productDetails.selectors.ts` being separate from
`products.selectors.ts`. Exports `registerSelectors as const`.

Fields needed (IDs confirmed against the live form during implementation):

- Personal: `firstName`, `lastName`, `email`, `telephone`
- Address: `address1`, `city`, `region` (state/zone select), `postcode`,
  `country` (country select)
- Login: `loginName`, `password`, `confirmPassword`
- `privacyPolicyCheckbox`
- `continueButton`
- Success-page indicator: heading or `.maintext` element containing
  "Your Account Has Been Created".

### 2. Page object — `cypress/pages/RegisterPage.ts` (new)

Extends `BasePage`. Methods:

- `open()` — `this.visit('/index.php?rt=account/create')`
- `assertLoaded()` — asserts URL contains `account/create` and key inputs
  visible (mirrors `LoginPage.assertLoaded`)
- `fillRegistration(data: RegistrationData)` — `clearAndType` for text
  inputs, `cy.get(...).select(...)` for country/zone, check privacy box
- `submit()` — clicks continue
- `assertAccountCreated()` — asserts the success page is reached. Uses a
  verb distinct from `BasePage.shouldBeVisible` to avoid the shadowing
  pitfall noted in `CLAUDE.md`.

Singleton export: `export const registerPage = new RegisterPage();`.

### 3. Flow — `cypress/flows/auth/register.flow.ts` (new)

Thin orchestration, no Cypress chainables leaked beyond what the page
object returns. Exports:

- `openRegisterPageFlow()`
- `verifyRegisterPageIsVisibleFlow()`
- `registerUserFlow(data: RegistrationData)` — calls `fillRegistration` then `submit`
- `verifyAccountCreatedFlow()`

### 4. Commands — extend `cypress/support/commands/auth.commands.ts`

Add four commands, each delegating to a flow and calling `logStep`:

- `cy.openRegisterPage()`
- `cy.shouldSeeRegisterPage()`
- `cy.registerUser(data: RegistrationData)`
- `cy.shouldSeeAccountCreated()`

No changes needed to `cypress/support/commands.ts` (the auth file is already
imported there).

### 5. Type augmentation — extend `cypress/types/cypress.d.ts`

Add the four new `Chainable` signatures under
`namespace Cypress { interface Chainable }`, matching the existing JSDoc
style. `RegistrationData` is imported from `user.types.ts`.

### 6. Domain types — extend `cypress/types/user.types.ts`

Add `RegistrationData` interface (all form fields the page object types
into). String-typed throughout to match form contract.

### 7. Factory — `cypress/test-data/factories/user-registration.factory.ts` (new)

`buildRegistrationData(overrides?: Partial<RegistrationData>): RegistrationData`.

Uniqueness strategy: append `Date.now().toString(36)` + a short random
suffix to `loginName` and to the local-part of the email. This avoids the
live site rejecting reruns as "username/email already exists." Pattern
shape mirrors `product-search.factory.ts`.

Defaults: real-looking but obviously synthetic values (e.g. `firstName:
'Test'`, `lastName: 'User'`, fixed address in a known country/zone the site
accepts — to be confirmed against the live select options during
implementation).

### 8. Spec — `cypress/e2e/ui/auth/register-user.cy.ts` (new)

```ts
describe('User Registration', { tags: ['@ui', '@smoke'] }, () => {
  it('should register a new user with valid data', () => {
    setAllureMetadata({
      epic: 'Authentication',
      feature: 'Registration',
      story: 'Successful registration',
      severity: 'critical',
      tags: ['ui', 'smoke'],
    });

    const data = buildRegistrationData();

    cy.openRegisterPage();
    cy.shouldSeeRegisterPage();
    cy.registerUser(data);
    cy.shouldSeeAccountCreated();
  });
});
```

## Constraints / project rules to honor

- No `cy.wait(<ms>)` — rely on built-in retry + the generous default
  timeouts.
- No `{ force: true }`.
- No `.only`, no empty `it`.
- Use `import type` for type-only imports.
- Path aliases (`@selectors/*`, `@pages/*`, etc.) preferred over deep
  relative imports — but existing auth files use relative imports, so stay
  consistent with neighbors.
- Spec must not import selectors or page objects directly (4-layer rule).

## Verification before completion

- `npm run typecheck` clean
- `npm run lint` clean
- `npx cypress run --spec 'cypress/e2e/ui/auth/register-user.cy.ts'`
  passes end-to-end against the live site

## Risk

- Form field IDs / select-option values must be verified against the live
  site before the test will pass. Implementation step opens the page (or
  uses Playwright MCP to snapshot it) and adjusts selectors accordingly.
- Live site availability — same risk all live-hitting specs in this suite
  already accept.
