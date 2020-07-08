import React from 'react';
import classNames from 'classnames';

import styles from './grid.module.scss';

export interface GridProps {
  children: React.ReactNode;
  colsCount?: number;
  className?: string;
}

const Grid = ({ colsCount = 3, children, className }: GridProps) => {
  return <div className={classNames(styles.grid, styles[`cols${colsCount}`], className)}>{children}</div>;
};

export default Grid;
