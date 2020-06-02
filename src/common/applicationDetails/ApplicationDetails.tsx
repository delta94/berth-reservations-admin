import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';
import Grid from '../grid/Grid';
import Checkbox from '../checkbox/Checkbox';
import styles from './applicationDetails.module.scss';
import InternalLink from '../internalLink/InternalLink';
import Text from '../text/Text';
import List from '../list/List';
import ListItem from '../list/ListItem';
import { formatDimension, formatWeight, formatDate } from '../utils/format';
import { APPLICATION_STATUS } from '../utils/consonants';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import PrivateCustomerDetails, {
  PrivateCustomerDetailsProps,
} from '../customerProfileCard/privateCustomerDetails/PrivateCustomerDetails';

interface HarborChoice {
  harborName: string;
  harbor: string;
  priority: number;
}

interface Lease {
  berthNum: string | number;
  harborId: string;
  harborName: string;
  id: string;
  pierIdentifier: string;
}

interface BerthSwitch {
  berthNum: string | number;
  harborId: string;
  harborName: string;
  pierIdentifier: string;
  reason: string | null;
}

export interface ApplicationDetailsProps {
  id: string;
  customerId?: string;
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
  customerId,
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
  const notNull = (choice: HarborChoice | null): choice is HarborChoice => !!choice;
  const routerQuery = new URLSearchParams(useLocation().search);

  return (
    <Grid colsCount={3}>
      <div>
        <Section title={t('applicationList.applicationDetails.application')}>
          <LabelValuePair
            label={t('applicationList.applicationDetails.applicationType')}
            value={
              berthSwitch !== null
                ? t('applicationList.applicationType.switchApplication')
                : t('applicationList.applicationType.newApplication')
            }
          />
          <LabelValuePair
            label={t('applicationList.applicationDetails.receivedDate')}
            value={formatDate(createdAt, i18n.language, true)}
          />
          <LabelValuePair label={t('applicationList.applicationDetails.queueNumber')} value={`${queue || ''}`} />
          <LabelValuePair
            label={t('applicationList.applicationDetails.status')}
            value={t(APPLICATION_STATUS[status]?.label)}
          />
        </Section>
        {berthSwitch !== null && (
          <Section title={t('applicationList.applicationDetails.currentBerth')}>
            <LabelValuePair
              label={t('applicationList.applicationDetails.portAndBerth')}
              value={`${berthSwitch.harborName} ${berthSwitch.pierIdentifier} ${berthSwitch.berthNum}`}
            />
            {berthSwitch.reason !== null && (
              <LabelValuePair label={t('applicationList.applicationDetails.reason')} value={`${berthSwitch.reason}`} />
            )}
          </Section>
        )}
        {applicant && (
          <PrivateCustomerDetails
            {...applicant}
            title={t('applicationList.applicationDetails.applicantInformation').toUpperCase()}
          />
        )}
      </div>
      <div>
        <Section title={t('applicationList.applicationDetails.boatInfo')}>
          <LabelValuePair label={t('applicationList.applicationDetails.boatType')} value={boatType} />
          <LabelValuePair
            label={t('applicationList.applicationDetails.registrationNumber')}
            value={boatRegistrationNumber}
          />
        </Section>
        <Section>
          <LabelValuePair
            label={t('applicationList.applicationDetails.boatWidth')}
            value={formatDimension(boatWidth, i18n.language)}
          />
          <LabelValuePair
            label={t('applicationList.applicationDetails.boatLength')}
            value={formatDimension(boatLength, i18n.language)}
          />
          <LabelValuePair
            label={t('applicationList.applicationDetails.boatDepth')}
            value={formatDimension(boatDraught, i18n.language)}
          />
          <LabelValuePair
            label={t('applicationList.applicationDetails.boatWeight')}
            value={formatWeight(boatWeight, i18n.language)}
          />
        </Section>
        <Section>
          <LabelValuePair label={t('applicationList.applicationDetails.boatName')} value={boatName} />
          <LabelValuePair label={t('applicationList.applicationDetails.boatBrand')} value={boatModel} />
        </Section>
      </div>
      <div>
        {lease ? (
          <Section title={t('applicationList.applicationDetails.connectedLease').toUpperCase()}>
            {[lease.harborName, lease.pierIdentifier, lease.berthNum].filter(Boolean).join(' ')}
            {handleDeleteLease && (
              <button className={styles.deleteButton} onClick={() => handleDeleteLease(lease.id)}>
                <Text color="brand">{t('applicationList.applicationDetails.deleteLease')}</Text>
              </button>
            )}
          </Section>
        ) : (
          <Section title={t('applicationList.applicationDetails.selectedPorts')}>
            <List noBullets>
              {[...harborChoices]
                .filter(notNull)
                .sort((choiceA, choiceB) => choiceA.priority - choiceB.priority)
                .map(({ harborName, harbor }, i) => {
                  routerQuery.set('harbor', harbor);

                  return (
                    <ListItem key={i}>
                      <Text>
                        {`${t('applicationList.applicationDetails.choice')} 
                      ${i + 1}: `}
                      </Text>
                      {!!customerId ? (
                        <InternalLink to={`/offer/${id}?${routerQuery}`}>{harborName}</InternalLink>
                      ) : (
                        <Text>{harborName}</Text>
                      )}
                    </ListItem>
                  );
                })}
            </List>
          </Section>
        )}
        <Section>
          <Checkbox
            label={t('applicationList.applicationDetails.accessible')}
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
