import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './offer.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

interface OfferProps {
  children: React.ReactNode;
}

const Offer = ({ children }: OfferProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.offer}>
      <PageTitle title={t('offer.title')} />
      {children}
    </div>
  );
};

export default Offer;
