import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../../common/card/Card';
import CardBody from '../../../../common/cardBody/CardBody';
import Grid from '../../../../common/grid/Grid';
import Property from '../../property/Property';
import styles from './pierProperties.module.scss';
import { Pier } from '../../utils/utils';
import Section from '../../../../common/section/Section';
import Text from '../../../../common/text/Text';

export interface PierProperties {
  pier: Pier;
}

const PierProperties: React.SFC<PierProperties> = ({ pier }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardBody>
        <div className={styles.pierProperties}>
          <Section>
            <Text as="h2" size="xl">
              {`${t('harborView.pierProperties.pier')} ${pier.identifier}`}
            </Text>
            <Text>{t('harborView.pierProperties.services')}</Text>
          </Section>
          <div className={styles.pierProperties}>
            <Grid colsCount={5} className={styles.propertiesGrid}>
              <Property
                iconShape="IconTrash"
                label={t('harborView.harborProperties.wasteCollection')}
                active={pier.wasteCollection}
              />
              <Property iconShape="IconFence" label={t('harborView.harborProperties.gate')} active={pier.gate} />
              <Property
                iconShape="IconPlug"
                label={t('harborView.harborProperties.electricity')}
                active={pier.electricity}
              />
              <Property
                iconShape="IconStreetLight"
                label={t('harborView.harborProperties.lighting')}
                active={pier.lighting}
              />
              <Property iconShape="IconWaterTap" label={t('harborView.harborProperties.water')} active={pier.water} />
            </Grid>
            <Grid colsCount={2} className={styles.boatTypesGrid}>
              {pier.suitableBoatTypes.map((suitableBoatType, id) => (
                <div key={id}>{suitableBoatType}</div>
              ))}
            </Grid>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PierProperties;
