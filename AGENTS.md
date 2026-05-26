# Project guidelines

This is a Cypress + TypeScript E2E testing portfolio project.

## Review guidelines

When reviewing pull requests, focus on:

- Cypress best practices
- TypeScript correctness
- stable selectors
- avoiding hard waits like cy.wait(5000)
- readable and maintainable test structure
- meaningful assertions
- reusable custom commands and helpers
- clean test data management
- avoiding duplicated test logic
- clear separation between selectors and test logic
- Do one complete pass over the whole diff before posting comments.
- Group all important findings in the first review instead of raising them gradually across repeated reviews.
- Before submitting the review, check the full diff against this checklist:
  - Cypress retryability: avoid non-retryable `.then()` filtering for dynamic UI lookups.
  - Product/cart lookups: prefer exact product-name matching over substring matching.
  - Selectors: avoid overly broad selectors when a more stable selector exists.
  - Assertions: page-level assertions should not be stricter than the page’s valid states.
  - Helpers/utilities: parsing helpers should handle realistic edge cases and have unit tests when practical.
  - Test architecture: keep selectors, page objects, flows, commands, and test data clearly separated.
- On follow-up reviews after requested fixes, focus on whether the previous comments were addressed.
- Do not raise new comments on unchanged code unless the new fix introduced a serious regression.
- Treat subjective style preferences as non-blocking unless they affect maintainability or test reliability.

Treat the following as important issues:

- flaky selectors
- unnecessary fixed waits
- tests that pass without meaningful assertions
- hardcoded data that should be moved to fixtures or factories
- duplicated logic across specs
- TypeScript types that are too broad, such as unnecessary any

Do not focus on:

- formatting handled by Prettier
- minor naming preferences
- subjective style comments
