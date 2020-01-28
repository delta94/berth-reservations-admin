import React from 'react';
import classNames from 'classnames';

import styles from './card.module.scss';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.SFC<CardProps> = ({ children, className }) => (
  <div className={classNames(styles.card, className)}>{children} </div>
);

export default Card;
