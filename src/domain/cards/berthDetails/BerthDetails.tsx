import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../../../common/icons/Icon';
import Text from '../../../common/text/Text';
import Grid from '../../../common/grid/Grid';
import InternalLink from '../../../common/internalLink/InternalLink';
import Section from '../../../common/section/Section';
import { formatDate } from '../../../common/utils/format';
import styles from './berthDetails.module.scss';

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
  onEdit?(): void;
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
  onEdit,
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

  const isDefined = (
    property: boolean | null | undefined
  ): property is boolean => property !== null && property !== undefined;
  const getColor = (property: boolean) => (property ? 'standard' : 'secondary');

  const displayProperties = [
    gate,
    electricity,
    water,
    lighting,
    wasteCollection,
    isAccessible,
  ].find(property => isDefined(property));

  return (
    <div className={styles.berthDetails}>
      {displayProperties && (
        <div className={styles.berthProperties}>
          {isDefined(gate) && (
            <div className={styles.property}>
              <Icon shape="IconFence" color={getColor(gate)} outlined />
              <Text className={styles.propertyLabel} color={getColor(gate)}>
                {t('offer.berthDetails.gate')}
              </Text>
            </div>
          )}
          {isDefined(electricity) && (
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
          {isDefined(water) && (
            <div className={styles.property}>
              <Icon shape="IconWaterTap" color={getColor(water)} outlined />
              <Text className={styles.propertyLabel} color={getColor(water)}>
                {t('offer.berthDetails.water')}
              </Text>
            </div>
          )}
          {isDefined(lighting) && (
            <div className={styles.property}>
              <Icon
                shape="IconStreetLight"
                color={getColor(lighting)}
                outlined
              />
              <Text className={styles.propertyLabel} color={getColor(lighting)}>
                {t('offer.berthDetails.lighting')}
              </Text>
            </div>
          )}
          {isDefined(wasteCollection) && (
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
          {isDefined(isAccessible) && (
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
      )}
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
        {onEdit && (
          <Section className={styles.editSection}>
            <button onClick={onEdit}>
              <Text color="brand">{t('common.edit')}</Text>
            </button>
          </Section>
        )}
      </Grid>
    </div>
  );
};

export default BerthDetails;
