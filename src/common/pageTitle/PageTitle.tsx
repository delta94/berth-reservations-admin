import React from 'react';

import Text from '../text/Text';
import styles from './pageTitle.module.scss';

export interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Text as="h2" weight="normalWeight" size="xl" className={styles.pageTitle}>
      {title.toUpperCase()}
    </Text>
  );
};

export default PageTitle;
