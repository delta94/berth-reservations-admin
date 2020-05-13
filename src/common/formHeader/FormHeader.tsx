import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../text/Text';
import styles from './formHeader.module.scss';

interface Props {
  title: string;
  isSubmitting?: boolean;
  onDelete?(): void;
  onDeleteText?: string;
}

const FormHeader: React.FC<Props> = ({
  title,
  isSubmitting,
  onDelete,
  onDeleteText,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.heading}>
      <Text as="h4" color="brand" className={styles.titleText}>
        {title}
      </Text>
      {onDelete && (
        <button disabled={isSubmitting} onClick={() => onDelete()}>
          <Text color="critical">
            {onDeleteText ?? t('forms.common.delete')}
          </Text>
        </button>
      )}
    </div>
  );
};

export default FormHeader;
