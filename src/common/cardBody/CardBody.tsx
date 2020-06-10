import React from 'react';

import styles from './cardBody.module.scss';

interface CardBodyProps {
  children: React.ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
  return <div className={styles.cardBody}>{children}</div>;
};

export default CardBody;
