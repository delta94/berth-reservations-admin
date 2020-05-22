import React from 'react';

import styles from './cardHeader.module.scss';

export interface CardHeaderProps {
  title: string;
}

const CardHeader: React.FunctionComponent<CardHeaderProps> = ({ children, title }) => (
  <div className={styles.cardHeader}>
    <span className={styles.title}>{title}</span>
    {React.Children.count(children) > 0 && <div className={styles.widgets}>{children}</div>}
  </div>
);

export default CardHeader;
