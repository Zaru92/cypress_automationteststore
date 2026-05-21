export const logStep = (name: string, message?: string): void => {
  Cypress.log({
    name,
    displayName: name,
    message: message ?? '',
  });
};
