import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';
import { useMutation } from '@apollo/react-hooks';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import Text from '../../../common/text/Text';
import EditForm, { EDIT_FORM_TYPE } from '../editModal/EditForm';
import { AdditionalServicePricing as AdditionalServicePricingData } from './__generated__/AdditionalServicePricing';
import { getAdditionalServiceData } from './utils';
import { getPeriodTKey, getProductServiceTKey, getProductTax } from '../../../common/utils/translations';
import { PeriodType, ProductServiceType, AdditionalProductTaxEnum } from '../../../@types/__generated__/globalTypes';
import EditModal from '../editModal/EditModal';
import { UPDATE_ADDITIONAL_SERVICE_PRICE_MUTATION } from './mutations';
import { UPDATE_ADDITIONAL_SERVICE_PRICE } from './__generated__/UPDATE_ADDITIONAL_SERVICE_PRICE';
import { UPDATE_HARBOR_SERVICE_PRICEVariables as UPDATE_HARBOR_SERVICE_PRICE_VARS } from '../harborServicePricing/__generated__/UPDATE_HARBOR_SERVICE_PRICE';

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
}

const AdditionalServicePricing = ({ data, loading, className }: AdditionalServicePricingProps) => {
  const { t, i18n } = useTranslation();

  const [editRowValues, setEditRowValues] = useState<AdditionalService>();
  const [updateHarborServicePrice] = useMutation<UPDATE_ADDITIONAL_SERVICE_PRICE, UPDATE_HARBOR_SERVICE_PRICE_VARS>(
    UPDATE_ADDITIONAL_SERVICE_PRICE_MUTATION
  );

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
      Cell: ({ row }: { row: Row<AdditionalService> }) => (
        <button onClick={() => setEditRowValues(row.original)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  const handleSubmit = async ({ id, price, period, tax }: AdditionalService) => {
    await updateHarborServicePrice({
      variables: { input: { id, priceValue: price, period, taxPercentage: tax } },
    });

    setEditRowValues(undefined);
  };

  const handleClose = () => setEditRowValues(undefined);

  return (
    <>
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
      <EditModal isOpen={!!editRowValues} closeModal={handleClose}>
        {editRowValues && (
          <EditForm
            closeModal={handleClose}
            formType={EDIT_FORM_TYPE.ADDITIONAL_SERVICES}
            initialValues={editRowValues}
            onSubmit={handleSubmit}
          />
        )}
      </EditModal>
    </>
  );
};

export default AdditionalServicePricing;
