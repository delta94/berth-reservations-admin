import React from 'react';
import classNames from 'classnames';
import { IconCross } from 'hds-react';

import List from '../list/List';
import styles from './fileList.module.scss';
import Text from '../text/Text';
import InputWrapper, { InputWrapperProps } from '../inputWrapper/InputWrapper';
import IconWrapper from '../iconWrapper/IconWrapper';

export type PersistedFile = {
  id: string;
  name: string;
  markedForDeletion?: boolean;
};

type SharedProps = InputWrapperProps & {
  allowDelete?: boolean;
  invalid?: boolean;
  willBeOverwritten?: boolean;
};

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

const FileList = (props: FileListProps) => {
  const { allowDelete = true, helperText, id, invalid = false, label, value, willBeOverwritten = false } = props;

  if (value === undefined) return null;

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

  const valueList = Array.isArray(value) ? value : [value];

  return (
    <InputWrapper id={id} invalid={invalid} helperText={helperText} label={label}>
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
                  <IconWrapper icon={IconCross} color={file.markedForDeletion ? 'disabled' : 'critical'} />
                </button>
              )}
            </li>
          );
        })}
      </List>
    </InputWrapper>
  );
};

export default FileList;
