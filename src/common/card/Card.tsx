import React from 'react';
import classNames from 'classnames';

import styles from './card.module.scss';

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className }: Props) => (
  <div className={classNames(styles.container, className)}>
    {title && <header>{title}</header>}
    <section>{children}</section>
  </div>
);

export default Card;
