# Test Tagging Strategy

This project uses test tags to control which test suites are executed locally and in CI/CD.

## Available tags

| Tag           | Meaning                                      |
| ------------- | -------------------------------------------- |
| `@smoke`      | Critical, fast checks for core functionality |
| `@regression` | Broader regression coverage                  |
| `@ui`         | UI end-to-end tests                          |
| `@api`        | API / HTTP route tests                       |
| `@mocked`     | Tests using mocked HTTP responses            |
| `@negative`   | Negative scenarios and error handling        |

## Common commands

```bash
npm run test:smoke
npm run test:regression
npm run test:ui
npm run test:api
npm run test:mocked
npm run test:negative
```
