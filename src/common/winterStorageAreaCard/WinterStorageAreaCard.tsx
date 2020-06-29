import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Card from '../card/Card';
import CardHeader from '../cardHeader/CardHeader';
import Text from '../text/Text';
import CardBody from '../cardBody/CardBody';
import placeholder from '../placeholderImage.svg';
import Section from '../section/Section';
import ExternalLink from '../externalLink/ExternalLink';
import MapLinks from '../mapLinks/MapLinks';
import Grid from '../grid/Grid';
import Property from '../property/Property';
import { IconDollyEmpty, IconFence, IconPlug, IconTrestle, IconWaterTap, IconBoat } from '../icons';
import { WinterStorageArea } from '../../features/winterStorageAreaView/types';
import { getProductServiceTKey } from '../utils/translations';
import { ProductServiceType } from '../../@types/__generated__/globalTypes';
import styles from './winterStorageAreaCard.module.scss';

interface WinterStorageAreaCardProps extends WinterStorageArea {
  className?: string;
}

const WinterStorageAreaCard = ({
  className,
  name,
  servicemapId,
  imageFile,
  streetAddress,
  zipCode,
  municipality,
  numberOfCustomers,
  gate,
  water,
  electricity,
  summerStorageForBoats,
  summerStorageForDockingEquipment,
  summerStorageForTrailers,
  maps,
}: WinterStorageAreaCardProps) => {
  const { t } = useTranslation();
  const serviceMapUrl = `${process.env.REACT_APP_SERVICE_MAP_URI}${servicemapId}`;

  return (
    <Card className={classNames(className, styles.card)}>
      <CardHeader title={t('winterStorageAreaCard.title')} />
      <CardBody>
        <div className={styles.cardBody}>
          <div className={styles.details}>
            <div className={styles.imageWrapper}>
              <img
                alt={t('winterStorageAreaCard.imgAlt')}
                src={imageFile ? imageFile : placeholder}
                className={styles.image}
              />
            </div>
            <div>
              <Section>
                <Text as="h2" size="xxl">
                  {name}
                </Text>
                <Text>
                  {streetAddress ? `${streetAddress}, ${zipCode} ${municipality}` : `${zipCode} ${municipality}`}
                </Text>
              </Section>
              <Section>
                <ExternalLink href={serviceMapUrl} variant="withArrow">
                  {t('common.terminology.serviceMap')}
                </ExternalLink>
              </Section>
              <MapLinks maps={maps} />
            </div>
          </div>
          <Grid colsCount={6} className={styles.propsGrid}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <Property counter={numberOfCustomers} label={t('winterStorageAreaCard.numberOfCustomers')} />

            <Property
              icon={IconPlug}
              label={t(getProductServiceTKey(ProductServiceType.ELECTRICITY))}
              active={electricity}
              className={styles.wordBreak}
            />
            <Property
              icon={IconFence}
              label={t(getProductServiceTKey(ProductServiceType.GATE))}
              active={gate}
              className={styles.wordBreak}
            />
            <Property
              icon={IconWaterTap}
              label={t(getProductServiceTKey(ProductServiceType.WATER))}
              active={water}
              className={styles.wordBreak}
            />
            <Property
              icon={IconBoat}
              label={t('common.terminology.boatSummerStorage')}
              active={summerStorageForBoats}
              className={styles.wordBreak}
            />
            <Property
              icon={IconDollyEmpty}
              label={t(getProductServiceTKey(ProductServiceType.SUMMER_STORAGE_FOR_TRAILERS))}
              active={summerStorageForTrailers}
              className={styles.wordBreak}
            />
            <Property
              icon={IconTrestle}
              label={t(getProductServiceTKey(ProductServiceType.SUMMER_STORAGE_FOR_DOCKING_EQUIPMENT))}
              active={summerStorageForDockingEquipment}
              className={styles.wordBreak}
            />
          </Grid>
        </div>
      </CardBody>
    </Card>
  );
};

export default WinterStorageAreaCard;
