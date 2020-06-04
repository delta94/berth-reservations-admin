import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { INDIVIDUAL_BERTH_QUERY } from './queries';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_BERTH } from './__generated__/INDIVIDUAL_BERTH';
import { UPDATE_BERTH, UPDATE_BERTHVariables as UPDATE_BERTH_VARS } from './__generated__/UPDATE_BERTH';
import { DELETE_BERTH_MUTATION, UPDATE_BERTH_MUTATION } from './mutations';
import { Berth, FormProps } from '../types';
import { DELETE_BERTH, DELETE_BERTHVariables as DELETE_BERTH_VARS } from './__generated__/DELETE_BERTH';
import { getBerth } from './utils/utils';
import BerthForm from './BerthForm';
import { Pier } from '../../utils/utils';

interface BerthEditFormProps extends Omit<FormProps<Berth>, 'initialValues' | 'onCreate'> {
  berthId: string;
  pierOptions: Pier[];
}

const BerthEditForm: React.FC<BerthEditFormProps> = ({
  berthId,
  onCancel,
  onSubmit,
  onDelete,
  refetchQueries,
  pierOptions,
}) => {
  const { loading, error, data } = useQuery<INDIVIDUAL_BERTH>(INDIVIDUAL_BERTH_QUERY, { variables: { id: berthId } });

  const [updateBerth, { loading: isSubmitting }] = useMutation<UPDATE_BERTH, UPDATE_BERTH_VARS>(UPDATE_BERTH_MUTATION, {
    refetchQueries: [...(refetchQueries ?? []), { query: INDIVIDUAL_BERTH_QUERY, variables: { id: berthId } }],
  });

  const [deleteBerth] = useMutation<DELETE_BERTH, DELETE_BERTH_VARS>(DELETE_BERTH_MUTATION, {
    refetchQueries: refetchQueries ?? [],
  });

  const { t } = useTranslation();

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error) return <div>{t('forms.common.error')}</div>;

  const initialValues = getBerth(data);

  return (
    <BerthForm
      initialValues={initialValues}
      isEditing={true}
      onCancel={onCancel}
      onDelete={(values) => deleteBerth({ variables: { input: { id: berthId } } }).then(() => onDelete?.(values))}
      onSubmitText={t('forms.common.update')}
      onSubmit={(values) => {
        const { number, pierId, width, length, mooringType, comment, isActive, depth } = values;
        updateBerth({
          variables: {
            input: {
              id: berthId,
              pierId,
              number,
              width,
              length,
              mooringType,
              comment,
              isActive,
              depth,
            },
          },
        }).then(() => onSubmit?.(values));
      }}
      isSubmitting={isSubmitting}
      pierOptions={pierOptions}
    />
  );
};

export default BerthEditForm;
