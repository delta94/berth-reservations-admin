import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../../../common/icons/Icon';
import Text from '../../../common/text/Text';
import Grid from '../../../common/grid/Grid';
import InternalLink from '../../../common/internalLink/InternalLink';
import Section from '../../../common/section/Section';
import { formatDate } from '../../../common/utils/format';
import styles from './berthDetails.module.scss';
import { LeaseStatus } from '../../../@types/__generated__/globalTypes';

interface Lease {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate: string;
  status: string;
  isActive: boolean;
}

export interface BerthDetailsProps {
  leases: Lease[];
  comment: string;
  gate?: boolean | null;
  electricity?: boolean | null;
  water?: boolean | null;
  lighting?: boolean | null;
  wasteCollection?: boolean | null;
  isAccessible?: boolean | null;
}

const BerthDetails: React.SFC<BerthDetailsProps> = ({
  leases,
  gate,
  electricity,
  water,
  lighting,
  wasteCollection,
  isAccessible,
  comment,
}) => {
  const { t, i18n } = useTranslation();

  const expiredLeasesElements = leases
    .filter(lease => !lease.isActive)
    .map(({ startDate, endDate, customer }, i) => {
      return (
        <div key={i}>
          <Text>{`${formatDate(startDate, i18n.language)} - ${formatDate(
            endDate,
            i18n.language
          )}`}</Text>{' '}
          <InternalLink to={`/customers/${customer.id}`}>
            {customer.firstName} {customer.lastName}
          </InternalLink>
        </div>
      );
    });

  const getColor = (property: boolean) => (property ? 'standard' : 'secondary');

  return (
    <div className={styles.berthDetails}>
      <div className={styles.berthProperties}>
        {gate && (
          <div className={styles.property}>
            <Icon shape="IconFence" color={getColor(gate)} outlined />
            <Text className={styles.propertyLabel} color={getColor(gate)}>
              {t('offer.berthDetails.gate')}
            </Text>
          </div>
        )}
        {electricity && (
          <div className={styles.property}>
            <Icon shape="IconPlug" color={getColor(electricity)} outlined />
            <Text
              className={styles.propertyLabel}
              color={getColor(electricity)}
            >
              {t('offer.berthDetails.electricity')}
            </Text>
          </div>
        )}
        {water && (
          <div className={styles.property}>
            <Icon shape="IconWaterTap" color={getColor(water)} outlined />
            <Text className={styles.propertyLabel} color={getColor(water)}>
              {t('offer.berthDetails.water')}
            </Text>
          </div>
        )}
        {lighting && (
          <div className={styles.property}>
            <Icon shape="IconStreetLight" color={getColor(lighting)} outlined />
            <Text className={styles.propertyLabel} color={getColor(lighting)}>
              {t('offer.berthDetails.lighting')}
            </Text>
          </div>
        )}
        {wasteCollection && (
          <div className={styles.property}>
            <Icon
              shape="IconTrash"
              color={getColor(wasteCollection)}
              outlined
            />
            <Text
              className={styles.propertyLabel}
              color={getColor(wasteCollection)}
            >
              {t('offer.berthDetails.waste')}
            </Text>
          </div>
        )}

        {isAccessible && (
          <div className={styles.property}>
            <Icon
              shape="IconAccessibility"
              color={getColor(isAccessible)}
              outlined
            />
            <Text
              className={styles.propertyLabel}
              color={getColor(isAccessible)}
            >
              {t('offer.berthDetails.accessible')}
            </Text>
          </div>
        )}
      </div>
      <Grid colsCount={3}>
        <Section title={t('offer.berthDetails.previousLeases').toUpperCase()}>
          {expiredLeasesElements.length ? expiredLeasesElements : '-'}
        </Section>
        <Section
          title={t('offer.berthDetails.comment').toUpperCase()}
          className={styles.comment}
        >
          <Text>{comment || '-'}</Text>
        </Section>
      </Grid>
    </div>
  );
};

export default BerthDetails;
