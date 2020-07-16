import React, { ReactNode } from 'react';
import classNames from 'classnames';

import Text from '../text/Text';
import styles from './inputWrapper.module.scss';

export type InputWrapperProps = {
  children?: ReactNode;
  helperText?: string;
  id: string;
  invalid?: boolean;
  label?: string;
};

/* Simplified duplicate of HDS internal InputWrapper */
const InputWrapper = ({ children, helperText, id, invalid, label }: InputWrapperProps) => (
  <div className={classNames(styles.root, invalid && styles.invalid)}>
    {label && (
      <label
        htmlFor={id}
        className={classNames({
          [styles.label]: true,
          [styles.invalid]: invalid,
        })}
      >
        {label}
      </label>
    )}
    <div className={styles.inputWrapper}>{children}</div>
    {helperText && (
      <Text className={styles.helperText} color={invalid ? 'critical' : undefined} size="s">
        {helperText}
      </Text>
    )}
  </div>
);

export default InputWrapper;
