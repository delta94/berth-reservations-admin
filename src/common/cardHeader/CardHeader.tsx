import React from 'react';

import styles from './cardHeader.module.scss';

export interface CardHeaderProps {
  children?: React.ReactNode;
  title: string;
}

const CardHeader = ({ children, title }: CardHeaderProps) => (
  <div className={styles.cardHeader}>
    <span className={styles.title}>{title}</span>
    {React.Children.count(children) > 0 && <div className={styles.widgets}>{children}</div>}
  </div>
);

export default CardHeader;
