import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Grid from '../../../common/grid/Grid';
import ExternalLink from '../../../common/externalLink/ExternalLink';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import { HarborData } from '../utils';
import styles from './harborDetails.module.scss';
import Section from '../../../common/section/Section';

type Props = {
  imageFile: HarborData['imageFile'];
  streetAddress: HarborData['streetAddress'];
  zipCode: HarborData['zipCode'];
  municipality: HarborData['municipality'];
  wwwUrl: HarborData['wwwUrl'];
  servicemapId: HarborData['servicemapId'];
  maxWidth: HarborData['maxWidth'];
};

const HarborDetails: React.SFC<Props> = ({
  imageFile,
  streetAddress,
  zipCode,
  municipality,
  wwwUrl,
  servicemapId,
  maxWidth,
}) => {
  const { t } = useTranslation();
  const address = `${streetAddress} ${zipCode} ${municipality}`;
  const imageSrc = imageFile ? imageFile : '';
  const url = wwwUrl ? wwwUrl : '';
  const serviceMapUrl = `${process.env.REACT_APP_SERVICE_MAP_URI}${servicemapId}`;

  return (
    <Grid colsCount={3}>
      <div className={classNames(styles.section, styles.harborAddress)}>
        <img className={styles.image} src={imageSrc} alt="map" />
        <div className={classNames(styles.address)}>
          <Section title={t('harbors.details.address')}>
            <ExternalLink href={url} variant="withArrow">
              {address}
            </ExternalLink>
            <ExternalLink href="">{t('harbors.details.portMap')}</ExternalLink>
            <ExternalLink href={serviceMapUrl}>{t('harbors.details.serviceMap')}</ExternalLink>
          </Section>
        </div>
      </div>
      <div className={classNames(styles.section)}>
        <Section>
          <LabelValuePair
            label={t('harbors.details.maxWidth')}
            labelColor="brand"
            value={maxWidth ? `${maxWidth}m` : '-'}
          />
          <LabelValuePair label={t('harbors.details.mooring')} labelColor="brand" value="-" />
          <LabelValuePair label={t('harbors.details.chief')} labelColor="brand" value="-" />
          <LabelValuePair label={t('harbors.details.maintenanceTeam')} labelColor="brand" value="-" />
        </Section>
      </div>
      <div className={classNames(styles.section)}>
        <Section title={t('harbors.details.recentActivities')}>-</Section>
      </div>
    </Grid>
  );
};

export default HarborDetails;
