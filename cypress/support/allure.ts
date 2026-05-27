import * as allure from 'allure-js-commons';

export type AllureSeverity = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';

interface AllureMetadata {
  epic: string;
  feature: string;
  story: string;
  severity?: AllureSeverity;
  owner?: string;
  tags?: string[];
  description?: string;
}

export const setAllureMetadata = ({
  epic,
  feature,
  story,
  severity = 'normal',
  owner = 'QA Automation',
  tags = [],
  description,
}: AllureMetadata): void => {
  void allure.epic(epic);
  void allure.feature(feature);
  void allure.story(story);
  void allure.severity(severity);
  void allure.owner(owner);

  if (description) {
    void allure.description(description);
  }

  if (tags.length > 0) {
    void allure.tags(...tags);
  }
};
