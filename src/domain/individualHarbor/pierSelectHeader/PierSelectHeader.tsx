import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './pierSelectHeader.module.scss';
import { Pier } from '../utils/utils';
import PierProperties from './pierProperties/PierProperties';

interface PierSelectHeaderProps {
  readonly className?: string;
  readonly piers: Pier[];
  readonly selectedPier?: Pier | null;
  onPierSelect(pier: Pier | null): void;
}

const PierSelectHeader: React.FC<PierSelectHeaderProps> = ({
  className,
  piers,
  selectedPier,
  onPierSelect,
}) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.selectContainer}>
        <button
          onClick={() => onPierSelect(null)}
          className={classNames(styles.pierButton, {
            [styles.pierButtonSelected]: !selectedPier,
          })}
        >
          {t('individualHarbor.tableHeaders.all')}
        </button>
        {piers.map((pier, idx) => (
          <button
            key={idx}
            onClick={() => onPierSelect(pier)}
            className={classNames(styles.pierButton, {
              [styles.pierButtonSelected]:
                selectedPier && selectedPier.identifier === pier.identifier,
            })}
          >
            {pier.identifier}
          </button>
        ))}
      </div>
      {selectedPier && <PierProperties pier={selectedPier} />}
    </div>
  );
};

export default PierSelectHeader;
