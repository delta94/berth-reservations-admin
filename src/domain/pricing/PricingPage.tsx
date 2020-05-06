import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

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
import { PRICING_TYPES } from './editModal/fields/EditFormFields';

export interface BerthPrice {
  id: string;
  width: number;
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
  unit: string;
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
  berthsData: BerthPrice[];
  winterStorageData: WinterStoragePrice[];
  harborServicesData: HarborService[];
  additionalServicesData: AdditionalService[];
  openModal: (
    formType: PRICING_TYPES,
    initialValues:
      | BerthPrice
      | WinterStoragePrice
      | HarborService
      | AdditionalService
  ) => void;
}

const PricingPage: React.SFC<PricingPageProps> = ({
  berthsData,
  winterStorageData,
  harborServicesData,
  additionalServicesData,
  openModal,
}) => {
  const { t, i18n } = useTranslation();

  const harborCols: Column<BerthPrice>[] = [
    {
      Header: t('pricing.berths.width') || '',
      accessor: 'width',
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
    },
    {
      Header: t('pricing.berths.privateCustomer') || '',
      accessor: 'privateCustomer',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.berths.company') || '',
      accessor: 'company',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.berths.period') || '',
      accessor: 'period',
      Cell: ({ cell }) => t([`common.periodTypes.${cell.value}`]),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row<BerthPrice> }) => {
        return (
          <button
            onClick={() =>
              openModal(PRICING_TYPES.BERTHS, row.values as BerthPrice)
            }
          >
            <Text color="brand">{t('common.edit')}</Text>
          </button>
        );
      },
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
      Cell: ({ cell }) => t([`common.periodTypes.${cell.value}`]),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row }) => (
        <button
          onClick={() =>
            openModal(
              PRICING_TYPES.WINTER_STORAGE,
              row.values as WinterStoragePrice
            )
          }
        >
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  const harborServicesCols: Column<HarborService>[] = [
    {
      Header: t('pricing.harborServices.service') || '',
      width: COLUMN_WIDTH.L,
      accessor: 'service',
      Cell: ({ cell }) => t([`common.terminology.${cell.value}`]),
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
      Cell: ({ cell }) => t([`common.periodTypes.${cell.value}`]),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row }) => (
        <button
          onClick={() =>
            openModal(
              PRICING_TYPES.HARBOR_SERVICES,
              row.values as HarborService
            )
          }
        >
          <Text color="brand">{t('common.edit')}</Text>
        </button>
      ),
    },
  ];

  const additionalServicesCols: Column<AdditionalService>[] = [
    {
      Header: t('pricing.additionalServices.service') || '',
      width: COLUMN_WIDTH.L,
      accessor: 'service',
      Cell: ({ cell }) => t([`common.terminology.${cell.value}`]),
    },
    {
      Header: t('pricing.additionalServices.price') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'price',
      Cell: ({ cell }) => formatPrice(cell.value, i18n.language),
    },
    {
      Header: t('pricing.additionalServices.tax') || '',
      width: COLUMN_WIDTH.XS,
      accessor: 'tax',
      Cell: ({ cell }) => formatPercentage(cell.value, i18n.language),
    },
    {
      Header: t('pricing.additionalServices.period') || '',
      width: COLUMN_WIDTH.S,
      accessor: 'period',
      Cell: ({ cell }) => t([`common.periodTypes.${cell.value}`]),
    },
    {
      id: 'edit',
      Header: t('common.edit') || '',
      sortType: 'none',
      width: COLUMN_WIDTH.S,
      Cell: ({ row }: { row: Row }) => (
        <button
          onClick={() =>
            openModal(
              PRICING_TYPES.ADDITIONAL_SERVICES,
              row.values as AdditionalService
            )
          }
        >
          <Text color="brand">{t('common.edit')}</Text>
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
        <CardHeader title={t('pricing.berths.title')} />
        <CardBody>
          <Section>{t('pricing.berths.description')}</Section>
          <Table columns={harborCols} data={berthsData} theme="basic" />
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
            data={harborServicesData}
            theme="basic"
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title={t('pricing.additionalServices.title')} />
        <CardBody>
          <Table
            columns={additionalServicesCols}
            data={additionalServicesData}
            theme="basic"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PricingPage;
