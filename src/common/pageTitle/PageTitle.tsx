import React, { FunctionComponent } from 'react';

import styles from './pageTitle.module.scss';

export interface PageTitleProps {
  title: string;
}

const PageTitle: FunctionComponent<PageTitleProps> = ({ title }) => {
  return <h2 className={styles.pageTitle}>{title.toUpperCase()}</h2>;
};

export default PageTitle;
