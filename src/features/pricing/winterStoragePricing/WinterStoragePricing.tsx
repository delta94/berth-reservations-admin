import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';
import { useMutation } from '@apollo/react-hooks';

import Card from '../../../common/card/Card';
import Section from '../../../common/section/Section';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import { formatPrice } from '../../../common/utils/format';
import EditForm, { EDIT_FORM_TYPE } from '../editModal/EditForm';
import Text from '../../../common/text/Text';
import { WinterStoragePricing as WinterStoragePricingData } from './__generated__/WinterStoragePricing';
import { getWinterStorageData } from './utils';
import { PeriodType } from '../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../common/utils/translations';
import EditModal from '../editModal/EditModal';
import { UPDATE_WINTER_STORAGE_PRICE_MUTATION, CREATE_WINTER_STORAGE_PRODUCT_MUTATION } from './mutations';
import {
  UPDATE_WINTER_STORAGE_PRICE,
  UPDATE_WINTER_STORAGE_PRICEVariables as UPDATE_WINTER_STORAGE_PRICE_VARS,
} from './__generated__/UPDATE_WINTER_STORAGE_PRICE';
import {
  CREATE_WINTER_STORAGE_PRODUCT,
  CREATE_WINTER_STORAGE_PRODUCTVariables as CREATE_WINTER_STORAGE_PRODUCT_VARS,
} from './__generated__/CREATE_WINTER_STORAGE_PRODUCT';

export interface WinterStoragePrice {
  id: string;
  productId: string | undefined | null;
  area: string | undefined | null;
  privateCustomer: number | undefined;
  company: number | undefined;
  period: PeriodType;
}

export interface WinterStoragePricingProps {
  data: WinterStoragePricingData | undefined | null;
  loading: boolean;
  className?: string;
}

const WinterStoragePricing = ({ data, loading, className }: WinterStoragePricingProps) => {
  const { t, i18n } = useTranslation();
  const [editRowValues, setEditRowValues] = useState<WinterStoragePrice>();
  const [updateWinterStoragePrice] = useMutation<UPDATE_WINTER_STORAGE_PRICE, UPDATE_WINTER_STORAGE_PRICE_VARS>(
    UPDATE_WINTER_STORAGE_PRICE_MUTATION
  );
  const [createWinterStoragePrice] = useMutation<CREATE_WINTER_STORAGE_PRODUCT, CREATE_WINTER_STORAGE_PRODUCT_VARS>(
    CREATE_WINTER_STORAGE_PRODUCT_MUTATION
  );

  const winterStorageCols: Column<WinterStoragePrice>[] = [
    {
      Header: t('pricing.winterStorage.area') || '',
      accessor: 'area',
    },
    {
      Header: t('pricing.winterStorage.privateCustomer') || '',
      accessor: 'privateCustomer',
      Cell: ({ cell: { value } }) => (value ? formatPrice(value, i18n.language) : '-'),
    },
    {
      Header: t('pricing.winterStorage.company') || '',
      accessor: 'company',
      Cell: ({ cell: { value } }) => (value ? formatPrice(value, i18n.language) : '-'),
    },
    {
      Header: t('pricing.winterStorage.period') || '',
      accessor: 'period',
      Cell: ({ cell }) => t(getPeriodTKey(cell.value)),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row<WinterStoragePrice> }) => (
        <button onClick={() => setEditRowValues(row.original)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  const handleSubmit = async ({
    productId,
    id: winterStorageAreaId,
    privateCustomer: priceValue,
  }: WinterStoragePrice) => {
    if (productId) {
      await updateWinterStoragePrice({
        variables: { input: { id: productId, priceValue } },
      });
    } else {
      await createWinterStoragePrice({
        variables: { input: { winterStorageAreaId, priceValue } },
      });
    }

    setEditRowValues(undefined);
  };

  const handleClose = () => setEditRowValues(undefined);

  return (
    <>
      <Card className={className}>
        <CardHeader title={t('pricing.winterStorage.title')} />
        <CardBody>
          <Section>{t('pricing.winterStorage.description')}</Section>
          <Table
            columns={winterStorageCols}
            data={getWinterStorageData(data)}
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
            formType={EDIT_FORM_TYPE.WINTER_STORAGE}
            initialValues={editRowValues}
            onSubmit={handleSubmit}
          />
        )}
      </EditModal>
    </>
  );
};

export default WinterStoragePricing;
