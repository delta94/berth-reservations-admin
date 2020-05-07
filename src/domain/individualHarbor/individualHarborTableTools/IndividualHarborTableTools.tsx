import React from 'react';
import { Button } from 'hds-react/lib';
import { useTranslation } from 'react-i18next';

import GlobalSearchTableTools from '../../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import styles from './individualHarborTableTools.module.scss';

interface Props {
  onAddPier(): void;
  onAddBerth(): void;
  handleGlobalFilter(value?: string): void;
}

const IndividualHarborTableTools: React.FC<Props> = ({
  onAddPier,
  onAddBerth,
  handleGlobalFilter,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          onClick={onAddPier}
          color="supplementary"
          className={styles.button}
        >
          {t('individualHarbor.tableTools.addPier')}
        </Button>
        <Button
          onClick={onAddBerth}
          color="supplementary"
          className={styles.button}
        >
          {t('individualHarbor.tableTools.addBerth')}
        </Button>
      </div>
      <GlobalSearchTableTools handleGlobalFilter={handleGlobalFilter} />
    </div>
  );
};

export default IndividualHarborTableTools;
