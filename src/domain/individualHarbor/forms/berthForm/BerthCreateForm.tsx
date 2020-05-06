import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import {
  CREATE_BERTH,
  CREATE_BERTHVariables as CREATE_BERTH_VARS,
} from './__generated__/CREATE_BERTH';
import { CREATE_BERTH_MUTATION } from './mutations';
import { Berth, FormProps } from './types';
import BerthForm from './BerthForm';
import { Pier } from '../../utils/utils';
import { CreateBerthMutationInput } from '../../../../@types/__generated__/globalTypes';

interface BerthCreateFormProps
  extends Omit<FormProps<Berth>, 'initialValues' | 'onDelete'> {
  pierOptions: Pier[];
}

const BerthCreateForm: React.FC<BerthCreateFormProps> = ({
  onCancel,
  onSubmit,
  refetchQueries,
  pierOptions,
}) => {
  const [createBerth, { loading: isSubmitting }] = useMutation<
    CREATE_BERTH,
    CREATE_BERTH_VARS
  >(CREATE_BERTH_MUTATION, {
    refetchQueries: refetchQueries ?? [],
  });
  const { t } = useTranslation();

  return (
    <BerthForm
      initialValues={{}}
      onCancel={onCancel}
      onSubmitText={t('forms.common.create')}
      onSubmit={values => {
        const {
          pierId,
          number,
          width,
          length,
          mooringType,
          comment,
          isActive,
        } = values;
        createBerth({
          variables: {
            input: {
              pierId,
              number,
              width,
              length,
              mooringType,
              comment,
              isActive,
            } as CreateBerthMutationInput,
          },
        }).then(() => onSubmit?.(values));
      }}
      isSubmitting={isSubmitting}
      pierOptions={pierOptions}
    />
  );
};

export default BerthCreateForm;
