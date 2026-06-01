export interface HeaderNavLink {
  /** Human label, used in the it() title and Allure story. */
  name: string;
  /** Click selector for the header link. */
  selector: string;
  /** Expected rt route fragment on the destination URL, or '' for the base home route. */
  expectedRoute: string;
  /** Expected text contained in the destination page's .heading1. */
  expectedHeading: string;
}
