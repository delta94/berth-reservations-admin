import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import ExternalLink from '../../../common/externalLink/ExternalLink';
import Text from '../../../common/text/Text';
import Grid from '../../../common/grid/Grid';
import Property from '../property/Property';
import styles from './harborProperties.module.scss';
import Section from '../../../common/section/Section';
import placeholder from './harborPlaceholder.svg';

export interface HarborPropertiesProps {
  imageUrl: string | null;
  name: string;
  address: string;
  servicemapId: string;
  properties: {
    electricity: boolean;
    gate: boolean;
    maximumWidth: number;
    queue: number;
    numberOfFreePlaces: number;
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
    <Card>
      <CardHeader title={t('individualHarbor.harborProperties.title')} />
      <CardBody>
        <div className={styles.harborProperties}>
          <div className={styles.details}>
            <img
              alt="Harbor's location"
              src={imageUrl ? imageUrl : placeholder}
              className={styles.image}
            />
            <div>
              <Section>
                <Text as="h2" size="xxl">
                  {name}
                </Text>
                <Text>{address}</Text>
              </Section>
              <Section>
                <ExternalLink href={serviceMapUrl} variant="withArrow">
                  {t('harbors.details.serviceMap')}
                </ExternalLink>
              </Section>
            </div>
          </div>
          <Grid colsCount={5} className={styles.propsGrid}>
            <div />
            <Property
              label={t('individualHarbor.harborProperties.numberOfPlaces')}
            />
            <Property
              counter={properties.numberOfFreePlaces}
              label={t('individualHarbor.harborProperties.numberOfFreePlaces')}
            />
            <Property
              counter={properties.queue}
              label={t('individualHarbor.harborProperties.queue')}
            />
            <Property
              counter={properties.maximumWidth}
              label={t('individualHarbor.harborProperties.maximumWidth')}
            />

            <Property
              iconShape="IconTrash"
              label={t('individualHarbor.harborProperties.wasteCollection')}
              active={properties.wasteCollection}
            />
            <Property
              iconShape="IconFence"
              label={t('individualHarbor.harborProperties.gate')}
              active={properties.gate}
            />

            <Property
              iconShape="IconPlug"
              label={t('individualHarbor.harborProperties.electricity')}
              active={properties.electricity}
            />
            <Property
              iconShape="IconStreetLight"
              label={t('individualHarbor.harborProperties.lighting')}
              active={properties.lighting}
            />
            <Property
              iconShape="IconWaterTap"
              label={t('individualHarbor.harborProperties.water')}
              active={properties.water}
            />
          </Grid>
        </div>
      </CardBody>
    </Card>
  );
};

export default HarborProperties;
