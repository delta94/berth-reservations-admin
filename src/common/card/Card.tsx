import React from 'react';
import classNames from 'classnames';

import styles from './card.module.scss';

export interface CardProps {
  title?: string;
  className?: string;
}

const Card: React.SFC<CardProps> = ({ title, children, className }) => (
  <div className={classNames(styles.container, className)}>
    {title && <header className={styles.header}>{title}</header>}
    <section className={styles.body}>{children}</section>
  </div>
);

export default Card;
