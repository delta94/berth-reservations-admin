import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import BoatForm, { BoatFormProps } from './BoatForm';
import { DELETE_CUSTOMER_BOAT_MUTATION, UPDATE_CUSTOMER_BOAT_MUTATION } from './mutations';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { BoatType } from '../../types';
import {
  UPDATE_CUSTOMER_BOAT,
  UPDATE_CUSTOMER_BOATVariables as UPDATE_CUSTOMER_BOAT_VARS,
} from './__generated__/UPDATE_CUSTOMER_BOAT';
import {
  DELETE_CUSTOMER_BOAT,
  DELETE_CUSTOMER_BOATVariables as DELETE_CUSTOMER_BOAT_VARS,
} from './__generated__/DELETE_CUSTOMER_BOAT';

interface BoatEditFormProps extends Omit<BoatFormProps, 'onCreate'> {
  boatTypes: BoatType[];
}

const BoatEditForm = ({
  boatTypes,
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
  refetchQueries,
}: BoatEditFormProps) => {
  const [updateBoat, { loading: isSubmitting }] = useMutation<UPDATE_CUSTOMER_BOAT, UPDATE_CUSTOMER_BOAT_VARS>(
    UPDATE_CUSTOMER_BOAT_MUTATION,
    {
      refetchQueries: refetchQueries ?? [],
    }
  );

  const [deleteBoat] = useMutation<DELETE_CUSTOMER_BOAT, DELETE_CUSTOMER_BOAT_VARS>(DELETE_CUSTOMER_BOAT_MUTATION, {
    refetchQueries: refetchQueries ?? [],
  });

  if (!initialValues) return <LoadingSpinner isLoading={true} />;

  const boatId = initialValues.id;

  return (
    <BoatForm
      boatTypes={boatTypes}
      initialValues={initialValues}
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      onDelete={(values) => deleteBoat({ variables: { input: { id: boatId } } }).then(() => onDelete?.(values))}
      onSubmit={(values) => {
        const { boatType, registrationNumber, width, length, draught, weight, name, model } = values;
        updateBoat({
          variables: {
            input: {
              id: boatId,
              boatTypeId: boatType.id,
              registrationNumber,
              width,
              length,
              draught,
              weight,
              name,
              model,
            },
          },
        }).then(() => onSubmit?.(values));
      }}
    />
  );
};

export default BoatEditForm;
