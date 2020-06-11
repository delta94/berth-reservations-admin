import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../../../common/section/Section';
import { BoatCert } from '../types';
import styles from './boatsCard.module.scss';
import Text from '../../../common/text/Text';
import ExternalLink from '../../../common/externalLink/ExternalLink';
import { formatDate } from '../../../common/utils/format';
import { getFilename, getValidUntilColor } from './boatsCardUtils';

export interface BoatCertificateProps {
  certificate: BoatCert;
}

const BoatCertificate = ({ certificate }: BoatCertificateProps) => {
  const { t, i18n } = useTranslation();
  const { file, certificateType, validUntil, checkedAt, checkedBy } = certificate;
  const headerTextKey = `customerView.customerBoats.${certificateType.toLocaleLowerCase()}`;
  const filename = getFilename(file);

  return (
    <Section>
      <div className={styles.boatCertificate}>
        <div className={styles.boatCertificateLabel}>{t(headerTextKey)}:</div>
        <div className={styles.boatCertificateValues}>
          <div>
            {file ? (
              <ExternalLink href={file} variant="default">
                {filename}
              </ExternalLink>
            ) : (
              <Text color={'critical'}>{t('customerView.customerBoats.fileMissing')}</Text>
            )}
          </div>
          {validUntil && (
            <div>
              <Text color={getValidUntilColor(validUntil)}>
                {t('customerView.customerBoats.validUntil', {
                  validUntil: formatDate(validUntil, i18n.language),
                })}
              </Text>
            </div>
          )}
          {checkedAt && <div>Tarkastettu {formatDate(checkedAt, i18n.language)}</div>}
          {checkedBy && <div>{checkedBy}</div>}
        </div>
      </div>
    </Section>
  );
};

export default BoatCertificate;
