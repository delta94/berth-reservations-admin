import React from 'react';
import { Button } from 'hds-react';
import { useTranslation } from 'react-i18next';

import GlobalSearchTableTools from '../../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import styles from './harborViewTableTools.module.scss';

interface Props {
  onAddPier(): void;
  onAddBerth(): void;
  handleGlobalFilter(value?: string): void;
  canAddBerth: boolean;
}

const HarborViewTableTools = ({ onAddPier, onAddBerth, handleGlobalFilter, canAddBerth }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button onClick={onAddPier} variant="secondary" theme="black" className={styles.button}>
          {t('harborView.tableTools.addPier')}
        </Button>
        <Button
          onClick={onAddBerth}
          variant="secondary"
          theme="black"
          className={styles.button}
          disabled={!canAddBerth}
        >
          {t('harborView.tableTools.addBerth')}
        </Button>
      </div>
      <GlobalSearchTableTools handleGlobalFilter={handleGlobalFilter} />
    </div>
  );
};

export default HarborViewTableTools;
