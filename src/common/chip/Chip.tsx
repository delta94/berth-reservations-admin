import React from 'react';
import classNames from 'classnames';

import styles from './chip.module.scss';

export interface ChipProps {
  color: 'blue' | 'red' | 'green' | 'yellow' | 'orange' | 'grey';
  label: string;
  className?: string;
}

const Chip: React.SFC<ChipProps> = ({ color, label, className }) => {
  return (
    <span className={classNames(styles.chip, styles[color], className)}>
      {label}
    </span>
  );
};

export default Chip;
