import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';
import Grid from '../grid/Grid';
import styles from './applicationDetails.module.scss';
import Text from '../text/Text';
import { formatDimension, formatWeight, formatDate } from '../utils/format';
import { APPLICATION_STATUS } from '../utils/consonants';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import PrivateCustomerDetails, { PrivateCustomerDetailsProps } from '../privateCustomerDetails/PrivateCustomerDetails';
import OrganizationCustomerDetails, {
  OrganizationCustomerDetailsProps,
} from '../organizationCustomerDetails/OrganizationCustomerDetails';
import Checkbox from '../checkbox/Checkbox';
import ApplicationChoicesList, {
  HarborChoice,
  WinterStorageAreaChoice,
} from './applicationChoicesList/ApplicationChoicesList';

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

interface SummaryInformation {
  applicationCode: string;
  acceptBoatingNewsletter: boolean;
  acceptFitnessNews: boolean;
  acceptLibraryNews: boolean;
  acceptOtherCultureNews: boolean;
}

export interface ApplicationDetailsProps {
  accessibilityRequired?: boolean;
  applicant?: PrivateCustomerDetailsProps | OrganizationCustomerDetailsProps;
  berthSwitch?: BerthSwitch | null;
  boatDraught?: number | null;
  boatLength: number;
  boatModel: string;
  boatName: string;
  boatRegistrationNumber: string;
  boatType?: string | null;
  boatWeight?: number | null;
  boatWidth: number;
  createdAt: string;
  customerId?: string;
  handleDeleteLease?: (id: string) => void;
  choices: Array<HarborChoice> | Array<WinterStorageAreaChoice>;
  id: string;
  lease?: Lease | null;
  queue: number | null;
  status: ApplicationStatus;
  summaryInformation?: SummaryInformation;
}

const ApplicationDetails = ({
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
  choices,
  lease,
  handleDeleteLease,
  accessibilityRequired,
  summaryInformation,
}: ApplicationDetailsProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Grid colsCount={3}>
      <div>
        <Section title={t('applicationList.applicationDetails.application')}>
          <LabelValuePair
            label={t('applicationList.applicationDetails.applicationType')}
            value={
              berthSwitch
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
        {berthSwitch && (
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
        {applicant &&
          ('organization' in applicant ? (
            <OrganizationCustomerDetails
              {...applicant}
              title={t('applicationList.applicationDetails.applicantCompanyInformation').toUpperCase()}
            />
          ) : (
            <PrivateCustomerDetails
              {...applicant}
              title={t('applicationList.applicationDetails.applicantInformation').toUpperCase()}
            />
          ))}
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
        {summaryInformation && (
          <Section title={t('applicationList.applicationDetails.winterStorageApplicationSummary')}>
            <LabelValuePair
              label={t('applicationList.applicationDetails.applicationCode')}
              value={summaryInformation.applicationCode}
            />
            <br />
            {summaryInformation.acceptBoatingNewsletter && (
              <div>
                <Text>{t('applicationList.applicationDetails.acceptBoatingNewsletter')}</Text>
              </div>
            )}
            {summaryInformation.acceptFitnessNews && (
              <div>
                <Text>{t('applicationList.applicationDetails.acceptFitnessNews')}</Text>
              </div>
            )}
            {summaryInformation.acceptLibraryNews && (
              <div>
                <Text>{t('applicationList.applicationDetails.acceptLibraryNews')}</Text>
              </div>
            )}
            {summaryInformation.acceptOtherCultureNews && (
              <div>
                <Text>{t('applicationList.applicationDetails.acceptOtherCultureNews')}</Text>
              </div>
            )}
          </Section>
        )}
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
          <ApplicationChoicesList choices={choices} applicationId={id} customerId={customerId} />
        )}
        <Section>
          <Checkbox
            id={'accessible'}
            label={t('applicationList.applicationDetails.accessible')}
            checked={accessibilityRequired}
            readOnly
            className={styles.accessibleCheckbox}
          />
        </Section>
      </div>
    </Grid>
  );
};

export default ApplicationDetails;
