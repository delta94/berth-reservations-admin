import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Button } from 'hds-react/lib';

import styles from './fileUpload.module.scss';
import Text from '../text/Text';
import List from '../list/List';
import Icon from '../icons/Icon';
import { formatBytes } from '../utils/format';

interface SharedProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  buttonLabel?: string;
  disabled?: boolean;
  helperText?: string;
  invalid?: boolean;
  label?: string;
  /* max size in bytes */
  maxSize?: number;
  name: string;
}

interface SingleModeProps extends SharedProps {
  multiple?: false;
  value: undefined | File;
  onChange: (value: undefined | File) => void;
}

interface MultipleModeProps extends SharedProps {
  multiple: true;
  value: File[];
  onChange: (value: File[]) => void;
}

export type FileUploadProps = SingleModeProps | MultipleModeProps;

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    buttonLabel,
    disabled,
    helperText,
    invalid = false,
    label,
    maxSize,
    multiple,
    name,
    onChange,
    value,
    ...rest
  } = props;
  const { t, i18n } = useTranslation();
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    if (event.currentTarget.files) {
      const eventFiles: File[] = Array.from(event.currentTarget.files);

      if (props.multiple) {
        props.onChange(props.value === undefined ? eventFiles : props.value.concat(eventFiles));
      } else {
        props.onChange(eventFiles[0]);
      }

      inputRef.current.value = '';
    }
  };

  const handleDelete = (targetFile: File) => {
    if (props.multiple) {
      props.onChange(
        props.value.reduce<File[]>((acc, file) => {
          if (file !== targetFile) return acc.concat(file);
          return acc;
        }, [])
      );
    } else {
      props.onChange(undefined);
    }

    inputRef.current.value = '';
  };

  const renderFileList = () => {
    if (value === undefined) return undefined;

    const valueList = Array.isArray(value) ? value : [value];
    return (
      <List noBullets>
        {valueList.map((file, index) => {
          return (
            <li key={index} className={styles.fileListItem}>
              <Text
                color="brand"
                className={classNames({
                  [styles.fileName]: true,
                  [styles.disabled]: disabled,
                  [styles.invalid]: maxSize && file.size > maxSize,
                })}
              >
                {`${file.name}`}
                {file.size > 0 && ` (${formatBytes(file.size, i18n.language)})`}
              </Text>

              <button className={styles.delete} type="button" onClick={() => handleDelete(file)}>
                <Icon shape="IconTimes" color="critical" />
              </button>
            </li>
          );
        })}
      </List>
    );
  };

  return (
    <div className={styles.fileUpload}>
      {label && (
        <span
          className={classNames({
            [styles.labelText]: true,
            [styles.invalid]: invalid,
            [styles.disabled]: disabled,
          })}
        >
          {label}
        </span>
      )}

      {renderFileList()}

      <div className={styles.row}>
        <div className={styles.field}>
          <input
            {...rest}
            ref={inputRef}
            required={false} // handled in external validation
            className={styles.input}
            disabled={disabled}
            type="file"
            name={name}
            multiple={multiple}
            onChange={handleChange}
          />
          <Button
            theme="coat"
            variant="secondary"
            size="small"
            disabled={disabled}
            onClick={() => inputRef.current.click()}
          >
            {buttonLabel || `${multiple ? t('common.add') : t('common.select')}...`}
          </Button>
        </div>

        {maxSize && (
          <Text className={styles.maxSize} color="secondary">
            {t('common.fileUpload.maxSize', {
              maxSize: formatBytes(maxSize, i18n.language),
            })}
          </Text>
        )}
      </div>

      {helperText && (
        <Text className={styles.helperText} color={invalid ? 'critical' : undefined} size="s">
          {helperText}
        </Text>
      )}
    </div>
  );
};

export default FileUpload;
