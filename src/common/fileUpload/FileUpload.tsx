import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IconCross } from 'hds-react';

import styles from './fileUpload.module.scss';
import Text from '../text/Text';
import List from '../list/List';
import { formatBytes } from '../utils/format';
import InputWrapper, { InputWrapperProps } from '../inputWrapper/InputWrapper';
import IconWrapper from '../iconWrapper/IconWrapper';
import Button from '../button/Button';

type SharedProps = InputWrapperProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    buttonLabel?: string;
    disabled?: boolean;
    invalid?: boolean;
    /* max size in bytes */
    maxSize?: number;
    id: string;
  };

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

const FileUpload = (props: FileUploadProps) => {
  const {
    buttonLabel,
    disabled,
    helperText,
    invalid = false,
    label,
    maxSize,
    multiple,
    id,
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
                <IconWrapper icon={IconCross} color="critical" />
              </button>
            </li>
          );
        })}
      </List>
    );
  };

  return (
    <InputWrapper id={id} invalid={invalid} helperText={helperText} label={label}>
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
            id={id}
            multiple={multiple}
            onChange={handleChange}
          />
          <Button variant="secondary" size="small" disabled={disabled} onClick={() => inputRef.current.click()}>
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
    </InputWrapper>
  );
};

export default FileUpload;
