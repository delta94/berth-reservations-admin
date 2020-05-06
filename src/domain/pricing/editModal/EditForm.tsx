import React, { FunctionComponent } from 'react';
import { Form, Formik } from 'formik';
import { Button } from 'hds-react/lib';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import styles from './editModal.module.scss';
import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from '../PricingPage';
import EditFormFields, { PRICING_TYPES } from './fields/EditFormFields';
import { getAdditionalServicesValidationSchema } from './fields/AdditionalServicesFields';
import { getBerthsValidationSchema } from './fields/BerthsFields';
import { getWinterStorageValidationSchema } from './fields/WinterStorageFields';
import { getHarborServicesValidationSchema } from './fields/HarborServicesFields';

export interface EditPricingFormProps {
  onSubmit: (
    values: BerthPrice | WinterStoragePrice | HarborService | AdditionalService
  ) => void;
  closeModal: () => void;
  initialValues:
    | BerthPrice
    | WinterStoragePrice
    | HarborService
    | AdditionalService;
  formType: PRICING_TYPES;
}

const getEditFormValidationSchema = (formType: PRICING_TYPES, t: TFunction) => {
  switch (formType) {
    case PRICING_TYPES.BERTHS:
      return getBerthsValidationSchema(t);
    case PRICING_TYPES.WINTER_STORAGE:
      return getWinterStorageValidationSchema(t);
    case PRICING_TYPES.HARBOR_SERVICES:
      return getHarborServicesValidationSchema(t);
    case PRICING_TYPES.ADDITIONAL_SERVICES:
      return getAdditionalServicesValidationSchema(t);
  }
};

const EditForm: FunctionComponent<EditPricingFormProps> = ({
  onSubmit,
  closeModal,
  formType,
  initialValues,
}) => {
  const { t } = useTranslation();
  const validationSchema = getEditFormValidationSchema(formType, t);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <Form>
          <EditFormFields formType={formType} />
          <div className={styles.buttonRow}>
            <Button color="supplementary" onClick={() => closeModal()}>
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className={styles.alignRight}
              disabled={isSubmitting}
            >
              {t('common.save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
