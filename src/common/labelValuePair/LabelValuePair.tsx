import React from 'react';

import styles from './labelValuePair.module.scss';

interface Props {
  label: string;
  value?: string | null;
}

const LabelValuePair = ({ label, value = '-' }: Props) => (
  <div>
    <span className={styles.label}>{label}:</span>
    <span className={styles.labelValue}>{value}</span>
  </div>
);

export default LabelValuePair;
