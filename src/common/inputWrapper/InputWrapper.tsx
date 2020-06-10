import React, { ReactNode } from 'react';
import classNames from 'classnames';

import Text from '../text/Text';
import styles from './inputWrapper.module.scss';

export type InputWrapperProps = {
  children?: ReactNode;
  helperText?: string;
  id: string;
  invalid?: boolean;
  labelText?: string;
};

/* Simplified duplicate of HDS internal InputWrapper */
const InputWrapper = ({ children, helperText, id, invalid, labelText }: InputWrapperProps) => (
  <div className={classNames(styles.root, invalid && styles.invalid)}>
    {labelText && (
      <label
        htmlFor={id}
        className={classNames({
          [styles.labelText]: true,
          [styles.invalid]: invalid,
        })}
      >
        {labelText}
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
