import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import List from '../list/List';
import styles from './fileList.module.scss';
import Text from '../text/Text';
import Icon from '../icons/Icon';

export type PersistedFile = {
  id: string;
  name: string;
  markedForDeletion?: boolean;
};

interface SharedProps {
  allowDelete?: boolean;
  helperText?: string;
  invalid?: boolean;
  label?: string;
  name: string;
  willBeOverwritten?: boolean;
}

interface SingleModeProps extends SharedProps {
  multiple?: false;
  onChange: (value: undefined | PersistedFile) => void;
  value: undefined | PersistedFile;
}

interface MultipleModeProps extends SharedProps {
  multiple: true;
  onChange: (value: PersistedFile[]) => void;
  value: PersistedFile[];
}

export type FileListProps = SingleModeProps | MultipleModeProps;

const FileList: FunctionComponent<FileListProps> = (props) => {
  const { allowDelete = true, helperText, label, invalid = false, value, willBeOverwritten = false } = props;

  const handleDelete = (targetFile: PersistedFile) => {
    if (props.multiple) {
      return props.onChange(
        props.value.reduce<PersistedFile[]>((acc, file) => {
          if (file !== targetFile) return acc.concat(file);
          return acc.concat({
            ...file,
            markedForDeletion: !file.markedForDeletion,
          });
        }, [])
      );
    }

    // single
    return props.onChange({
      ...targetFile,
      markedForDeletion: !targetFile.markedForDeletion,
    });
  };

  if (value === undefined) return null;

  const valueList = Array.isArray(value) ? value : [value];

  return (
    <div className={styles.fileDelete}>
      {label && (
        <span
          className={classNames({
            [styles.labelText]: true,
            [styles.invalid]: invalid,
          })}
        >
          {label}
        </span>
      )}

      <List noBullets>
        {valueList.map((file) => {
          return (
            <li key={file.id} className={styles.fileListItem}>
              <Text
                color="brand"
                className={classNames({
                  [styles.fileName]: true,
                  [styles.markedForDeletion]: willBeOverwritten || file.markedForDeletion,
                })}
              >
                {`${file.name}`}
              </Text>

              {allowDelete && (
                <button className={styles.delete} type="button" onClick={() => handleDelete(file)}>
                  <Icon shape="IconTimes" color={file.markedForDeletion ? 'disabled' : 'critical'} />
                </button>
              )}
            </li>
          );
        })}
      </List>

      {helperText && (
        <Text color={invalid ? 'critical' : undefined} size="s" className={styles.helperText}>
          {helperText}
        </Text>
      )}
    </div>
  );
};

export default FileList;
