import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../../common/text/Text';
import styles from './pricingPage.module.scss';
import Card from '../../common/card/Card';
import CardHeader from '../../common/cardHeader/CardHeader';
import CardBody from '../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import Section from '../../common/section/Section';
import {
  formatDimension,
  formatPercentage,
  formatPrice,
} from '../../common/utils/format';

export interface BerthPrice {
  id: string;
  width: number | null;
  privateCustomer: number;
  company: number;
  period: string;
}

export interface WinterStoragePrice {
  id: string;
  area: string;
  privateCustomer: number;
  company: number;
  period: string;
}

export interface HarborService {
  id: string;
  service: string;
  price: number;
  period: string;
}

export interface AdditionalService {
  id: string;
  service: string;
  price: number;
  tax: number;
  period: string;
}

export interface PricingPageProps {
  harborData: BerthPrice[];
  winterStorageData: WinterStoragePrice[];
  harborServices: HarborService[];
  otherServices: AdditionalService[];
}

const PricingPage: React.SFC<PricingPageProps> = ({
  harborData,
  winterStorageData,
  harborServices,
  otherServices,
}) => {
  const { t, i18n } = useTranslation();
  const openModal = () => alert('Muokkaa');

  const harborCols: Column<BerthPrice>[] = [
    {
      Header: t('pricing.harbor.width') || '',
      accessor: 'width',
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
    },
    {
      Header: t('pricing.harbor.privateCustomer') || '',
      accessor: 'privateCustomer',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.harbor.company') || '',
      accessor: 'company',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.harbor.period') || '',
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: t('pricing.harbor.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: (
        <button onClick={openModal}>
          <Text color="brand">{t('pricing.harbor.edit')}</Text>
        </button>
      ),
    },
  ];

  const winterStorageCols: Column<WinterStoragePrice>[] = [
    {
      Header: t('pricing.winterStorage.area') || '',
      accessor: 'area',
    },
    {
      Header: t('pricing.winterStorage.privateCustomer') || '',
      accessor: 'privateCustomer',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.winterStorage.company') || '',
      accessor: 'company',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.winterStorage.period') || '',
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: t('pricing.winterStorage.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: (
        <button onClick={openModal}>
          <Text color="brand">{t('pricing.winterStorage.edit')}</Text>
        </button>
      ),
    },
  ];

  const harborServicesCols: Column<HarborService>[] = [
    {
      Header: t('pricing.harborServices.service') || '',
      width: COLUMN_WIDTH.L,
      accessor: 'service',
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
    },
    {
      id: 'edit',
      Header: t('pricing.harborServices.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: (
        <button onClick={openModal}>
          <Text color="brand">{t('pricing.harborServices.edit')}</Text>
        </button>
      ),
    },
  ];

  const otherServicesCols: Column<AdditionalService>[] = [
    {
      Header: t('pricing.otherServices.service') || '',
      width: COLUMN_WIDTH.L,
      accessor: 'service',
    },
    {
      Header: t('pricing.otherServices.price') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'price',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.otherServices.tax') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'tax',
      Cell: ({ cell }) => formatPercentage(cell.value, i18n.language),
    },
    {
      Header: t('pricing.otherServices.period') || '',
      width: COLUMN_WIDTH.S,
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: t('pricing.otherServices.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: (
        <button onClick={openModal}>
          <Text color="brand">{t('pricing.otherServices.edit')}</Text>
        </button>
      ),
    },
  ];

  return (
    <div className={styles.pricingPage}>
      <Text
        className={styles.fullWidth}
        as="h2"
        weight="normalWeight"
        size="xxl"
      >
        {t('pricing.heading')}
      </Text>
      <Card className={styles.fullWidth}>
        <CardHeader title={t('pricing.harbor.title')} />
        <CardBody>
          <Section>{t('pricing.harbor.description')}</Section>
          <Table columns={harborCols} data={harborData} theme="basic" />
        </CardBody>
      </Card>
      <Card className={styles.fullWidth}>
        <CardHeader title={t('pricing.winterStorage.title')} />
        <CardBody>
          <Section>{t('pricing.winterStorage.description')}</Section>
          <Table
            columns={winterStorageCols}
            data={winterStorageData}
            theme="basic"
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title={t('pricing.harborServices.title')} />
        <CardBody>
          <Section>{t('pricing.harborServices.description')}</Section>
          <Table
            columns={harborServicesCols}
            data={harborServices}
            theme="basic"
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title={t('pricing.otherServices.title')} />
        <CardBody>
          <Table
            columns={otherServicesCols}
            data={otherServices}
            theme="basic"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PricingPage;
