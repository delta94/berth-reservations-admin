import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import Grid from '../../../common/grid/Grid';
import Checkbox from '../../../common/checkbox/Checkbox';
import styles from './applicationDetails.module.scss';
import InternalLink from '../../../common/internalLink/InternalLink';
import Text from '../../../common/text/Text';
import List from '../../../common/list/List';
import ListItem from '../../../common/list/ListItem';
import {
  formatDimension,
  formatWeight,
  formatDate,
} from '../../../common/utils/format';
import { APPLICATION_STATUS } from '../../../common/utils/consonants';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';
import PrivateCustomerDetails, {
  PrivateCustomerDetailsProps,
} from '../customerProfileCard/privateCustomerDetails/PrivateCustomerDetails';

interface HarborChoice {
  harborName: string;
  harbor: string;
  priority: number;
}

interface Lease {
  berthNum: string;
  harborId: string;
  harborName: string;
  id: string;
  pierIdentifier: string;
}

interface BerthSwitch {
  berthNum: string;
  harborId: string;
  harborName: string;
  pierIdentifier: string;
  reason: string | null;
}

export interface ApplicationDetailsProps {
  id: string;
  applicant?: PrivateCustomerDetailsProps;
  berthSwitch: BerthSwitch | null;
  createdAt: string;
  queue: number | null;
  status: ApplicationStatus;
  lease?: Lease | null;
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
  handleDeleteLease?: (id: string) => void;
}

const ApplicationDetails: React.SFC<ApplicationDetailsProps> = ({
  id,
  applicant,
  berthSwitch,
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
  lease,
  handleDeleteLease,
  accessibilityRequired,
}) => {
  const { t, i18n } = useTranslation();
  const notNull = (choice: HarborChoice | null): choice is HarborChoice =>
    !!choice;
  const routerQuery = new URLSearchParams(useLocation().search);

  return (
    <Grid colsCount={3}>
      <div>
        <Section title={t('applications.applicationDetails.application')}>
          <LabelValuePair
            label={t('applications.applicationDetails.applicationType')}
            value={
              berthSwitch !== null
                ? t('applications.applicationType.switchApplication')
                : t('applications.applicationType.newApplication')
            }
          />
          <LabelValuePair
            label={t('applications.applicationDetails.receivedDate')}
            value={formatDate(createdAt, i18n.language, true)}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.queueNumber')}
            value={`${queue || ''}`}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.status')}
            value={t(APPLICATION_STATUS[status]?.label)}
          />
        </Section>
        {berthSwitch !== null && (
          <Section title={t('applications.applicationDetails.currentBerth')}>
            <LabelValuePair
              label={t('applications.applicationDetails.portAndBerth')}
              value={`${berthSwitch.harborName} ${berthSwitch.pierIdentifier} ${berthSwitch.berthNum}`}
            />
            {berthSwitch.reason !== null && (
              <LabelValuePair
                label={t('applications.applicationDetails.reason')}
                value={`${berthSwitch.reason}`}
              />
            )}
          </Section>
        )}
        {applicant && (
          <PrivateCustomerDetails
            {...applicant}
            title={t(
              'applications.applicationDetails.applicantInformation'
            ).toUpperCase()}
          />
        )}
      </div>
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
            value={formatDimension(boatWidth, i18n.language)}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.boatLength')}
            value={formatDimension(boatLength, i18n.language)}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.boatDepth')}
            value={formatDimension(boatDraught, i18n.language)}
          />
          <LabelValuePair
            label={t('applications.applicationDetails.boatWeight')}
            value={formatWeight(boatWeight, i18n.language)}
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
        {lease ? (
          <Section
            title={t(
              'applications.applicationDetails.connectedLease'
            ).toUpperCase()}
          >
            {[lease.harborName, lease.pierIdentifier, lease.berthNum]
              .filter(Boolean)
              .join(' ')}
            {handleDeleteLease && (
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteLease(lease.id)}
              >
                <Text color="brand">
                  {t('applications.applicationDetails.deleteLease')}
                </Text>
              </button>
            )}
          </Section>
        ) : (
          <Section title={t('applications.applicationDetails.selectedPorts')}>
            <List noBullets>
              {[...harborChoices]
                .filter(notNull)
                .sort((choiceA, choiceB) => choiceA.priority - choiceB.priority)
                .map(({ harborName, harbor }, i) => {
                  routerQuery.set('harbor', harbor);

                  return (
                    <ListItem key={i}>
                      <Text>
                        {`${t('applications.applicationDetails.choice')} 
                      ${i + 1}: `}
                      </Text>
                      <InternalLink to={`/offer/${id}?${routerQuery}`}>
                        {harborName}
                      </InternalLink>
                    </ListItem>
                  );
                })}
            </List>
          </Section>
        )}
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
  );
};

export default ApplicationDetails;
