import React from 'react';
import { useTranslation } from 'react-i18next';

import { WinterStorageLease } from '../types';
import LeasesCard from './LeasesCard';

export interface WinterStorageLeasesCardProps {
  leases: WinterStorageLease[];
  handleShowContract(leaseId: string): void;
}

const WinterStorageLeasesCard = ({ leases, handleShowContract }: WinterStorageLeasesCardProps) => {
  const { t } = useTranslation();
  const leaseDetails = leases.map((lease) => {
    return {
      id: lease.id,
      endDate: lease.endDate,
      startDate: lease.startDate,
      link: lease?.winterStorageArea?.id ? `/winter-storage-areas/${lease?.winterStorageArea?.id}` : undefined,
      address: lease.winterStorageArea?.name || '',
    };
  });

  return (
    <LeasesCard
      leaseDetails={leaseDetails}
      title={t('customerView.leases.winterStorage.title')}
      infoSectionTitle={t('customerView.leases.winterStorage.infoSectionTitle')}
      addressLabel={t('customerView.leases.winterStorage.addressLabel')}
      handleShowContract={handleShowContract}
    />
  );
};

export default WinterStorageLeasesCard;
