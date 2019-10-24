import React from 'react';

import styles from './card.module.scss';

const Card = ({
  width,
  Header,
  children,
}: {
  width: string;
  Header: React.FC;
  children: React.ReactChildren;
}) => (
  <div style={{ width }}>
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  </div>
);

export default Card;
