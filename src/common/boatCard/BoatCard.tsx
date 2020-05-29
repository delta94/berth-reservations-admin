import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../card/Card';
import Grid from '../grid/Grid';
import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';
import CardHeader from '../cardHeader/CardHeader';
import CardBody from '../cardBody/CardBody';
import { formatDimension, formatWeight } from '../utils/format';
import { Boat } from './types';
import styles from './boatCard.module.scss';

interface BoatCardProps {
  boat: Boat;
}

const BoatCard: React.FC<BoatCardProps> = ({ boat }) => {
  const { t, i18n } = useTranslation();
  return (
    <Card className={styles.card}>
      <CardHeader title={t('offer.boatCard.heading')} />
      <CardBody>
        <Grid colsCount={2}>
          <Section>
            <LabelValuePair label={t('offer.boatCard.type')} value={boat.boatType} />
            <LabelValuePair label={t('offer.boatCard.boatRegistrationNumber')} value={boat.boatRegistrationNumber} />
            <LabelValuePair label={t('offer.boatCard.boatName')} value={boat.boatName} />
            <LabelValuePair label={t('offer.boatCard.boatModel')} value={boat.boatModel} />
          </Section>
          <Section>
            <LabelValuePair
              label={t('offer.boatCard.boatWidth')}
              value={formatDimension(boat.boatWidth, i18n.language)}
            />
            <LabelValuePair
              label={t('offer.boatCard.boatLength')}
              value={formatDimension(boat.boatLength, i18n.language)}
            />
            <LabelValuePair
              label={t('offer.boatCard.boatDraught')}
              value={formatDimension(boat.boatDraught, i18n.language)}
            />
            <LabelValuePair
              label={t('offer.boatCard.boatWeight')}
              value={formatWeight(boat.boatWeight, i18n.language)}
            />
          </Section>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default BoatCard;
