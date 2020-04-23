import React from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';

import styles from './individualApplicationPage.module.scss';
import Card from '../../common/card/Card';
import CardBody from '../../common/cardBody/CardBody';
import ApplicationDetails, {
  ApplicationDetailsProps,
} from '../cards/applicationDetails/ApplicationDetails';
import CardHeader from '../../common/cardHeader/CardHeader';
import Table, { Column } from '../../common/table/Table';
import CustomersTableTools from './customersTableTools/CustomersTableTools';
import Text from '../../common/text/Text';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import CustomerProfileCard, {
  CustomerProfileCardProps,
} from '../cards/customerProfileCard/CustomerProfileCard';
import OfferCard, { OfferCardProps } from './offerCard/OfferCard';
import { CUSTOMER_GROUP } from '../types';

export interface CustomerData {
  id: string;
  name: string;
  customerGroup: CUSTOMER_GROUP;
  city?: string;
  address?: string;
  berths?: string | null;
}

type ColumnType = Column<CustomerData> & { accessor: keyof CustomerData };

export interface IndividualApplicationPageProps {
  applicationId: string;
  similarCustomersData: CustomerData[] | null;
  customerProfile: CustomerProfileCardProps | null;
  applicationDetails: ApplicationDetailsProps;
  offerDetails: OfferCardProps | null;
  handleLinkCustomer(customerId: string): void;
  handleCreateCustomer(): void;
}

const IndividualApplicationPage: React.SFC<IndividualApplicationPageProps> = ({
  similarCustomersData,
  customerProfile,
  applicationDetails,
  offerDetails,
  handleLinkCustomer,
  handleCreateCustomer,
}) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('individualApplication.customersTable.name') || '',
      accessor: 'name',
    },
    {
      Cell: ({ cell }) =>
        t([`common.customerGroups.${cell.value as CUSTOMER_GROUP}`]),
      Header: t('individualApplication.customersTable.customerGroup') || '',
      accessor: 'customerGroup',
    },
    {
      Header: t('individualApplication.customersTable.municipality') || '',
      accessor: 'city',
    },
    {
      Header: t('individualApplication.customersTable.address') || '',
      accessor: 'address',
    },
    {
      Cell: ({ cell }) => (
        <div
          title={cell.value !== null ? cell.value : undefined}
          className={styles.berthsCell}
        >
          {cell.value}
        </div>
      ),
      Header: t('individualApplication.customersTable.berths') || '',
      accessor: 'berths',
    },
  ];

  return (
    <div className={styles.individualApplicationPage}>
      <div className={styles.pageHeader}>
        <Text as="h2" size="xl" weight="normalWeight">
          {applicationDetails.berthSwitch !== null
            ? t('applications.applicationType.switchApplication')
            : t('applications.applicationType.newApplication')}{' '}
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
          <Notification
            labelText={t(
              'individualApplication.noCustomerProfileNotification.label'
            )}
            type="warning"
          >
            {t(
              'individualApplication.noCustomerProfileNotification.description'
            )}
          </Notification>
          <Table
            className={styles.customersTable}
            data={similarCustomersData}
            columns={columns}
            renderMainHeader={() =>
              t('individualApplication.customersTable.mainHeader')
            }
            renderTableToolsBottom={({ selectedRows }) => {
              const onLinkCustomer = selectedRows.length
                ? () => handleLinkCustomer(selectedRows[0].id)
                : undefined;

              return (
                <CustomersTableTools
                  handleLinkCustomer={onLinkCustomer}
                  handleCreateCustomer={handleCreateCustomer}
                />
              );
            }}
            renderEmptyStateRow={() => (
              <div>{t('individualApplication.customersTable.emptyState')}</div>
            )}
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
        <Card className={styles.applicationDetails}>
          <CardHeader
            title={t('individualApplication.applicationDetails.title')}
          />
          <CardBody>
            <ApplicationDetails {...applicationDetails} queue={null} />
          </CardBody>
        </Card>
      )}
      {offerDetails && <OfferCard {...offerDetails} />}
    </div>
  );
};

export default IndividualApplicationPage;
