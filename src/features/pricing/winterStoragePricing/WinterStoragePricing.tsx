import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Card from '../../../common/card/Card';
import Section from '../../../common/section/Section';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../../common/table/Table';
import { formatPrice } from '../../../common/utils/format';
import { EDIT_FORM_TYPE } from '../editModal/EditForm';
import Text from '../../../common/text/Text';
import { WINTER_STORAGE_PRICING } from './fragments';
import { WinterStoragePricing as WinterStoragePricingData } from './__generated__/WinterStoragePricing';
import { getWinterStorageData } from './utils';
import { PeriodType } from '../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../common/utils/translations';

export interface WinterStoragePrice {
  id: string;
  area: string | undefined | null;
  privateCustomer: number | undefined;
  company: number | undefined;
  period: PeriodType;
}

export interface WinterStoragePricingProps {
  data: WinterStoragePricingData | undefined | null;
  loading: boolean;
  className?: string;
  openModal: (formType: EDIT_FORM_TYPE, initialValues: WinterStoragePrice) => void;
}

const WinterStoragePricing = ({ data, loading, className, openModal }: WinterStoragePricingProps) => {
  const { t, i18n } = useTranslation();

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
      Cell: ({ row }: { row: Row }) => (
        <button onClick={() => openModal(EDIT_FORM_TYPE.WINTER_STORAGE, row.values as WinterStoragePrice)}>
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  return (
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
  );
};

WinterStoragePricing.fragments = {
  winterStoragePricing: WINTER_STORAGE_PRICING,
};

export default WinterStoragePricing;
