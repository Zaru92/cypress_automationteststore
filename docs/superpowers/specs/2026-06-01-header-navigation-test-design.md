# Header Navigation Test — Design

**Date:** 2026-06-01
**Branch:** `test/headerTest`

## Goal

Add a Cypress E2E test that, starting from the home page, opens each navigation
link in the site header of `https://automationteststore.com` and asserts the
correct destination page was opened. The test must stay consistent with the
project's 4-layer architecture (selectors → pages → flows → commands → spec).

## Scope

- One spec: `cypress/e2e/ui/navigation/header-navigation.cy.ts`.
- Data-driven: one `it()` per header link (six tests).
- Each test starts on the home page, clicks one header link, and asserts the
  destination via **both** the URL route **and** a page-specific element.
- Tagged `@ui` (core navigation healthcheck, sibling to
  `home-page-healthcheck.cy.ts`).

## Out of scope

- The product **category** menu (Apparel, Makeup, Skincare, …). The user scoped
  this test to the main nav menu only. Categories can be a later spec.
- Authenticated-session behavior. The test runs as an anonymous visitor, so
  Account and Checkout legitimately redirect (see below).
- The in-menu Login / "Check Your Order" dropdown sub-items, which require
  hovering the Account dropdown. Login is covered via the always-visible
  top-right "Login or register" link instead.

## Header links and their real destinations

Confirmed against the live site for an **unauthenticated, empty-cart** session
at the project's 1440×900 viewport. The header spans three containers
(`#customer_menu_top`, `#main_menu_top`, `#categorymenu`):

| Link (name)       | Click selector container | Final URL (route)    | `.heading1` text |
| ----------------- | ------------------------ | -------------------- | ---------------- |
| Home              | `#categorymenu`          | `/` (base route)     | "Featured…"      |
| Specials          | `#main_menu_top`         | `rt=product/special` | "Special Offers" |
| Account           | `#main_menu_top`         | → `rt=account/login` | "Account Login"  |
| Login or register | `#customer_menu_top`     | `rt=account/login`   | "Account Login"  |
| Cart              | `#main_menu_top`         | `rt=checkout/cart`   | "Shopping Cart"  |
| Checkout          | `#main_menu_top`         | → `rt=checkout/cart` | "Shopping Cart"  |

Two links redirect, and the test asserts the **actual** landing page (not the
nominal one) — required by the AGENTS.md rule that "page-level assertions should
not be stricter than the page's valid states":

- **Account** (`rt=account/account`) redirects to the login page because no user
  is signed in.
- **Checkout** (`rt=checkout/shipping`) redirects to the cart page because the
  cart is empty.

Consequence: Account and "Login or register" both land on "Account Login", and
Checkout lands on "Shopping Cart". These are distinct header links exercising the
same destination — both are tested, and the assertions reflect reality.

## Layered breakdown

### 1. Selectors — `cypress/selectors/header.selectors.ts` (new)

Exports `headerSelectors as const`. Click selectors are href-scoped and
container-anchored for stability (the `rt=` route in the href is the most stable
attribute these anchors carry — they have no ids/titles):

```ts
export const headerSelectors = {
  links: {
    home: '#categorymenu a[href$="automationteststore.com/"]',
    specials: '#main_menu_top a[href*="rt=product/special"]',
    account: '#main_menu_top a[href*="rt=account/account"]',
    cart: '#main_menu_top a[href*="rt=checkout/cart"]',
    checkout: '#main_menu_top a[href*="rt=checkout/shipping"]',
    loginRegister: '#customer_menu_top a[href*="rt=account/login"]',
  },
  pageHeading: '.heading1',
} as const;
```

`.heading1` is the page-specific element: it is present on every destination and
carries unique text per page, so it doubles as the "correct page" assertion.

### 2. Domain type — `cypress/types/navigation.types.ts` (new)

Per CLAUDE.md, domain types live in `<domain>.types.ts`, not `cypress.d.ts`:

```ts
export interface HeaderNavLink {
  name: string; // human label, used in the it() title
  selector: string; // header link click selector
  expectedRoute: string; // rt route fragment, or '' for the base home route
  expectedHeading: string; // expected .heading1 text on the destination
}
```

### 3. Test data — `cypress/test-data/static/header-nav-links.ts` (new)

A `readonly HeaderNavLink[]` of the six links, encoding the **actual** landing
route + heading from the table above (Account → login, Checkout → cart, Home →
base route / "Featured"). Imported via the `@test-data` / `@selectors` /
`@app-types` aliases.

### 4. Page object — `cypress/pages/HeaderNavPage.ts` (new, extends `BasePage`)

```ts
class HeaderNavPage extends BasePage {
  clickLink(selector: string): void; // delegates to this.clickElement(selector)
  assertOnPage(expectedRoute: string, expectedHeading: string): void;
}
```

`assertOnPage`:

- URL: if `expectedRoute === ''` (Home) assert `cy.location('pathname')` equals
  `'/'`; otherwise assert `cy.location('search')` contains `expectedRoute`.
- Page element: assert `headerSelectors.pageHeading` is visible and contains
  `expectedHeading` (uses `getElement` from `BasePage`).

Method names avoid colliding with `BasePage` helpers (`assertOnPage`, not
`shouldBeVisible`), per the BasePage shadowing guidance in CLAUDE.md.

### 5. Flow — `cypress/flows/navigation/header-nav.flow.ts` (new)

```ts
export const openHeaderLinkFlow = (link: HeaderNavLink): void =>
  headerNavPage.clickLink(link.selector);

export const verifyHeaderLinkPageFlow = (link: HeaderNavLink): void =>
  headerNavPage.assertOnPage(link.expectedRoute, link.expectedHeading);
```

### 6. Commands — `cypress/support/commands/navigation.commands.ts` (extend)

Add two commands alongside the existing `openHomePage` / `shouldSeeHomePage`,
each wrapped with `logStep` and delegating to the flow:

```ts
cy.openHeaderLink(link: HeaderNavLink); // -> openHeaderLinkFlow
cy.shouldSeeHeaderPage(link: HeaderNavLink); // -> verifyHeaderLinkPageFlow
```

The file is already wired into the `cypress/support/commands.ts` barrel, so no
barrel change is needed.

### 7. Type augmentation — `cypress/types/cypress.d.ts` (extend)

Add both commands to `namespace Cypress { interface Chainable { … } }`, importing
`HeaderNavLink` via `import type` from `@app-types/navigation.types`.

### 8. Spec — `cypress/e2e/ui/navigation/header-navigation.cy.ts` (new)

```ts
describe('Header Navigation', { tags: ['@ui'] }, () => {
  beforeEach(() => cy.openHomePage());

  headerNavLinks.forEach((link) => {
    it(`opens the ${link.name} page from the header`, () => {
      setAllureMetadata({ epic: 'Navigation', feature: 'Header', story: link.name, … });
      cy.openHeaderLink(link);
      cy.shouldSeeHeaderPage(link);
    });
  });
});
```

Each test is isolated (fresh `cy.openHomePage()` in `beforeEach`), so a single
broken link fails only its own `it()`.

## Verification

- `npm run typecheck`, `npm run lint`, `npm run format:check` (i.e.
  `npm run quality:check`) all pass.
- `npx cypress run --spec 'cypress/e2e/ui/navigation/header-navigation.cy.ts'`
  passes — six green tests.
