import React from 'react';
import classNames from 'classnames';

import styles from './grid.module.scss';

export interface GridProps {
  colsCount: number;
  className?: string;
}

const Grid: React.SFC<GridProps> = ({ colsCount = 3, children, className }) => {
  return <div className={classNames(styles.grid, styles[`cols${colsCount}`], className)}>{children}</div>;
};

export default Grid;
