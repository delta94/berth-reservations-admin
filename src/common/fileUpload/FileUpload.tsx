import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './fileUpload.module.scss';
import Text from '../text/Text';
import FileUploadButton, { FileUploadButtonProps } from './fileUploadButton/FileUploadButton';
import List from '../list/List';
import Icon from '../icons/Icon';
import { formatBytes } from '../utils/format';

type FileType = undefined | File | File[];

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  buttonProps?: FileUploadButtonProps;
  disabled?: boolean;
  label?: string;
  /* max size in bytes */
  maxSize?: number;
  multiple?: boolean;
  name: string;
  onChange: (value: FileType) => void;
  value?: FileType;
}

const FileUpload: FunctionComponent<FileUploadProps> = ({
  buttonProps = {
    size: 'small',
    color: 'supplementary',
  },
  disabled,
  label,
  maxSize,
  multiple,
  name,
  onChange,
  value,
  ...rest
}) => {
  const { t, i18n } = useTranslation();

  const handleChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    if (event.currentTarget.files) {
      const newFiles = Array.from(event.currentTarget.files);
      if (multiple) {
        return onChange(Array.isArray(value) ? (value as File[]).concat(newFiles) : newFiles);
      }
      return onChange(newFiles[0]);
    }
  };

  const removeFromList = (targetFile: File) => {
    if (multiple) {
      return onChange((value as File[]).filter((file) => file !== targetFile));
    }
    return onChange(undefined);
  };

  const renderFileList = (value: FileType) => {
    if (value === undefined) return;
    const fileList = multiple ? (value as File[]) : [value as File];
    return (
      <List noBullets>
        {fileList.map((file) => (
          <li key={file.name} className={styles.fileListItem}>
            <Text
              color="brand"
              className={classNames(styles.fileName, maxSize && file.size > maxSize && styles.fileOverMaxSize)}
            >
              {file.name}
              {file.size > 0 && ` (${formatBytes(file.size, i18n.language)})`}
            </Text>
            <button className={styles.delete} type="button" onClick={() => removeFromList(file)}>
              <Icon shape="IconTimes" color="critical" />
            </button>
          </li>
        ))}
      </List>
    );
  };

  return (
    <div className={styles.fileUpload}>
      <span className={styles.labelText}>{label}</span>
      {renderFileList(value)}
      <div className={styles.row}>
        <label className={styles.field}>
          <input
            {...rest}
            className={styles.input}
            disabled={disabled}
            type="file"
            name={name}
            multiple={multiple}
            onChange={handleChange}
          />
          <FileUploadButton {...buttonProps} disabled={disabled} label={buttonProps.label || `${t('common.add')}...`} />
        </label>
        {maxSize && (
          <Text className={styles.maxSize} color="secondary">
            {t('common.fileUpload.maxSize', {
              maxSize: formatBytes(maxSize, i18n.language),
            })}
          </Text>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
