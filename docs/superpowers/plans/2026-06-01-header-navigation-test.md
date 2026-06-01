# Header Navigation Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a data-driven Cypress E2E spec that opens each main header navigation link of `automationteststore.com` from the home page and asserts the correct destination page loaded (URL route + page-specific heading).

**Architecture:** Bottom-up through the project's 4-layer stack (selectors → page object → flow → command → spec), plus a domain type and a static test-data array driving one `it()` per link. The spec is the behavioral test; the red→green moment is the final `cypress run`. Each lower layer is verified by `npm run typecheck` as it is added.

**Tech Stack:** Cypress 13+, TypeScript (strict), `@cypress/grep` tags, `allure-cypress`. Imports are **relative** to match every existing file in this repo (the path aliases in `tsconfig.json` are reserved but unused in current code).

**Validated against the live site (unauthenticated, empty cart, 1440×900):**

| name              | selector                                            | final route                   | `.heading1`      |
| ----------------- | --------------------------------------------------- | ----------------------------- | ---------------- |
| Home              | `#categorymenu a[href$="automationteststore.com/"]` | `/`                           | "Featured…"      |
| Specials          | `#main_menu_top a[href*="rt=product/special"]`      | `rt=product/special`          | "Special Offers" |
| Account           | `#main_menu_top a[href*="rt=account/account"]`      | `rt=account/login` (redirect) | "Account Login"  |
| Login or register | `#customer_menu_top a[href*="rt=account/login"]`    | `rt=account/login`            | "Account Login"  |
| Cart              | `#main_menu_top a[href*="rt=checkout/cart"]`        | `rt=checkout/cart`            | "Shopping Cart"  |
| Checkout          | `#main_menu_top a[href*="rt=checkout/shipping"]`    | `rt=checkout/cart` (redirect) | "Shopping Cart"  |

`#main_menu_top`, `#customer_menu_top`, `#categorymenu` are the visible containers at 1440×900 (`#main_menu` is a hidden 0×0 duplicate — do **not** use it).

---

### Task 1: Header selectors

**Files:**

- Create: `cypress/selectors/header.selectors.ts`

- [ ] **Step 1: Create the selectors file**

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

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS (exit 0, no errors).

- [ ] **Step 3: Commit**

```bash
git add cypress/selectors/header.selectors.ts
git commit -m "Add header navigation selectors"
```

---

### Task 2: HeaderNavLink domain type

**Files:**

- Create: `cypress/types/navigation.types.ts`

- [ ] **Step 1: Create the type file**

Domain types live in `<domain>.types.ts`, never in `cypress.d.ts` (per CLAUDE.md).

```ts
export interface HeaderNavLink {
  /** Human label, used in the it() title and Allure story. */
  name: string;
  /** Click selector for the header link. */
  selector: string;
  /** Expected rt route fragment on the destination URL, or '' for the base home route. */
  expectedRoute: string;
  /** Expected text contained in the destination page's .heading1. */
  expectedHeading: string;
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add cypress/types/navigation.types.ts
git commit -m "Add HeaderNavLink type"
```

---

### Task 3: Header nav links test data

**Files:**

- Create: `cypress/test-data/static/header-nav-links.ts`

- [ ] **Step 1: Create the data array**

Encodes the **actual** unauthenticated landing route + heading (Account → login, Checkout → cart, Home → base route / "Featured").

```ts
import type { HeaderNavLink } from '../../types/navigation.types';
import { headerSelectors } from '../../selectors/header.selectors';

export const headerNavLinks: readonly HeaderNavLink[] = [
  {
    name: 'Home',
    selector: headerSelectors.links.home,
    expectedRoute: '',
    expectedHeading: 'Featured',
  },
  {
    name: 'Specials',
    selector: headerSelectors.links.specials,
    expectedRoute: 'rt=product/special',
    expectedHeading: 'Special Offers',
  },
  {
    name: 'Account',
    selector: headerSelectors.links.account,
    expectedRoute: 'rt=account/login',
    expectedHeading: 'Account Login',
  },
  {
    name: 'Login or register',
    selector: headerSelectors.links.loginRegister,
    expectedRoute: 'rt=account/login',
    expectedHeading: 'Account Login',
  },
  {
    name: 'Cart',
    selector: headerSelectors.links.cart,
    expectedRoute: 'rt=checkout/cart',
    expectedHeading: 'Shopping Cart',
  },
  {
    name: 'Checkout',
    selector: headerSelectors.links.checkout,
    expectedRoute: 'rt=checkout/cart',
    expectedHeading: 'Shopping Cart',
  },
];
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add cypress/test-data/static/header-nav-links.ts
git commit -m "Add header navigation links test data"
```

---

### Task 4: HeaderNavPage page object

**Files:**

- Create: `cypress/pages/HeaderNavPage.ts`

- [ ] **Step 1: Create the page object**

Extends `BasePage`; uses inherited `clickElement` and `getElement`. Method name `assertOnPage` avoids colliding with `BasePage.shouldBeVisible` (per the BasePage shadowing guidance in CLAUDE.md).

```ts
import { BasePage } from './BasePage';
import { headerSelectors } from '../selectors/header.selectors';

class HeaderNavPage extends BasePage {
  clickLink(selector: string): void {
    this.clickElement(selector);
  }

  assertOnPage(expectedRoute: string, expectedHeading: string): void {
    if (expectedRoute === '') {
      cy.location('pathname').should('eq', '/');
    } else {
      cy.location('search').should('contain', expectedRoute);
    }

    this.getElement(headerSelectors.pageHeading)
      .should('be.visible')
      .and('contain.text', expectedHeading);
  }
}

export const headerNavPage = new HeaderNavPage();
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add cypress/pages/HeaderNavPage.ts
git commit -m "Add HeaderNavPage page object"
```

---

### Task 5: Header navigation flow

**Files:**

- Create: `cypress/flows/navigation/header-nav.flow.ts`

- [ ] **Step 1: Create the flow**

```ts
import type { HeaderNavLink } from '../../types/navigation.types';
import { headerNavPage } from '../../pages/HeaderNavPage';

export const openHeaderLinkFlow = (link: HeaderNavLink): void => {
  headerNavPage.clickLink(link.selector);
};

export const verifyHeaderLinkPageFlow = (link: HeaderNavLink): void => {
  headerNavPage.assertOnPage(link.expectedRoute, link.expectedHeading);
};
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add cypress/flows/navigation/header-nav.flow.ts
git commit -m "Add header navigation flow"
```

---

### Task 6: Commands + type augmentation

**Files:**

- Modify: `cypress/support/commands/navigation.commands.ts`
- Modify: `cypress/types/cypress.d.ts`

- [ ] **Step 1: Add the commands**

Replace the entire contents of `cypress/support/commands/navigation.commands.ts` with:

```ts
import type { HeaderNavLink } from '../../types/navigation.types';
import { openHomePageFlow, verifyHomePageIsVisibleFlow } from '../../flows/navigation/home.flow';
import {
  openHeaderLinkFlow,
  verifyHeaderLinkPageFlow,
} from '../../flows/navigation/header-nav.flow';
import { logStep } from '../log';

Cypress.Commands.add('openHomePage', () => {
  logStep('openHomePage', 'Open Automation Test Store home page');
  openHomePageFlow();
});

Cypress.Commands.add('shouldSeeHomePage', () => {
  logStep('shouldSeeHomePage', 'Verify Automation Test Store home page is visible');
  verifyHomePageIsVisibleFlow();
});

Cypress.Commands.add('openHeaderLink', (link: HeaderNavLink) => {
  logStep('openHeaderLink', `Open "${link.name}" link from the header`);
  openHeaderLinkFlow(link);
});

Cypress.Commands.add('shouldSeeHeaderPage', (link: HeaderNavLink) => {
  logStep('shouldSeeHeaderPage', `Verify "${link.name}" header link opened the correct page`);
  verifyHeaderLinkPageFlow(link);
});
```

- [ ] **Step 2: Augment the Cypress Chainable interface**

In `cypress/types/cypress.d.ts`, add this import at the top alongside the existing `import type` lines:

```ts
import type { HeaderNavLink } from './navigation.types';
```

Then add these two declarations inside `interface Chainable { ... }` (place them right after `shouldSeeHomePage(): Chainable<void>;`):

```ts
      /**
       * Opens a navigation link from the site header.
       */
      openHeaderLink(link: HeaderNavLink): Chainable<void>;

      /**
       * Verifies that the given header link opened its correct destination page.
       */
      shouldSeeHeaderPage(link: HeaderNavLink): Chainable<void>;
```

- [ ] **Step 3: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS (commands typed via the new Chainable members; no unused-import or type errors).

- [ ] **Step 4: Commit**

```bash
git add cypress/support/commands/navigation.commands.ts cypress/types/cypress.d.ts
git commit -m "Add openHeaderLink and shouldSeeHeaderPage commands"
```

---

### Task 7: Header navigation spec

**Files:**

- Create: `cypress/e2e/ui/navigation/header-navigation.cy.ts`

- [ ] **Step 1: Create the spec**

Data-driven `forEach` generates one `it()` per link. `beforeEach` re-opens the home page so each test is isolated. (Relative import depth: spec is at `cypress/e2e/ui/navigation/`, so `../../../` reaches `cypress/`.)

```ts
import { setAllureMetadata } from '../../../support/allure';
import { headerNavLinks } from '../../../test-data/static/header-nav-links';

describe('Header Navigation', { tags: ['@ui'] }, () => {
  beforeEach(() => {
    cy.openHomePage();
  });

  headerNavLinks.forEach((link) => {
    it(`opens the ${link.name} page from the header`, () => {
      setAllureMetadata({
        epic: 'Navigation',
        feature: 'Header',
        story: link.name,
        severity: 'normal',
        tags: ['ui', 'navigation'],
      });

      cy.openHeaderLink(link);

      cy.shouldSeeHeaderPage(link);
    });
  });
});
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add cypress/e2e/ui/navigation/header-navigation.cy.ts
git commit -m "Add header navigation spec"
```

---

### Task 8: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Run the new spec headless**

Run: `npx cypress run --spec 'cypress/e2e/ui/navigation/header-navigation.cy.ts'`
Expected: PASS — `6 passing`, 0 failing. Each test clicks one header link and asserts the route + `.heading1`.

If a `#main_menu_top` link is reported not visible, confirm the run used the configured 1440×900 viewport (it is set in `cypress.config.ts`); the visible main-menu container at that width is `#main_menu_top`, not `#main_menu`.

- [ ] **Step 2: Run the full quality sweep**

Run: `npm run quality:check`
Expected: PASS (typecheck + lint + format:check all green).

- [ ] **Step 3: Final commit (only if format:check applied changes)**

```bash
git add -A
git commit -m "Apply formatting for header navigation test"
```

---

## Self-review notes

- **Spec coverage:** every section of `docs/superpowers/specs/2026-06-01-header-navigation-test-design.md` maps to a task — selectors (T1), domain type (T2), test data (T3), page object (T4), flow (T5), commands + `cypress.d.ts` (T6), spec (T7), verification (T8).
- **Type consistency:** `HeaderNavLink` fields (`name`, `selector`, `expectedRoute`, `expectedHeading`) are used identically in the test data (T3), flow (T5), commands (T6), and spec (T7). Page-object methods `clickLink` / `assertOnPage` match their call sites in the flow.
- **No placeholders:** every code step contains complete, runnable content.
