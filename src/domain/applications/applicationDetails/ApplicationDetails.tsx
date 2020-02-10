import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import Grid from '../../../common/grid/Grid';
import Checkbox from '../../../common/checkbox/Checkbox';
import styles from './applicationDetails.module.scss';

interface HarborChoice {
  harbor: string;
  priority: number;
}

export interface ApplicationDetailsProps {
  applicationType: string;
  createdAt: string;
  queue: number | null;
  status: string | null;
  boatType?: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
  boatName: string;
  boatModel: string;
  harborChoices: Array<HarborChoice | null>;
  accessibilityRequired: boolean;
}

const ApplicationDetails: React.SFC<ApplicationDetailsProps> = ({
  applicationType,
  createdAt,
  queue,
  status,
  boatType,
  boatRegistrationNumber,
  boatWidth,
  boatLength,
  boatDraught,
  boatWeight,
  boatName,
  boatModel,
  harborChoices,
  accessibilityRequired,
}) => {
  const { t } = useTranslation();
  const notNull = (choice: HarborChoice | null): choice is HarborChoice =>
    !!choice;

  return (
    <div className={styles.applicationsDetails}>
      <Grid colsCount={3}>
        <Section title={t('applications.applicationDetails.application')}>
          <LabelValuePair
            label={t('applications.applicationDetails.applicationType')}
            value={applicationType}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.receivedDate')}
            value={createdAt}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.queueNumber')}
            value={`${queue || ''}`}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.status')}
            value={status}
          />
        </Section>
        <div>
          <Section title={t('applications.applicationDetails.boatInfo')}>
            <LabelValuePair
              label={t('applications.applicationDetails.boatType')}
              value={boatType}
            />
            <LabelValuePair
              label={t('applications.applicationDetails.registrationNumber')}
              value={boatRegistrationNumber}
            />
          </Section>
          <Section>
            <LabelValuePair
              label={t('applications.applicationDetails.boatWidth')}
              value={`${boatWidth}`}
            />
            <LabelValuePair
              label={t('applications.applicationDetails.boatLength')}
              value={`${boatLength}`}
            />
            <LabelValuePair
              label={t('applications.applicationDetails.boatDepth')}
              value={`${boatDraught || ''}`}
            />
            <LabelValuePair
              label={t('applications.applicationDetails.boatWeight')}
              value={`${boatWeight || ''}`}
            />
          </Section>
          <Section>
            <LabelValuePair
              label={t('applications.applicationDetails.boatName')}
              value={boatName}
            />
            <LabelValuePair
              label={t('applications.applicationDetails.boatBrand')}
              value={boatModel}
            />
          </Section>
        </div>
        <div>
          <Section title={t('applications.applicationDetails.selectedPorts')}>
            {[...harborChoices]
              .filter(notNull)
              .sort((choiceA, choiceB) => choiceA.priority - choiceB.priority)
              .map(({ harbor }, i) => (
                <LabelValuePair
                  key={i}
                  label={`${t('applications.applicationDetails.choice')} ${i +
                    1}`}
                  value={harbor}
                />
              ))}
          </Section>
          <Section>
            <Checkbox
              label={t('applications.applicationDetails.accessible')}
              checked={accessibilityRequired}
              size="large"
              readOnly
            />
          </Section>
        </div>
      </Grid>
    </div>
  );
};

export default ApplicationDetails;
