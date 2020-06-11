import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconTrash } from 'hds-react';

import Card from '../../../../common/card/Card';
import CardBody from '../../../../common/cardBody/CardBody';
import Grid from '../../../../common/grid/Grid';
import Property from '../../../../common/property/Property';
import styles from './pierProperties.module.scss';
import { Pier } from '../../utils/utils';
import Section from '../../../../common/section/Section';
import Text from '../../../../common/text/Text';
import { IconFence, IconPlug, IconStreetLight, IconWaterTap } from '../../../../common/icons';

export interface PierProperties {
  pier: Pier;
}

const PierProperties = ({ pier }: PierProperties) => {
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
                icon={IconTrash}
                label={t('common.terminology.wasteCollection')}
                active={pier.wasteCollection}
              />
              <Property icon={IconFence} label={t('common.terminology.gate')} active={pier.gate} />
              <Property icon={IconPlug} label={t('common.terminology.electricity')} active={pier.electricity} />
              <Property icon={IconStreetLight} label={t('common.terminology.lighting')} active={pier.lighting} />
              <Property icon={IconWaterTap} label={t('common.terminology.water')} active={pier.water} />
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
