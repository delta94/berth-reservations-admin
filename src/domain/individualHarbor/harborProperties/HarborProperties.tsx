import React from 'react';
import { useTranslation } from 'react-i18next';

import ExternalLink from '../../../common/externalLink/ExternalLink';
import styles from './harborProperties.module.scss';
import Card from '../../../common/card/Card';
import Text from '../../../common/text/Text';
import Grid from '../../../common/grid/Grid';
import Property from '../property/Property';

export interface HarborPropertiesProps {
  imageUrl: string;
  name: string;
  address: string;
  servicemapId: string;
  properties: {
    electricity: boolean;
    gate: boolean;
    maximumWidth: number;
    numberOfPlaces: number;
    water: boolean;
    wasteCollection: boolean;
    lighting: boolean;
  };
}

const HarborProperties: React.SFC<HarborPropertiesProps> = ({
  name,
  address,
  imageUrl,
  servicemapId,
  properties,
}) => {
  const { t } = useTranslation();

  const serviceMapUrl = `${process.env.REACT_APP_SERVICE_MAP_URI}${servicemapId}`;

  return (
    <Card title={t('individualHarbor.harborProperties.title')}>
      <div className={styles.harborProperties}>
        <div className={styles.details}>
          <img
            alt="Harbor's location"
            src={imageUrl}
            className={styles.image}
          />
          <div className={styles.desc}>
            <Text as="h2" size="xl">
              {name}
            </Text>
            <Text>{address}</Text>
            <ExternalLink href={serviceMapUrl} variant="withArrow">
              {t('harbors.details.serviceMap')}
            </ExternalLink>
          </div>
        </div>
        <div className={styles.properties}>
          <Grid colsCount={4}>
            <Property
              counter={properties.numberOfPlaces}
              label={t('individualHarbor.harborProperties.numberOfPlaces')}
              active={!!properties.numberOfPlaces}
            />
            <Property
              iconName="globe"
              label={t('individualHarbor.harborProperties.queue')}
            />
            <Property
              iconName="plug"
              label={t('individualHarbor.harborProperties.electricity')}
              active={properties.electricity}
            />
            <Property
              iconName="waterTap"
              label={t('individualHarbor.harborProperties.water')}
              active={properties.water}
            />
            <Property
              counter={properties.maximumWidth}
              label={t('individualHarbor.harborProperties.maximumWidth')}
            />
            <Property
              iconName="trash"
              label={t('individualHarbor.harborProperties.wasteCollection')}
              active={properties.wasteCollection}
            />
            <Property
              iconName="fence"
              label={t('individualHarbor.harborProperties.gate')}
              active={properties.gate}
            />
            <Property
              iconName="streetLight"
              label={t('individualHarbor.harborProperties.lighting')}
              active={properties.lighting}
            />
          </Grid>
        </div>
      </div>
    </Card>
  );
};

export default HarborProperties;
