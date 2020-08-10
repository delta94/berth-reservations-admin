import React from 'react';
import classNames from 'classnames';

import styles from './cardBody.module.scss';

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={classNames(styles.cardBody, className)}>{children}</div>;
};

export default CardBody;
