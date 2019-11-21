import React from 'react';
import classNames from 'classnames';

import styles from './grid.module.scss';

interface Props {
  colsCount?: number;
}

const Grid: React.SFC<Props> = ({ colsCount = 3, children }) => {
  return (
    <div className={classNames(styles.grid, styles[`cols${colsCount}`])}>
      {children}
    </div>
  );
};

export default Grid;
