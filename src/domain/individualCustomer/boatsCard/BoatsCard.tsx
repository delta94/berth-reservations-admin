import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import CardBody from '../../../common/cardBody/CardBody';
import CardHeader from '../../../common/cardHeader/CardHeader';
import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import { formatDimension, formatWeight } from '../../../common/utils/format';
import styles from './boatsCard.module.scss';
import { Boat, LargeBoat } from '../types';
import BoatCertificates from './BoatCertificates';
import { isLargeBoat } from './boatsCardUtils';

export interface BoatsCardProps {
  boats: (Boat | LargeBoat)[];
}

const BoatsCard: React.SFC<BoatsCardProps> = ({ boats }) => {
  const { t, i18n } = useTranslation();

  return (
    <Card className={styles.boatsCard}>
      <CardHeader title={t('individualCustomer.customerBoats.title')} />
      {boats.map(boat => (
        <CardBody key={boat.id}>
          <Section>
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatType')}
              value={boat.boatType.name}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.registrationNumber')}
              value={boat.registrationNumber}
            />
          </Section>
          <Section>
            <LabelValuePair
              label={t('individualCustomer.customerBoats.width')}
              value={formatDimension(boat.width, i18n.language)}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.length')}
              value={formatDimension(boat.length, i18n.language)}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.draught')}
              value={formatDimension(boat.draught, i18n.language)}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.weight')}
              value={formatWeight(boat.weight, i18n.language)}
            />
          </Section>
          <Section>
            <LabelValuePair
              label={t('individualCustomer.customerBoats.name')}
              value={boat.name}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.model')}
              value={boat.model}
            />
          </Section>
          {isLargeBoat(boat) && (
            <>
              <Section>
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.propulsion')}
                  value={boat.propulsion}
                />
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.hullMaterial')}
                  value={boat.hullMaterial}
                />
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.purpose')}
                  value={boat.intendedUse}
                />
              </Section>
              <BoatCertificates certificates={boat.certificates} />
            </>
          )}
        </CardBody>
      ))}
    </Card>
  );
};

export default BoatsCard;
