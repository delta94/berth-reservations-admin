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
import HarborMapLinks from '../../../common/harborMapLinks/HarborMapLinks';

export interface HarborPropertiesProps {
  imageUrl: string | null;
  maps: {
    id: string;
    url: string;
  }[];
  name: string;
  address: string;
  servicemapId: string;
  properties: {
    electricity: boolean;
    gate: boolean;
    maxWidth: number;
    queue: number;
    numberOfFreePlaces: number;
    numberOfPlaces: number;
    water: boolean;
    wasteCollection: boolean;
    lighting: boolean;
  };
  editHarbor: () => void;
}

const HarborProperties: React.SFC<HarborPropertiesProps> = ({
  name,
  address,
  imageUrl,
  maps,
  servicemapId,
  properties,
  editHarbor,
}) => {
  const { t } = useTranslation();

  const serviceMapUrl = `${process.env.REACT_APP_SERVICE_MAP_URI}${servicemapId}`;

  return (
    <Card>
      <CardHeader title={t('harborView.harborProperties.title')}>
        <button onClick={editHarbor}>
          <Text weight="normalWeight">{t('common.edit')}</Text>
        </button>
      </CardHeader>
      <CardBody>
        <div className={styles.harborProperties}>
          <div className={styles.details}>
            <div className={styles.imageWrapper}>
              <img alt="Harbor's location" src={imageUrl ? imageUrl : placeholder} className={styles.image} />
            </div>
            <div>
              <Section>
                <Text as="h2" size="xxl">
                  {name}
                </Text>
                <Text>{address}</Text>
              </Section>
              <Section>
                <ExternalLink href={serviceMapUrl} variant="withArrow">
                  {t('common.terminology.serviceMap')}
                </ExternalLink>
              </Section>
              <HarborMapLinks maps={maps} />
            </div>
          </div>
          <Grid colsCount={5} className={styles.propsGrid}>
            <div />
            <Property counter={properties.numberOfPlaces} label={t('harborView.harborProperties.numberOfPlaces')} />
            <Property
              counter={properties.numberOfFreePlaces}
              label={t('harborView.harborProperties.numberOfFreePlaces')}
            />
            <Property counter={properties.queue} label={t('harborView.harborProperties.queue')} />
            <Property counter={properties.maxWidth} label={t('harborView.harborProperties.maxWidth')} />

            <Property
              iconShape="IconTrash"
              label={t('harborView.harborProperties.wasteCollection')}
              active={properties.wasteCollection}
            />
            <Property iconShape="IconFence" label={t('harborView.harborProperties.gate')} active={properties.gate} />

            <Property
              iconShape="IconPlug"
              label={t('harborView.harborProperties.electricity')}
              active={properties.electricity}
            />
            <Property
              iconShape="IconStreetLight"
              label={t('harborView.harborProperties.lighting')}
              active={properties.lighting}
            />
            <Property
              iconShape="IconWaterTap"
              label={t('harborView.harborProperties.water')}
              active={properties.water}
            />
          </Grid>
        </div>
      </CardBody>
    </Card>
  );
};

export default HarborProperties;
