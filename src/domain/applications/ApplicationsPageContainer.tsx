import React from 'react';
import { useTranslation } from 'react-i18next';

import ApplicationsPage from './ApplicationsPage';
import Table from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';
import ApplicationDetails from './applicationDetails/ApplicationDetails';

const ApplicationsPageContainer: React.SFC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/applications/${cell.value.id}`}>
          {cell.value.type}
        </InternalLink>
      ),
      Header: t('applications.tableHeaders.applicationType'),
      accessor: 'application',
    },
    {
      Header: t('applications.tableHeaders.queue'),
      accessor: 'queue',
    },
    {
      Header: t('applications.tableHeaders.pvm'),
      accessor: 'createdAt',
    },
    {
      Header: t('applications.tableHeaders.municipality'),
      accessor: 'municipality',
    },
    {
      Header: t('applications.tableHeaders.status'),
      accessor: 'status',
    },
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/offers/${cell.value.id}`}>
          {cell.value.address}
        </InternalLink>
      ),
      Header: t('applications.tableHeaders.place'),
      accessor: 'lease',
    },
  ];

  const tableData = [
    {
      application: {
        id: '123',
        type: 'Vaihtohakemus',
      },
      queue: 234,
      createdAt: '1.1.2019',
      municipality: 'Helsinki',
      status: 'Tarjous lähetetty',
      lease: {
        id: '11',
        address: 'Pursilahdenranta 31',
      },
    },
    {
      application: {
        id: '321',
        type: 'Vaihtohakemus',
      },
      queue: 234,
      createdAt: '1.1.2019',
      municipality: 'Helsinki',
      status: 'Käsitelty',
      lease: {
        id: '22',
        address: 'Merisatama 2',
      },
    },
  ];

  return (
    <ApplicationsPage>
      <Table
        data={tableData}
        columns={columns}
        renderSubComponent={row => (
          <ApplicationDetails
            applicationType={row.original.application.type}
            receivedDate="23.8.2019, klo 21.06"
            queueNumber={row.original.queue}
            status={row.original.status}
            boatType="Purjevene / moottoripursi"
            registrationNumber="A 12345"
            boatWidth="3,2 m"
            boatLength="6 m"
            boatDepth="0,8 m"
            boatWeight="350 kg"
            boatName="Cama la Yano"
            boatBrand="Marine"
            selectedPorts={[
              { title: 'Pursilahdenranta', id: '123' },
              { title: 'Pursilahdenranta', id: '123' },
            ]}
            accessible={true}
          />
        )}
        renderMainHeader={() => t('applications.tableHeaders.mainHeader')}
        canSelectRows
      />
    </ApplicationsPage>
  );
};

export default ApplicationsPageContainer;
