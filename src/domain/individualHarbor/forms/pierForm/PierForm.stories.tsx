import React from 'react';

import PierForm from './PierForm';

export default {
  component: PierForm,
  title: 'PierForm',
};

export const pierForm = () => (
  <PierForm
    harborId={'test harbor'}
    onSubmitText="Luo"
    onSubmit={values =>
      alert(`Called submit with values: ${JSON.stringify(values)}`)
    }
    suitableBoatTypeOptions={[
      { id: '1', name: 'Jollavene' },
      { id: '2', name: 'Soutuvene' },
    ]}
  />
);

pierForm.story = {
  name: 'Default',
};
