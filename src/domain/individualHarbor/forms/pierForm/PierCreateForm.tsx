import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { FormProps, Pier } from '../types';
import PierForm from './PierForm';
import { CREATE_PIER_MUTATION } from './mutations';
import { CREATE_PIER, CREATE_PIERVariables as CREATE_PIER_VARS } from './__generated__/CREATE_PIER';
import { BOAT_TYPES } from './__generated__/BOAT_TYPES';
import { BOAT_TYPES_QUERY } from './queries';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { getBoatTypes } from './utils/utils';

interface Props extends Omit<FormProps<Pier>, 'initialValues' | 'isSubmitting' | 'onDelete'> {
  harborId: string;
}

const PierCreateForm: React.FC<Props> = ({ harborId, onCancel, onSubmit, refetchQueries }) => {
  const { loading, error, data } = useQuery<BOAT_TYPES>(BOAT_TYPES_QUERY);
  const [createPier, { loading: isSubmitting, error: createError }] = useMutation<CREATE_PIER, CREATE_PIER_VARS>(
    CREATE_PIER_MUTATION,
    {
      refetchQueries: refetchQueries ?? [],
    }
  );
  const { t } = useTranslation();

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error || createError) return <div>{t('forms.common.error')}</div>;

  const suitableBoatTypeOptions = getBoatTypes(data);

  return (
    <PierForm
      onSubmitText={t('forms.common.create')}
      onCancel={onCancel}
      onSubmit={(values) =>
        createPier({ variables: { input: { ...values, harborId } } }).then(() => onSubmit?.(values))
      }
      isSubmitting={isSubmitting}
      suitableBoatTypeOptions={suitableBoatTypeOptions}
    />
  );
};

export default PierCreateForm;
