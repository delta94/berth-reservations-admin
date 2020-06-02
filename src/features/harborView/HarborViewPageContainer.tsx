import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';

import Table, { Column } from '../../common/table/Table';
import { INDIVIDUAL_HARBOR_QUERY } from './queries';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { getIndividualHarborData, getBerths, Berth, getPiers, getMaps } from './utils/utils';
import HarborViewPage from './HarborViewPage';
import HarborProperties from './harborProperties/HarborProperties';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { formatDimension } from '../../common/utils/format';
import PierSelectHeader from './pierSelectHeader/PierSelectHeader';
import Modal from '../../common/modal/Modal';
import BerthEditForm from './forms/berthForm/BerthEditForm';
import BerthCreateForm from './forms/berthForm/BerthCreateForm';
import HarborViewTableTools from './harborViewTableTools/HarborViewTableTools';
import BerthDetails from '../../common/berthDetails/BerthDetails';
import InternalLink from '../../common/internalLink/InternalLink';
import PierCreateForm from './forms/pierForm/PierCreateForm';
import PierEditForm from './forms/pierForm/PierEditForm';
import Chip from '../../common/chip/Chip';
import HarborEditForm from './forms/harborForm/HarborEditForm';
import Pagination from '../../common/pagination/Pagination';

const HarborViewPageContainer: React.SFC = () => {
  const [editingHarbor, setEditingHarbor] = useState<boolean>(false);
  const [berthToEdit, setBerthToEdit] = useState<string | null>(null);
  const [creatingBerth, setCreatingBerth] = useState<boolean>(false);
  const [pierToEdit, setPierToEdit] = useState<string | null>(null);
  const [creatingPier, setCreatingPier] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_HARBOR>(INDIVIDUAL_HARBOR_QUERY, { variables: { id } });
  const { t, i18n } = useTranslation();

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error) return <div>Error</div>;

  const harbor = getIndividualHarborData(data);

  if (!harbor) return <div>No data...</div>;

  const columns: Column<Berth>[] = [
    {
      Header: t('harborView.tableHeaders.number') || '',
      accessor: 'number',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.identifier') || '',
      accessor: 'identifier',
      filter: 'text',
    },
    {
      Cell: ({ cell }: { cell: Cell<Berth> }) => {
        const isBerthActive = cell.row.original.isActive;
        if (!isBerthActive) {
          return <Chip color="red" label={t('harborView.berthProperties.inactive')} />;
        }
        const activeLease = cell.row.original.leases?.find((lease) => lease.isActive);
        if (!activeLease) {
          return cell.value;
        }
        return <InternalLink to={`/customers/${activeLease.customer.id}}`}>{cell.value}</InternalLink>;
      },
      Header: t('harborView.tableHeaders.customer') || '',
      accessor: ({ leases }) => {
        const activeLease = leases?.find((lease) => lease.isActive);
        if (!activeLease) return '';
        return `${activeLease.customer.firstName} ${activeLease.customer.lastName}`;
      },
      id: 'leases',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.length') || '',
      accessor: ({ length }) => formatDimension(length, i18n.language),
      id: 'length',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.width') || '',
      accessor: ({ width }) => formatDimension(width, i18n.language),
      id: 'width',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.depth') || '',
      accessor: ({ depth }) => formatDimension(depth, i18n.language),
      id: 'depth',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.mooring') || '',
      accessor: ({ mooringType }) => t([`common.mooringTypes.${mooringType}`, mooringType]),
      id: 'mooringType',
      filter: 'text',
    },
  ];
  const piers = getPiers(data);
  const berths = getBerths(data);
  const maps = getMaps(data);
  const canAddBerth = piers.length > 0;

  return (
    <HarborViewPage>
      <HarborProperties
        name={harbor.name || ''}
        imageUrl={harbor.imageFile}
        maps={maps}
        servicemapId={harbor.servicemapId || ''}
        address={`${harbor.streetAddress} ${harbor.zipCode} ${harbor.municipality}`}
        properties={{
          electricity: harbor.electricity,
          gate: harbor.gate,
          lighting: harbor.lighting,
          maxWidth: harbor.maxWidth || 0,
          numberOfPlaces: harbor.numberOfPlaces || 0,
          numberOfFreePlaces: harbor.numberOfFreePlaces || 0,
          queue: harbor.numberOfPlaces || 0,
          wasteCollection: harbor.wasteCollection,
          water: harbor.water,
        }}
        editHarbor={() => setEditingHarbor(true)}
      />
      <Table
        data={berths}
        columns={columns}
        canSelectRows
        renderTableToolsTop={(_, setters) => (
          <HarborViewTableTools
            onAddBerth={() => setCreatingBerth(true)}
            onAddPier={() => setCreatingPier(true)}
            handleGlobalFilter={setters.setGlobalFilter}
            canAddBerth={canAddBerth}
          />
        )}
        styleMainHeader={false}
        renderMainHeader={(props) => (
          <PierSelectHeader
            piers={piers}
            onEdit={(pier) => setPierToEdit(pier.id)}
            selectedPier={piers.find((pier) =>
              props.state.filters
                .filter((filter) => filter.id === 'identifier')
                .find((filter) => filter.value === pier.identifier)
            )}
            onPierSelect={(pier) => {
              props.setFilter('identifier', pier?.identifier);
            }}
          />
        )}
        renderSubComponent={(row) => (
          <BerthDetails
            leases={row.original.leases ?? []}
            comment={row.original.comment}
            onEdit={() => setBerthToEdit(row.original.id)}
          />
        )}
        renderPaginator={({ pageIndex, pageCount, goToPage }) => (
          <Pagination
            forcePage={pageIndex}
            pageCount={pageCount || 1}
            onPageChange={({ selected }) => goToPage(selected)}
          />
        )}
      />
      {berthToEdit && (
        <Modal isOpen={!!berthToEdit} toggleModal={() => setBerthToEdit(null)}>
          <BerthEditForm
            berthId={berthToEdit}
            onCancel={() => setBerthToEdit(null)}
            onDelete={() => setBerthToEdit(null)}
            onSubmit={() => setBerthToEdit(null)}
            refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
            pierOptions={piers}
          />
        </Modal>
      )}
      <Modal isOpen={creatingBerth} toggleModal={() => setCreatingBerth(false)}>
        <BerthCreateForm
          onCancel={() => setCreatingBerth(false)}
          onSubmit={() => setCreatingBerth(false)}
          refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
          pierOptions={piers}
        />
      </Modal>
      <Modal isOpen={creatingPier} toggleModal={() => setCreatingPier(false)}>
        <PierCreateForm
          harborId={id}
          onCancel={() => setCreatingPier(false)}
          onSubmit={() => setCreatingPier(false)}
          refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
        />
      </Modal>
      {pierToEdit && (
        <Modal isOpen={!!pierToEdit} toggleModal={() => setPierToEdit(null)}>
          <PierEditForm
            pierId={pierToEdit}
            onCancel={() => setPierToEdit(null)}
            onDelete={() => setPierToEdit(null)}
            onSubmit={() => setPierToEdit(null)}
            refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
          />
        </Modal>
      )}
      <Modal isOpen={editingHarbor} toggleModal={() => setEditingHarbor(false)}>
        <HarborEditForm
          harborId={id}
          onCancel={() => setEditingHarbor(false)}
          onSubmit={() => setEditingHarbor(false)}
          refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
        />
      </Modal>
    </HarborViewPage>
  );
};

export default HarborViewPageContainer;
