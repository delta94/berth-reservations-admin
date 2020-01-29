import React from 'react';
import { useTranslation } from 'react-i18next';

import ApplicationsPage from './ApplicationsPage';
import Table from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';

const ApplicationsPageContainer: React.SFC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      Header: t('applicationType'),
      accessor: 'berthSwitch',
    },
    {
      Header: t('queue'),
      accessor: 'queue',
    },
    {
      Header: t('Pvm'),
      accessor: 'createdAt',
    },
    {
      Header: t('municipality'),
      accessor: 'municipality',
    },
    {
      Header: t('status'),
      accessor: 'status',
    },
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/applications/${cell.value.id}`}>
          {cell.value.address}
        </InternalLink>
      ),
      Header: t('place'),
      accessor: 'lease',
    },
  ];

  const tableData = [
    {
      berthSwitch: 'Exchange application',
      queue: 234,
      createdAt: '1.1.2019',
      municipality: 'Helsinki',
      status: 'Tarjous lähetetty',
      lease: {
        id: '11',
        address: 'Pursilahdenranta 31',
      },
    },
  ];

  return (
    <ApplicationsPage>
      <Table
        data={tableData}
        columns={columns}
        renderSubComponent={row => 'placeholder'}
        renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
        canSelectRows
      />
    </ApplicationsPage>
  );
};

export default ApplicationsPageContainer;
