import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';

import styles from './harborsTableTools.module.scss';

export interface HarborsTableToolsProps {
  handleGlobalFilter(value?: string): void;
}

const HarborsTableTools: React.SFC<HarborsTableToolsProps> = ({
  handleGlobalFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.harborsTableTools}>
      <TextInput
        className={styles.filterField}
        placeholder={t('common.search')}
        id="harborListGlobalFilter"
        onChange={e =>
          handleGlobalFilter(
            (e.target as HTMLTextAreaElement).value || undefined
          )
        }
      />
    </div>
  );
};

export default HarborsTableTools;
