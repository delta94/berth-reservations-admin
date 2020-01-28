import React from 'react';

import styles from './cardBody.module.scss';

const CardBody: React.SFC = ({ children }) => {
  return <div className={styles.cardBody}>{children}</div>;
};

export default CardBody;
