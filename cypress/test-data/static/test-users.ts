import type { LoginCredentials } from '../../types/user.types';

export const invalidUsers: Record<string, LoginCredentials> = {
  invalidLogin: {
    loginName: 'invalid_automation_user',
    password: 'WrongPassword123!',
  },
};
