# CI/CD

This project uses GitHub Actions for automated quality checks and Cypress test execution.

## Workflows

### Quality Check

Runs on pull requests and pushes to `main`.

Checks:

- TypeScript typecheck
- ESLint
- Prettier format check

### Cypress E2E Tests

Runs Cypress tests in CI.

Pull requests:

- smoke tests

Push to `main`:

- regression tests in cross-browser matrix:
  - Chrome
  - Firefox
  - Electron

Manual dispatch:

- smoke
- regression
- api
- mocked
- negative
- full

## Artifacts

Each Cypress run uploads:

- Allure raw results
- Allure HTML report
- Cypress screenshots
- Cypress videos

Artifacts are retained for 7 days.

## Local equivalents

```bash
npm run quality:check
npm run test:smoke
npm run test:regression
npm run test:api
npm run test:mocked
npm run test:negative
npm run test:full
```
