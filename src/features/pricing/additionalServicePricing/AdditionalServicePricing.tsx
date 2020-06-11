import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import Text from '../../../common/text/Text';
import { EDIT_FORM_TYPE } from '../editModal/EditForm';
import { AdditionalServicePricing as AdditionalServicePricingData } from './__generated__/AdditionalServicePricing';
import { getAdditionalServiceData } from './utils';
import { getPeriodTKey, getProductServiceTKey, getProductTax } from '../../../common/utils/translations';
import { PeriodType, ProductServiceType, AdditionalProductTaxEnum } from '../../../@types/__generated__/globalTypes';

export interface AdditionalService {
  id: string;
  service: ProductServiceType;
  price: string;
  tax: AdditionalProductTaxEnum;
  period: PeriodType;
}

export interface AdditionalServicePricingProps {
  data: AdditionalServicePricingData | undefined | null;
  loading: boolean;
  className?: string;
  openModal: (formType: EDIT_FORM_TYPE, initialValues: AdditionalService) => void;
}

const AdditionalServicePricing = ({ data, loading, className, openModal }: AdditionalServicePricingProps) => {
  const { t, i18n } = useTranslation();

  const additionalServicesCols: Column<AdditionalService>[] = [
    {
      Header: t('pricing.additionalServices.service') || '',
      width: COLUMN_WIDTH.L,
      accessor: 'service',
      Cell: ({ cell }) => t(getProductServiceTKey(cell.value)),
    },
    {
      Header: t('pricing.additionalServices.price') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'price',
    },
    {
      Header: t('pricing.additionalServices.tax') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'tax',
      Cell: ({ cell }) => getProductTax(cell.value, i18n.language),
    },
    {
      Header: t('pricing.additionalServices.period') || '',
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
        <button onClick={() => openModal(EDIT_FORM_TYPE.ADDITIONAL_SERVICES, row.values as AdditionalService)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  return (
    <Card className={className}>
      <CardHeader title={t('pricing.additionalServices.title')} />
      <CardBody>
        <Table
          columns={additionalServicesCols}
          data={getAdditionalServiceData(data)}
          loading={loading}
          theme="basic"
          renderEmptyStateRow={() => t('common.notification.noData.description')}
        />
      </CardBody>
    </Card>
  );
};

export default AdditionalServicePricing;
