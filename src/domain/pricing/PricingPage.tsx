import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../../common/text/Text';
import styles from './pricingPage.module.scss';
import Card from '../../common/card/Card';
import CardHeader from '../../common/cardHeader/CardHeader';
import CardBody from '../../common/cardBody/CardBody';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import Section from '../../common/section/Section';

interface BerthPrice {
  id: string;
  width: string | null;
  privateCustomer: string;
  company: string;
  period: string;
}

interface WinterStoragePrice {
  id: string;
  area: string;
  privateCustomer: string;
  company: string;
  period: string;
}

interface HarborService {
  id: string;
  service: string;
  price: string;
  period: string;
}

interface AdditionalService {
  id: string;
  service: string;
  price: string;
  tax: string;
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
  const { t } = useTranslation();
  const openModal = () => alert('Muokkaa');

  const harborCols: Column<BerthPrice>[] = [
    {
      Header: <Text as="strong">{t('pricing.harbor.width')}</Text>,
      accessor: 'width',
    },
    {
      Header: <Text as="strong">{t('pricing.harbor.privateCustomer')}</Text>,
      accessor: 'privateCustomer',
    },
    {
      Header: <Text as="strong">{t('pricing.harbor.company')}</Text>,
      accessor: 'company',
    },
    {
      Header: <Text as="strong">{t('pricing.harbor.period')}</Text>,
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: <Text as="strong">{t('pricing.harbor.edit')}</Text>,
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
      Header: <Text as="strong">{t('pricing.winterStorage.area')}</Text>,
      accessor: 'area',
    },
    {
      Header: (
        <Text as="strong">{t('pricing.winterStorage.privateCustomer')}</Text>
      ),
      accessor: 'privateCustomer',
    },
    {
      Header: <Text as="strong">{t('pricing.winterStorage.company')}</Text>,
      accessor: 'company',
    },
    {
      Header: <Text as="strong">{t('pricing.winterStorage.period')}</Text>,
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: <Text as="strong">{t('pricing.winterStorage.edit')}</Text>,
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
      Header: <Text as="strong">{t('pricing.harborServices.service')}</Text>,
      width: COLUMN_WIDTH.L,
      accessor: 'service',
    },
    {
      Header: <Text as="strong">{t('pricing.harborServices.price')}</Text>,
      width: COLUMN_WIDTH.XS,
      accessor: 'price',
    },
    {
      Header: <Text as="strong">{t('pricing.harborServices.period')}</Text>,
      width: COLUMN_WIDTH.S,
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: <Text as="strong">{t('pricing.harborServices.edit')}</Text>,
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
      Header: <Text as="strong">{t('pricing.otherServices.service')}</Text>,
      width: COLUMN_WIDTH.L,
      accessor: 'service',
    },
    {
      Header: <Text as="strong">{t('pricing.otherServices.price')}</Text>,
      width: COLUMN_WIDTH.XS,
      accessor: 'price',
    },
    {
      Header: <Text as="strong">{t('pricing.otherServices.tax')}</Text>,
      width: COLUMN_WIDTH.XS,
      accessor: 'tax',
    },
    {
      Header: <Text as="strong">{t('pricing.otherServices.period')}</Text>,
      width: COLUMN_WIDTH.S,
      accessor: 'period',
    },
    {
      id: 'edit',
      Header: <Text as="strong">{t('pricing.otherServices.edit')}</Text>,
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
