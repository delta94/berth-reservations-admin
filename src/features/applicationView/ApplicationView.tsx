import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';

import styles from './applicationView.module.scss';
import Card from '../../common/card/Card';
import CardBody from '../../common/cardBody/CardBody';
import ApplicationDetails, { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import CardHeader from '../../common/cardHeader/CardHeader';
import Table, { Column } from '../../common/table/Table';
import CustomersTableTools, { CustomersTableToolsProps } from './customersTableTools/CustomersTableTools';
import Text from '../../common/text/Text';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import CustomerProfileCard, { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import OfferCard, { OfferCardProps } from './offerCard/OfferCard';
import { OrganizationType } from '../../@types/__generated__/globalTypes';
import Pagination, { PaginationProps } from '../../common/pagination/Pagination';
import PageTitle from '../../common/pageTitle/PageTitle';

export enum SearchBy {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  ADDRESS = 'address',
}

export interface CustomerData {
  id: string;
  name: string;
  city?: string;
  address?: string;
  berths?: string | null;
  organizationType?: OrganizationType;
}

type ColumnType = Column<CustomerData> & { accessor: keyof CustomerData };

export interface ApplicationViewProps {
  applicationId: string;
  similarCustomersData: CustomerData[] | null;
  customerProfile: CustomerProfileCardProps | null;
  applicationDetails: ApplicationDetailsProps;
  offerDetails: OfferCardProps | null;
  customerTableTools: CustomersTableToolsProps<SearchBy>;
  loadingCustomers?: boolean;
  pagination: PaginationProps;
  handleLinkCustomer(customerId: string): void;
  onSortedColChange(sortBy: { id: string; desc?: boolean } | undefined): void;
}

const ApplicationView = ({
  similarCustomersData,
  customerProfile,
  applicationDetails,
  offerDetails,
  customerTableTools,
  loadingCustomers,
  pagination,
  handleLinkCustomer,
  onSortedColChange,
}: ApplicationViewProps) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('applicationView.customersTable.name') || '',
      sortType: 'toString',
      accessor: 'name',
    },
    {
      Cell: ({ cell }) => {
        const { value } = cell;
        return value ? t([`common.organizationTypes.${value as OrganizationType}`]) : t([`common.privateCustomer`]);
      },
      Header: t('customerList.tableHeaders.group') || '',
      disableSortBy: true,
      accessor: 'organizationType',
    },
    {
      Header: t('applicationView.customersTable.municipality') || '',
      disableSortBy: true,
      accessor: 'city',
    },
    {
      Header: t('applicationView.customersTable.address') || '',
      disableSortBy: true,
      accessor: 'address',
    },
    {
      Cell: ({ cell }) => (
        <div title={cell.value !== null ? cell.value : undefined} className={styles.berthsCell}>
          {cell.value}
        </div>
      ),
      Header: t('applicationView.customersTable.berths') || '',
      disableSortBy: true,
      accessor: 'berths',
    },
  ];

  return (
    <div className={styles.applicationView}>
      <PageTitle title={t('applicationView.title')} />
      <div className={classNames(styles.fullWidth, styles.pageHeader)}>
        <Text as="h2" size="xl" weight="normalWeight">
          {applicationDetails.berthSwitch !== null
            ? t('applicationList.applicationType.switchApplication')
            : t('applicationList.applicationType.newApplication')}{' '}
          {formatDate(applicationDetails.createdAt, i18n.language)}
        </Text>
        <Chip
          className={styles.chip}
          color={APPLICATION_STATUS[applicationDetails.status].color}
          label={t(APPLICATION_STATUS[applicationDetails.status].label)}
        />
      </div>

      {similarCustomersData && (
        <>
          <div className={styles.fullWidth}>
            <Notification labelText={t('applicationView.noCustomerProfileNotification.label')} type="warning">
              {t('applicationView.noCustomerProfileNotification.description')}
            </Notification>
          </div>
          <Table
            className={styles.fullWidth}
            data={similarCustomersData}
            loading={loadingCustomers}
            columns={columns}
            renderMainHeader={() => t('applicationView.customersTable.mainHeader')}
            renderTableToolsTop={({ selectedRows }) => {
              const onLinkCustomer = selectedRows.length ? () => handleLinkCustomer(selectedRows[0].id) : undefined;

              return <CustomersTableTools {...customerTableTools} handleLinkCustomer={onLinkCustomer} />;
            }}
            renderTableToolsBottom={() => <Pagination {...pagination} className={styles.fullWidth} />}
            renderEmptyStateRow={() => <div>{t('applicationView.customersTable.emptyState')}</div>}
            onSortedColChange={onSortedColChange}
            canSelectOneRow
          />
        </>
      )}
      {customerProfile && (
        <>
          <CustomerProfileCard {...customerProfile} />
          <Card>
            <CardHeader title={'TOIMINTAHISTORIA'} />
            <CardBody>Placeholder</CardBody>
          </Card>
        </>
      )}
      {applicationDetails && (
        <Card className={styles.fullWidth}>
          <CardHeader title={t('applicationView.applicationDetails.title')} />
          <CardBody>
            <ApplicationDetails {...applicationDetails} queue={null} />
          </CardBody>
        </Card>
      )}
      {offerDetails && <OfferCard {...offerDetails} />}
    </div>
  );
};

export default ApplicationView;
