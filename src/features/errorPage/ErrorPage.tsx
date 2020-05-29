import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './errorPage.module.scss';
import Text from '../../common/text/Text';
import Icon from '../../common/icons/Icon';
import InternalLink from '../../common/internalLink/InternalLink';

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Icon shape="IconExclamationCircle" size="large" />
        <Text as="h1" className={styles.heading}>
          {t('errorPage.heading')}
        </Text>
        <Text>{t('errorPage.text')}</Text>
        <InternalLink to={'/'} className={styles.link}>
          {t('errorPage.linkText')}
        </InternalLink>
      </div>
    </div>
  );
};

export default ErrorPage;
