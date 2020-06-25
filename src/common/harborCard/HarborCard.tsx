import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IconTrash } from 'hds-react';

import Card from '../card/Card';
import CardHeader from '../cardHeader/CardHeader';
import CardBody from '../cardBody/CardBody';
import ExternalLink from '../externalLink/ExternalLink';
import Text from '../text/Text';
import Grid from '../grid/Grid';
import Property from '../property/Property';
import styles from './harborCard.module.scss';
import Section from '../section/Section';
import placeholderImage from '../placeholderImage.svg';
import MapLinks from '../mapLinks/MapLinks';
import { IconFence, IconPlug, IconStreetLight, IconWaterTap } from '../icons';

export interface HarborCardProps {
  className?: string;
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
  editHarbor?: () => void;
}

const HarborCard = ({
  className,
  name,
  address,
  imageUrl,
  maps,
  servicemapId,
  properties,
  editHarbor,
}: HarborCardProps) => {
  const { t } = useTranslation();

  const serviceMapUrl = `${process.env.REACT_APP_SERVICE_MAP_URI}${servicemapId}`;

  return (
    <Card className={classNames(className, styles.card)}>
      <CardHeader title={t('harborCard.title')}>
        {editHarbor && (
          <button onClick={editHarbor}>
            <Text weight="normalWeight">{t('common.edit')}</Text>
          </button>
        )}
      </CardHeader>
      <CardBody>
        <div className={styles.cardBody}>
          <div className={styles.details}>
            <div className={styles.imageWrapper}>
              <img
                alt={t('common.imageAltText')}
                src={imageUrl ? imageUrl : placeholderImage}
                className={styles.image}
              />
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
              <MapLinks maps={maps} />
            </div>
          </div>
          <Grid colsCount={5} className={styles.propsGrid}>
            <div />
            <Property counter={properties.numberOfPlaces} label={t('harborCard.numberOfPlaces')} />
            <Property counter={properties.numberOfFreePlaces} label={t('harborCard.numberOfFreePlaces')} />
            <Property counter={properties.queue} label={t('common.terminology.inQueue')} />
            <Property counter={properties.maxWidth} label={t('harborCard.maxWidth')} />

            <Property
              icon={IconTrash}
              label={t('common.terminology.wasteCollection')}
              active={properties.wasteCollection}
            />
            <Property icon={IconFence} label={t('common.terminology.gate')} active={properties.gate} />

            <Property icon={IconPlug} label={t('common.terminology.electricity')} active={properties.electricity} />
            <Property icon={IconStreetLight} label={t('common.terminology.lighting')} active={properties.lighting} />
            <Property icon={IconWaterTap} label={t('common.terminology.water')} active={properties.water} />
          </Grid>
        </div>
      </CardBody>
    </Card>
  );
};

export default HarborCard;
