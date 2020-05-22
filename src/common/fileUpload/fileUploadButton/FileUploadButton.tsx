import React from 'react';
import classNames from 'classnames';

import styles from './fileUploadButton.module.scss';

export interface FileUploadButtonProps {
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Defines the button color
   *
   * Available options: `'primary' | 'secondary' | 'supplementary'`
   */
  color: 'primary' | 'secondary' | 'tertiary' | 'supplementary';
  /**
   * If `true`, the button will be disabled
   */
  disabled?: boolean;
  /**
   * The content of the button
   */
  label: string;
  /**
   * The size of the button
   *
   * Available options: `'default' | 'small'`
   */
  size: 'default' | 'small';
}

/** Fork of HDS Button. 'button' replaced with 'div' */
const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  className,
  color,
  disabled,
  size,
  label,
}: FileUploadButtonProps) => {
  return (
    <div className={classNames(styles.button, styles[color], styles[size], disabled ? styles.disabled : '', className)}>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default FileUploadButton;
