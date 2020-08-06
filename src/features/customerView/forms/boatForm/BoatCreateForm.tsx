import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import BoatForm, { BoatFormProps } from './BoatForm';
import { CREATE_CUSTOMER_BOAT_MUTATION } from './mutations';
import {
  CREATE_CUSTOMER_BOAT,
  CREATE_CUSTOMER_BOATVariables as CREATE_CUSTOMER_BOAT_VARS,
} from './__generated__/CREATE_CUSTOMER_BOAT';

interface BoatCreateFormProps extends Omit<BoatFormProps, 'onDelete' | 'initialValues'> {
  ownerId: string;
}

const BoatCreateForm = ({ boatTypes, ownerId, onCancel, onSubmit, refetchQueries }: BoatCreateFormProps) => {
  const [createBoat, { loading: isSubmitting }] = useMutation<CREATE_CUSTOMER_BOAT, CREATE_CUSTOMER_BOAT_VARS>(
    CREATE_CUSTOMER_BOAT_MUTATION,
    {
      refetchQueries: refetchQueries ?? [],
    }
  );

  return (
    <BoatForm
      boatTypes={boatTypes}
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      onSubmit={(values) => {
        const { boatType, registrationNumber, width, length, draught, weight, name, model } = values;
        createBoat({
          variables: {
            input: {
              ownerId,
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

export default BoatCreateForm;
