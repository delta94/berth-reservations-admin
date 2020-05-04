import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../../../common/section/Section';
import { Boat, LargeBoat } from '../types';
import styles from './boatsCard.module.scss';
import Text from '../../../common/text/Text';
import ExternalLink from '../../../common/externalLink/ExternalLink';
import { formatDate } from '../../../common/utils/format';

export interface BoatCertificateProps {
  boat: Boat | LargeBoat;
}

const BoatCertificate: React.FC<BoatCertificateProps> = ({ boat }) => {
  const { t, i18n } = useTranslation();

  const validUntil = formatDate('2020-09-26', i18n.language);
  const checkedAt = formatDate('2020-09-20', i18n.language);

  return (
    <Section>
      <div className={styles.boatCertificate}>
        <div className={styles.boatCertificateLabel}>
          {t('individualCustomer.customerBoats.inspection')}:
        </div>
        <div className={styles.boatCertificateValues}>
          <div>
            <ExternalLink
              href="https://venepaikka-api.test.hel.ninja/media/boats/2c736de2-5659-46ea-ad3f-9c1364307d7d/dummy_pdf1.pdf"
              variant="default"
            >
              Dummy_cert.pdf
            </ExternalLink>
          </div>
          <div>
            <Text color={getValidUntilColor()}>
              {t('individualCustomer.customerBoats.validUntil', {
                validUntil,
              })}
            </Text>
          </div>
          <div>Tarkastettu {checkedAt}</div>
          <div>Santtu Satamapäällikkö</div>
        </div>
      </div>
    </Section>
  );
};

const getValidUntilColor = (): 'critical' | 'standard' => 'critical';

export default BoatCertificate;
