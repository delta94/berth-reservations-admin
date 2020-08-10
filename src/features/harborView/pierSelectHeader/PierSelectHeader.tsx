import React from 'react';
import { useTranslation } from 'react-i18next';

import { Pier } from '../types';
import PierProperties from './pierProperties/PierProperties';
import SelectHeader from '../../../common/selectHeader/SelectHeader';

interface PierSelectHeaderProps {
  readonly className?: string;
  readonly piers: Pier[];
  readonly selectedPier?: Pier | null;
  onPierSelect(pier: Pier | null): void;
  onEdit?(pier: Pier): void;
}

const PierSelectHeader = ({ className, piers, selectedPier, onPierSelect, onEdit }: PierSelectHeaderProps) => {
  const { t } = useTranslation();
  return (
    <SelectHeader
      className={className}
      allLabel={t('common.table.all')}
      editLabel={t('common.edit')}
      items={piers}
      selectedItem={selectedPier}
      equals={(a, b) => a.identifier === b.identifier}
      onSelect={onPierSelect}
      onEdit={onEdit}
      formatter={(pier) => `${t('harborView.tableHeaders.identifier')} ${pier.identifier}`}
      renderer={(pier) => <PierProperties pier={pier} />}
    />
  );
};

export default PierSelectHeader;
