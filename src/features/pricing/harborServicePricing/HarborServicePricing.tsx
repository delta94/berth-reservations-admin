import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import Section from '../../../common/section/Section';
import { formatPrice } from '../../../common/utils/format';
import Text from '../../../common/text/Text';
import { EDIT_FORM_TYPE } from '../editModal/EditForm';
import { HarborServicePricing as HarborServicePricingData } from './__generated__/HarborServicePricing';
import { getHarborServicesData } from './utils';
import { getPeriodTKey, getProductServiceTKey } from '../../../common/utils/translations';
import { PeriodType, ProductServiceType } from '../../../@types/__generated__/globalTypes';

export interface HarborService {
  id: string;
  service: ProductServiceType;
  price: number;
  unit: string;
  period: PeriodType;
}

export interface HarborServicePricingProps {
  data: HarborServicePricingData | undefined | null;
  loading: boolean;
  className?: string;
  openModal: (formType: EDIT_FORM_TYPE, initialValues: HarborService) => void;
}

const HarborServicePricing: React.FC<HarborServicePricingProps> = ({
  data,
  loading,
  className,
  openModal,
}: HarborServicePricingProps) => {
  const { t, i18n } = useTranslation();

  const harborServicesCols: Column<HarborService>[] = [
    {
      Header: t('pricing.harborServices.service') || '',
      width: COLUMN_WIDTH.L,
      accessor: 'service',
      Cell: ({ cell }) => t(getProductServiceTKey(cell.value)),
    },
    {
      Header: t('pricing.harborServices.price') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'price',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.harborServices.period') || '',
      width: COLUMN_WIDTH.S,
      accessor: 'period',
      Cell: ({ cell }) => t(getPeriodTKey(cell.value)),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row }) => (
        <button onClick={() => openModal(EDIT_FORM_TYPE.HARBOR_SERVICES, row.values as HarborService)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  return (
    <Card className={className}>
      <CardHeader title={t('pricing.harborServices.title')} />
      <CardBody>
        <Section>{t('pricing.harborServices.description')}</Section>
        <Table
          columns={harborServicesCols}
          data={getHarborServicesData(data)}
          loading={loading}
          theme="basic"
          renderEmptyStateRow={() => t('common.notification.noData.description')}
        />
      </CardBody>
    </Card>
  );
};

export default HarborServicePricing;
