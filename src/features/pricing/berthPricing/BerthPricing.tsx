import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';
import { useMutation } from '@apollo/react-hooks';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import Section from '../../../common/section/Section';
import Text from '../../../common/text/Text';
import { formatPrice } from '../../../common/utils/format';
import EditForm, { EDIT_FORM_TYPE } from '../editModal/EditForm';
import { BerthPricing as BerthPricingData } from './__generated__/BerthPricing';
import { getBerthsData } from './utils';
import { PeriodType } from '../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../common/utils/translations';
import EditModal from '../editModal/EditModal';
import { UPDATE_BERTH_PRICE_MUTATION, CREATE_BERTH_PRODUCT_MUTATION } from './mutations';
import {
  UPDATE_BERTH_PRICE,
  UPDATE_BERTH_PRICEVariables as UPDATE_BERTH_PRICE_VARS,
} from './__generated__/UPDATE_BERTH_PRICE';
import {
  CREATE_BERTH_PRODUCT,
  CREATE_BERTH_PRODUCTVariables as CREATE_BERTH_PRODUCT_VARS,
} from './__generated__/CREATE_BERTH_PRODUCT';

export interface BerthPrice {
  id: string;
  productId: string | undefined;
  name: string;
  privateCustomer: number | undefined;
  company: number | undefined;
  period: PeriodType;
}

export interface BerthPricingProps {
  className?: string;
  data: BerthPricingData | undefined | null;
  loading: boolean;
}

const BerthPricing = ({ className, data, loading }: BerthPricingProps) => {
  const { t, i18n } = useTranslation();
  const [editRowValues, setEditRowValues] = useState<BerthPrice>();
  const [updateBerthPrice] = useMutation<UPDATE_BERTH_PRICE, UPDATE_BERTH_PRICE_VARS>(UPDATE_BERTH_PRICE_MUTATION);
  const [createBerthPrice] = useMutation<CREATE_BERTH_PRODUCT, CREATE_BERTH_PRODUCT_VARS>(
    CREATE_BERTH_PRODUCT_MUTATION
  );

  const harborCols: Column<BerthPrice>[] = [
    {
      Header: t('pricing.berths.width') || '',
      accessor: 'name',
    },
    {
      Header: t('pricing.berths.privateCustomer') || '',
      accessor: 'privateCustomer',
      Cell: ({ cell: { value } }) => (value ? formatPrice(value, i18n.language) : '-'),
    },
    {
      Header: t('pricing.berths.company') || '',
      accessor: 'company',
      Cell: ({ cell: { value } }) => (value ? formatPrice(value, i18n.language) : '-'),
    },
    {
      Header: t('pricing.berths.period') || '',
      accessor: 'period',
      Cell: ({ cell }) => t(getPeriodTKey(cell.value)),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row<BerthPrice> }) => (
        <button onClick={() => setEditRowValues(row.original)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  const handleSubmit = async ({
    id: priceGroupId,
    productId: defaultProductId,
    privateCustomer: priceValue,
  }: BerthPrice): Promise<void> => {
    if (defaultProductId) {
      await updateBerthPrice({
        variables: { input: { id: defaultProductId, priceValue } },
      });
    } else {
      await createBerthPrice({
        variables: { input: { priceGroupId, priceValue } },
      });
    }

    setEditRowValues(undefined);
  };

  const handleClose = () => setEditRowValues(undefined);

  return (
    <>
      <Card className={className}>
        <CardHeader title={t('pricing.berths.title')} />
        <CardBody>
          <Section>{t('pricing.berths.description')}</Section>
          <Table
            columns={harborCols}
            data={getBerthsData(data)}
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
            formType={EDIT_FORM_TYPE.BERTHS}
            initialValues={editRowValues}
            onSubmit={handleSubmit}
          />
        )}
      </EditModal>
    </>
  );
};

export default BerthPricing;
