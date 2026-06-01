import type { HeaderNavLink } from '../../types/navigation.types';
import { headerNavPage } from '../../pages/HeaderNavPage';

export const openHeaderLinkFlow = (link: HeaderNavLink): void => {
  headerNavPage.clickLink(link.key);
};

export const verifyHeaderLinkPageFlow = (link: HeaderNavLink): void => {
  headerNavPage.assertOnPage(link.expectedRoute, link.expectedHeading);
};
