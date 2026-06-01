import type { headerSelectors } from '../selectors/header.selectors';

/** Stable identifier for a header link; resolved to a selector inside HeaderNavPage. */
export type HeaderLinkKey = keyof typeof headerSelectors.links;

export interface HeaderNavLink {
  /** Human label, used in the it() title and Allure story. */
  name: string;
  /** Stable header-link key, resolved to a selector inside HeaderNavPage. */
  key: HeaderLinkKey;
  /** Expected rt route fragment on the destination URL, or '' for the base home route. */
  expectedRoute: string;
  /** Expected text contained in the destination page's .heading1. */
  expectedHeading: string;
}
