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
import SectionWithButton from '../../../common/section/SectionWithButton';
import Text from '../../../common/text/Text';

export interface BoatsCardProps {
  boats: (Boat | LargeBoat)[];
  onEdit(boat: Boat | LargeBoat): void;
  onCreate(): void;
}

const BoatsCard = ({ boats, onEdit, onCreate }: BoatsCardProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Card className={styles.boatsCard}>
      <CardHeader title={t('customerView.customerBoats.title')} />
      {boats.map((boat) => (
        <CardBody key={boat.id}>
          <SectionWithButton
            title={t('customerView.customerBoats.boatInfo')}
            onClick={() => onEdit(boat)}
            buttonText={t('common.edit')}
          >
            <LabelValuePair label={t('customerView.customerBoats.boatType')} value={boat.boatType.name} />
            <LabelValuePair
              label={t('customerView.customerBoats.registrationNumber')}
              value={boat.registrationNumber}
            />
          </SectionWithButton>
          <Section>
            <LabelValuePair
              label={t('customerView.customerBoats.width')}
              value={formatDimension(boat.width, i18n.language)}
            />
            <LabelValuePair
              label={t('customerView.customerBoats.length')}
              value={formatDimension(boat.length, i18n.language)}
            />
            <LabelValuePair
              label={t('customerView.customerBoats.draught')}
              value={formatDimension(boat.draught, i18n.language)}
            />
            <LabelValuePair
              label={t('customerView.customerBoats.weight')}
              value={formatWeight(boat.weight, i18n.language)}
            />
          </Section>
          <Section>
            <LabelValuePair label={t('customerView.customerBoats.name')} value={boat.name} />
            <LabelValuePair label={t('customerView.customerBoats.model')} value={boat.model} />
          </Section>
          {isLargeBoat(boat) && (
            <>
              <Section>
                <LabelValuePair label={t('customerView.customerBoats.propulsion')} value={boat.propulsion} />
                <LabelValuePair label={t('customerView.customerBoats.hullMaterial')} value={boat.hullMaterial} />
                <LabelValuePair label={t('customerView.customerBoats.purpose')} value={boat.intendedUse} />
              </Section>
              <BoatCertificates certificates={boat.certificates} />
            </>
          )}
        </CardBody>
      ))}
      <CardBody className={styles.createBoat}>
        <button onClick={() => onCreate()}>
          <Text color="brand">{t('common.addNew')}</Text>
        </button>
      </CardBody>
    </Card>
  );
};

export default BoatsCard;
