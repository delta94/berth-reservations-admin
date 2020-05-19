import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

import styles from './fileUpload.module.scss';
import Text from '../text/Text';
import FileUploadButton, { FileUploadButtonProps } from './fileUploadButton/FileUploadButton';
import List from '../list/List';
import Icon from '../icons/Icon';
import { formatBytes } from '../utils/format';

type PersistedFileContainer = {
  uuid: string;
  name: string;
  id?: string;
  data?: never;
  markedForDeletion?: boolean;
};

type NewFileContainer = {
  uuid: string;
  name: string;
  id?: never;
  data?: File;
  markedForDeletion?: never;
};

export type FileContainer = PersistedFileContainer | NewFileContainer;

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  buttonProps?: FileUploadButtonProps;
  disabled?: boolean;
  helperText?: string;
  invalid?: boolean;
  label?: string;
  /* max size in bytes */
  maxSize?: number;
  multiple?: boolean;
  name: string;
  onChange: (value: undefined | FileContainer | FileContainer[]) => void;
  value: undefined | FileContainer | FileContainer[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  buttonProps = {
    size: 'small',
    color: 'supplementary',
  },
  disabled,
  helperText,
  invalid = false,
  label,
  maxSize,
  multiple = false,
  name,
  onChange,
  value,
  ...rest
}) => {
  const { t, i18n } = useTranslation();

  const handleChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    if (event.currentTarget.files) {
      const eventFiles: FileContainer[] = Array.from(event.currentTarget.files).map((file) => ({
        uuid: uuid(),
        name: file.name,
        data: file,
      }));

      if (multiple) {
        return onChange(value === undefined ? eventFiles : (value as FileContainer[]).concat(eventFiles));
      }

      // single
      return onChange(eventFiles[0]);
    }
  };

  const handleDelete = (uuid: string) => {
    // multiple
    if (Array.isArray(value)) {
      return onChange(
        value.reduce<FileContainer[]>((acc, file) => {
          if (file.uuid !== uuid) return acc.concat(file);

          // New file, remove reference
          if (file.data !== undefined) return acc;

          // Persisted file, mark for deletion
          return acc.concat({
            ...(file as PersistedFileContainer),
            markedForDeletion: !file.markedForDeletion,
          });
        }, [])
      );
    }

    // single
    return onChange(
      (value as FileContainer).data !== undefined
        ? // New file, remove reference
          undefined
        : // Persisted file, mark for deletion
          {
            ...(value as PersistedFileContainer),
            markedForDeletion: !(value as PersistedFileContainer).markedForDeletion,
          }
    );
  };

  const renderFileList = () => {
    if (value === undefined) return undefined;

    const valueList = Array.isArray(value) ? value : [value];
    return (
      <List noBullets>
        {valueList.map((file, index) => {
          return (
            <li key={`${file.name}@${index}`} className={styles.fileListItem}>
              <Text
                color="brand"
                className={classNames({
                  [styles.fileName]: true,
                  [styles.overMaxSize]: maxSize && file.data && file.data.size > maxSize,
                  [styles.markedForDeletion]: file.markedForDeletion,
                })}
              >
                {`${file.name}`}
                {file.data && file.data.size > 0 && ` (${formatBytes(file.data.size, i18n.language)})`}
              </Text>

              <button className={styles.delete} type="button" onClick={() => handleDelete(file.uuid)}>
                {file.data ? (
                  <Icon shape="IconTimes" color="critical" />
                ) : (
                  <Icon shape="IconTrash" color={file.markedForDeletion ? 'secondary' : 'critical'} />
                )}
              </button>
            </li>
          );
        })}
      </List>
    );
  };

  return (
    <div className={styles.fileUpload}>
      <span
        className={classNames({
          [styles.labelText]: true,
          [styles.invalid]: invalid,
        })}
      >
        {label}
      </span>

      {renderFileList()}

      <div className={styles.row}>
        <label
          className={classNames({
            [styles.field]: true,
            [styles.invalid]: invalid,
          })}
        >
          <input
            {...rest}
            required={false} // handled in external validation
            className={styles.input}
            disabled={disabled}
            type="file"
            name={name}
            multiple={multiple}
            onChange={handleChange}
          />
          <FileUploadButton
            {...buttonProps}
            disabled={disabled}
            label={buttonProps.label || `${multiple ? t('common.add') : t('common.select')}...`}
          />
        </label>

        {maxSize && (
          <Text className={styles.maxSize} color="secondary">
            {t('common.fileUpload.maxSize', {
              maxSize: formatBytes(maxSize, i18n.language),
            })}
          </Text>
        )}
      </div>

      {helperText && (
        <Text color={invalid ? 'critical' : undefined} size="s" className={styles.helperText}>
          {helperText}
        </Text>
      )}
    </div>
  );
};

export default FileUpload;
