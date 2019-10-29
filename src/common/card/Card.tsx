import React from 'react';

import styles from './card.module.scss';

const Card = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className={styles.container}>
      <header>{title}</header>
      {children}
    </div>
  </div>
);

export default Card;
