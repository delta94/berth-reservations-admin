import React from 'react';
import { useTranslation } from 'react-i18next';

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
import CustomerInfoCard, {
  CustomerInfoCardProps,
} from '../cards/customerInfoCard/CustomerInfoCard';

export enum CUSTOMER_GROUP {
  PRIVATE = 'PRIVATE',
  COMPANY = 'COMPANY',
}

export interface CustomerData {
  id: string;
  name: string;
  customerGroup: CUSTOMER_GROUP;
  city?: string;
  address?: string;
  berth?: string | null;
}

type ColumnType = Column<CustomerData> & { accessor: keyof CustomerData };

export interface IndividualApplicationPageProps {
  applicationId: string;
  similarCustomersData: CustomerData[] | null;
  customerInfo: CustomerInfoCardProps;
  applicationDetails: ApplicationDetailsProps;
  handleLinkCustomer(customerId: string): void;
  handleCreateCustomer(): void;
}

const IndividualApplicationPage: React.SFC<IndividualApplicationPageProps> = ({
  similarCustomersData,
  customerInfo,
  applicationDetails,
  handleLinkCustomer,
  handleCreateCustomer,
}) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: 'Nimi',
      accessor: 'name',
    },
    {
      Header: 'municipality',
      accessor: 'city',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Venepaikka',
      accessor: 'berth',
    },
  ];

  return (
    <div className={styles.individualApplicationPage}>
      <div className={styles.pageHeader}>
        <Text as="h2" size="xl">
          {applicationDetails.isSwitch
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
        <Table
          className={styles.customersTable}
          data={similarCustomersData}
          columns={columns}
          renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
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
            <div>Rajauksella ei löytynyt asiakastietoja</div>
          )}
          canSelectOneRow
        />
      )}
      <CustomerInfoCard {...customerInfo} />
      <Card>
        <CardHeader title={'TOIMINTAHISTORIA'} />
        <CardBody>Placeholder</CardBody>
      </Card>
      {applicationDetails && (
        <Card className={styles.applicationDetails}>
          <CardHeader title={'HAKEMUKSET'} />
          <CardBody>
            <ApplicationDetails {...applicationDetails} queue={null} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default IndividualApplicationPage;
