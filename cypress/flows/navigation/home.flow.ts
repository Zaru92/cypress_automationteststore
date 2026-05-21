import { homePage } from '../../pages/HomePage';

export const openHomePageFlow = (): void => {
  homePage.open();
};

export const verifyHomePageIsVisibleFlow = (): void => {
  homePage.assertLoaded();
};
