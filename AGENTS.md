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
