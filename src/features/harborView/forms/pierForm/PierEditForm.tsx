import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { FormProps, Pier } from '../types';
import PierForm from './PierForm';
import { DELETE_PIER_MUTATION, UPDATE_PIER_MUTATION } from './mutations';
import { UPDATE_PIER, UPDATE_PIERVariables as UPDATE_PIER_VARS } from './__generated__/UPDATE_PIER';
import { PIER_AND_BOAT_TYPES_QUERY } from './queries';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { getBoatTypes, getPier } from './utils/utils';
import { PIER_AND_BOAT_TYPES } from './__generated__/PIER_AND_BOAT_TYPES';
import { DELETE_PIER, DELETE_PIERVariables as DELETE_PIER_VARS } from './__generated__/DELETE_PIER';

interface Props extends Omit<FormProps<Pier>, 'initialValues' | 'isSubmitting'> {
  pierId: string;
}

const PierEditForm = ({ pierId, onCancel, onSubmit, onDelete, refetchQueries }: Props) => {
  const { loading, error, data } = useQuery<PIER_AND_BOAT_TYPES>(PIER_AND_BOAT_TYPES_QUERY, {
    variables: { id: pierId },
  });
  const [updatePier, { loading: isSubmitting, error: updateError }] = useMutation<UPDATE_PIER, UPDATE_PIER_VARS>(
    UPDATE_PIER_MUTATION,
    {
      refetchQueries: [...(refetchQueries ?? []), { query: PIER_AND_BOAT_TYPES_QUERY, variables: { id: pierId } }],
    }
  );
  const [deletePier, { error: deleteError }] = useMutation<DELETE_PIER, DELETE_PIER_VARS>(DELETE_PIER_MUTATION, {
    refetchQueries: refetchQueries ?? [],
  });
  const { t } = useTranslation();

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error || updateError || deleteError) return <div>{t('forms.common.error')}</div>;

  const suitableBoatTypeOptions = getBoatTypes(data);
  const initialValues = getPier(data);

  return (
    <PierForm
      initialValues={initialValues}
      onSubmitText={t('forms.common.update')}
      onCancel={onCancel}
      onSubmit={(values) =>
        updatePier({
          variables: { input: { id: pierId, ...values } },
        }).then(() => onSubmit?.(values))
      }
      onDelete={(values) => deletePier({ variables: { input: { id: pierId } } }).then(() => onDelete?.(values))}
      isSubmitting={isSubmitting}
      suitableBoatTypeOptions={suitableBoatTypeOptions}
    />
  );
};

export default PierEditForm;
