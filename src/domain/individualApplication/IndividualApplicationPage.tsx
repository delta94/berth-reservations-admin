import React from 'react';
import classNames from 'classnames';
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
import CustomersTableTools, {
  CustomersTableToolsProps,
} from './customersTableTools/CustomersTableTools';
import Text from '../../common/text/Text';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import CustomerInfoCard, {
  CustomerInfoCardProps,
} from '../cards/customerInfoCard/CustomerInfoCard';
import OfferCard, { OfferCardProps } from './offerCard/OfferCard';

export enum CUSTOMER_GROUP {
  PRIVATE = 'PRIVATE',
  COMPANY = 'COMPANY',
  INTERNAL = 'INTERNAL',
  NON_BILLABLE = 'NON_BILLABLE',
  OTHER_ORGANIZATION = 'OTHER_ORGANIZATION',
}

export enum SearchBy {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'emails_Email',
  ADDRESS = 'addresses_Address',
}

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
  customerInfo: CustomerInfoCardProps;
  applicationDetails: ApplicationDetailsProps;
  offerDetails: OfferCardProps | null;
  customerTableTools: CustomersTableToolsProps<SearchBy>;
  handleLinkCustomer(customerId: string): void;
}

const IndividualApplicationPage: React.SFC<IndividualApplicationPageProps> = ({
  similarCustomersData,
  customerInfo,
  applicationDetails,
  offerDetails,
  customerTableTools,
  handleLinkCustomer,
}) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('individualApplication.customersTable.name') || '',
      accessor: 'name',
    },
    {
      Cell: ({ cell }) => {
        switch (cell.value as CUSTOMER_GROUP) {
          case CUSTOMER_GROUP.PRIVATE:
            return t('individualApplication.customersTable.privateCustomer');
          case CUSTOMER_GROUP.COMPANY:
            return t('individualApplication.customersTable.companyCustomer');
          case CUSTOMER_GROUP.INTERNAL:
            return t('individualApplication.customersTable.internalCustomer');
          case CUSTOMER_GROUP.NON_BILLABLE:
            return t(
              'individualApplication.customersTable.nonBillableCustomer'
            );
          case CUSTOMER_GROUP.OTHER_ORGANIZATION:
            return t(
              'individualApplication.customersTable.otherOrganizationCustomer'
            );
        }
      },
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
      <div className={classNames(styles.fullWidth, styles.pageHeader)}>
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
            className={styles.fullWidth}
            data={similarCustomersData}
            columns={columns}
            renderMainHeader={() =>
              t('individualApplication.customersTable.mainHeader')
            }
            renderTableToolsTop={({ selectedRows }) => {
              const onLinkCustomer = selectedRows.length
                ? () => handleLinkCustomer(selectedRows[0].id)
                : undefined;

              return (
                <CustomersTableTools
                  {...customerTableTools}
                  handleLinkCustomer={onLinkCustomer}
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
      <CustomerInfoCard {...customerInfo} />
      <Card>
        <CardHeader title={'TOIMINTAHISTORIA'} />
        <CardBody>Placeholder</CardBody>
      </Card>
      {applicationDetails && (
        <Card className={styles.fullWidth}>
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
