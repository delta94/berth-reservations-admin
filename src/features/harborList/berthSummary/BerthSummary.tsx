import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './berthSummary.module.scss';

export interface BerthSummaryProps {
  berthCount?: number;
  freeCount?: number;
  reservedCount?: number;
  otherCount?: number;
  offeredCount?: number;
}

const BerthSummary = ({ berthCount, freeCount, reservedCount, otherCount, offeredCount }: BerthSummaryProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.berthSummary}>
      <div className={styles.count}>
        {t('harborList.berthSummary.berthCount')}: {berthCount ?? '-'}
      </div>
      <div className={styles.count}>
        {t('harborList.berthSummary.freeCount')}: {freeCount ?? '-'}
      </div>
      <div className={styles.count}>
        {t('harborList.berthSummary.reservedCount')}: {reservedCount ?? '-'}
      </div>
      <div className={styles.count}>
        {t('harborList.berthSummary.otherCount')}: {otherCount ?? '-'}
      </div>
      <div className={styles.count}>
        {t('harborList.berthSummary.offeredCount')}: {offeredCount ?? '-'}
      </div>
    </div>
  );
};

export default BerthSummary;
