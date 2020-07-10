import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconTrash } from 'hds-react';

import Text from '../text/Text';
import Grid from '../grid/Grid';
import InternalLink from '../internalLink/InternalLink';
import Section from '../section/Section';
import { formatDate } from '../utils/format';
import styles from './berthDetails.module.scss';
import { IconAccessibility, IconFence, IconPlug, IconStreetLight, IconWaterTap } from '../icons';
import Property from '../property/Property';

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

const BerthDetails = ({
  leases,
  gate,
  electricity,
  water,
  lighting,
  wasteCollection,
  isAccessible,
  comment,
  onEdit,
}: BerthDetailsProps) => {
  const { t, i18n } = useTranslation();

  const expiredLeasesElements = leases
    .filter((lease) => !lease.isActive)
    .map(({ startDate, endDate, customer }, i) => {
      return (
        <div key={i}>
          <Text>{`${formatDate(startDate, i18n.language)} - ${formatDate(endDate, i18n.language)}`}</Text>
          <InternalLink to={`/customers/${customer.id}`}>
            {customer.firstName !== '' && customer.lastName !== ''
              ? `${customer.firstName} ${customer.lastName}`
              : t('offer.berthDetails.emptyName')}
          </InternalLink>
        </div>
      );
    });

  const isDefined = (property: boolean | null | undefined): property is boolean =>
    property !== null && property !== undefined;

  const displayProperties = [gate, electricity, water, lighting, wasteCollection, isAccessible].find((property) =>
    isDefined(property)
  );

  return (
    <div className={styles.berthDetails}>
      {displayProperties && (
        <div className={styles.berthProperties}>
          {isDefined(gate) && (
            <Property className={styles.property} icon={IconFence} label={t('offer.berthDetails.gate')} active={gate} />
          )}
          {isDefined(electricity) && (
            <Property
              className={styles.property}
              icon={IconPlug}
              label={t('offer.berthDetails.electricity')}
              active={electricity}
            />
          )}
          {isDefined(water) && (
            <Property
              className={styles.property}
              icon={IconWaterTap}
              label={t('offer.berthDetails.water')}
              active={water}
            />
          )}
          {isDefined(lighting) && (
            <Property
              className={styles.property}
              icon={IconStreetLight}
              label={t('offer.berthDetails.lighting')}
              active={lighting}
            />
          )}
          {isDefined(wasteCollection) && (
            <Property
              className={styles.property}
              icon={IconTrash}
              label={t('offer.berthDetails.waste')}
              active={wasteCollection}
            />
          )}
          {isDefined(isAccessible) && (
            <Property
              className={styles.property}
              icon={IconAccessibility}
              label={t('offer.berthDetails.accessible')}
              active={isAccessible}
            />
          )}
        </div>
      )}
      <Grid colsCount={3} className={styles.grid}>
        <Section title={t('offer.berthDetails.previousLeases').toUpperCase()}>
          {expiredLeasesElements.length ? expiredLeasesElements : '-'}
        </Section>
        <Section title={t('offer.berthDetails.comment').toUpperCase()} className={styles.comment}>
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
