import React, { FunctionComponent } from 'react';

import styles from './formTypeTitle.module.scss';

export interface FormTypeFieldProps {
  label: string;
  value: string;
}

const FormTypeTitle: FunctionComponent<FormTypeFieldProps> = ({
  label,
  value,
}) => (
  <div>
    <div className={styles.formTypeTitleLabel}>{label}</div>
    <div className={styles.formTypeTitleValue}>{value}</div>
  </div>
);

export default FormTypeTitle;
