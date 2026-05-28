import type { RegistrationData } from '../../types/user.types';

const generateUniqueSuffix = (): string =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const buildRegistrationData = (
  overrides: Partial<RegistrationData> = {},
): RegistrationData => {
  const suffix = generateUniqueSuffix();
  const password = 'TestPassword123!';

  return {
    firstName: 'Test',
    lastName: 'User',
    email: `test.user.${suffix}@example.com`,
    telephone: '555010199',
    address1: '123 Test Street',
    city: 'San Francisco',
    country: 'United States',
    zone: 'California',
    postcode: '94102',
    loginName: `test_user_${suffix}`,
    password,
    confirmPassword: password,
    ...overrides,
  };
};
