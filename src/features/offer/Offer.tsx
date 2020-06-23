import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './offer.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';

interface OfferProps {
  children: React.ReactNode;
}

const Offer = ({ children }: OfferProps) => {
  const { t } = useTranslation();
  return (
    <PageContent className={styles.offer}>
      <PageTitle title={t('offer.title')} />
      {children}
    </PageContent>
  );
};

export default Offer;
