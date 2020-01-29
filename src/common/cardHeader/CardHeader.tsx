import React from 'react';

import styles from './cardHeader.module.scss';

export interface CardHeaderProps {
  title: string;
}

const CardHeader: React.SFC<CardHeaderProps> = ({ title }) => {
  return <div className={styles.cardHeader}>{title}</div>;
};

export default CardHeader;
