import React, { FunctionComponent } from 'react';

import BerthsFields from './BerthsFields';
import WinterStorageFields from './WinterStorageFields';
import HarborServicesFields from './HarborServicesFields';
import AdditionalServicesFields from './AdditionalServicesFields';

export enum PRICING_TYPES {
  BERTHS = 'BERTHS',
  HARBOR_SERVICES = 'HARBOR_SERVICES',
  WINTER_STORAGE = 'WINTER_STORAGE',
  ADDITIONAL_SERVICES = 'ADDITIONAL_SERVICES',
}

export interface EditFormFieldsProps {
  formType: PRICING_TYPES;
}

const EditFormFields: FunctionComponent<EditFormFieldsProps> = ({
  formType,
}) => {
  switch (formType) {
    case PRICING_TYPES.BERTHS:
      return <BerthsFields />;
    case PRICING_TYPES.WINTER_STORAGE:
      return <WinterStorageFields />;
    case PRICING_TYPES.HARBOR_SERVICES:
      return <HarborServicesFields />;
    case PRICING_TYPES.ADDITIONAL_SERVICES:
      return <AdditionalServicesFields />;
  }
};

export default EditFormFields;
