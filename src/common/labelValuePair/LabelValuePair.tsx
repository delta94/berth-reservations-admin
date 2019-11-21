import React from 'react';
import classNames from 'classnames';

import styles from './labelValuePair.module.scss';

interface Props {
  label: string;
  value?: string | null;
  labelColor?: 'standard' | 'brand' | 'critical' | 'secondary';
}

const LabelValuePair = ({
  label,
  value = '-',
  labelColor = 'standard',
}: Props) => (
  <div className={styles.labelValuePair}>
    <span className={classNames(styles.label, styles[labelColor])}>
      {label}:
    </span>
    <span className={styles.value}>{value}</span>
  </div>
);

export default LabelValuePair;
