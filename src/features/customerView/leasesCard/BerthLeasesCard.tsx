import React from 'react';
import { useTranslation } from 'react-i18next';

import { BerthLease } from '../types';
import LeasesCard from './LeasesCard';

export interface BerthLeasesCardProps {
  leases: BerthLease[];
  handleShowContract(leaseId: string): void;
}

const BerthLeasesCard = ({ leases, handleShowContract }: BerthLeasesCardProps) => {
  const { t } = useTranslation();
  const leaseDetails = leases.map((lease) => {
    return {
      id: lease.id,
      endDate: lease.endDate,
      startDate: lease.startDate,
      link: lease.harbor ? `/harbors/${lease.harbor.id}` : undefined,
      address: `${lease.harbor?.name || ''} ${lease.pierIdentifier || ''} ${lease.berthNum}`,
    };
  });

  return (
    <LeasesCard
      leaseDetails={leaseDetails}
      title={t('customerView.leases.berth.title')}
      infoSectionTitle={t('customerView.leases.berth.infoSectionTitle')}
      addressLabel={t('customerView.leases.berth.addressLabel')}
      handleShowContract={handleShowContract}
    />
  );
};

export default BerthLeasesCard;
