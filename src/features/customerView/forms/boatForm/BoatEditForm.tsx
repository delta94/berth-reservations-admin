import React from 'react';

import BoatForm, { BoatFormProps } from './BoatForm';

const BoatEditForm = ({ initialValues, onCancel, onDelete, onSubmit, boatTypes }: BoatFormProps) => {
  return (
    <BoatForm
      onSubmit={onSubmit} // TODO: perform GQL mutation
      onDelete={onDelete} // TODO: perform GQL mutation
      onCancel={onCancel}
      initialValues={initialValues}
      boatTypes={boatTypes}
      // TODO: set isSubmitting from GQL mutation
    />
  );
};

export default BoatEditForm;
