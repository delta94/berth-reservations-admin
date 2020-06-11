import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import Section from '../../../common/section/Section';
import Text from '../../../common/text/Text';
import { formatPrice } from '../../../common/utils/format';
import { EDIT_FORM_TYPE } from '../editModal/EditForm';
import { BerthPricing as BerthPricingData } from './__generated__/BerthPricing';
import { getBerthsData } from './utils';
import { PeriodType } from '../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../common/utils/translations';

export interface BerthPrice {
  id: string;
  name: string;
  privateCustomer: number | undefined;
  company: number | undefined;
  period: PeriodType;
}

export interface BerthPricingProps {
  className?: string;
  data: BerthPricingData | undefined | null;
  loading: boolean;
  openModal: (formType: EDIT_FORM_TYPE, initialValues: BerthPrice) => void;
}

const BerthPricing = ({ className, data, loading, openModal }: BerthPricingProps) => {
  const { t, i18n } = useTranslation();

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
        <button onClick={() => openModal(EDIT_FORM_TYPE.BERTHS, row.values as BerthPrice)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  return (
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
  );
};

export default BerthPricing;
