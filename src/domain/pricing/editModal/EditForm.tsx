import React, { FunctionComponent } from 'react';
import { Form, Formik } from 'formik';
import { Button } from 'hds-react/lib';
import { useTranslation } from 'react-i18next';

import styles from './editForm.module.scss';
import { AdditionalService, BerthPrice, HarborService, WinterStoragePrice } from '../PricingPage';
import AdditionalServicesFields, { getAdditionalServicesValidationSchema } from './fields/AdditionalServicesFields';
import BerthsFields, { getBerthsValidationSchema } from './fields/BerthsFields';
import WinterStorageFields, { getWinterStorageValidationSchema } from './fields/WinterStorageFields';
import HarborServicesFields, { getHarborServicesValidationSchema } from './fields/HarborServicesFields';

export enum EDIT_FORM_TYPE {
  BERTHS = 'BERTHS',
  HARBOR_SERVICES = 'HARBOR_SERVICES',
  WINTER_STORAGE = 'WINTER_STORAGE',
  ADDITIONAL_SERVICES = 'ADDITIONAL_SERVICES',
}

export interface EditPricingFormProps {
  onSubmit: (values: BerthPrice | WinterStoragePrice | HarborService | AdditionalService) => void;
  closeModal: () => void;
  initialValues: BerthPrice | WinterStoragePrice | HarborService | AdditionalService;
  formType: EDIT_FORM_TYPE;
}

const getForm = (formType: EDIT_FORM_TYPE) => {
  switch (formType) {
    case EDIT_FORM_TYPE.BERTHS:
      return {
        getValidationSchema: getBerthsValidationSchema,
        component: <BerthsFields />,
      };
    case EDIT_FORM_TYPE.WINTER_STORAGE:
      return {
        getValidationSchema: getWinterStorageValidationSchema,
        component: <WinterStorageFields />,
      };
    case EDIT_FORM_TYPE.HARBOR_SERVICES:
      return {
        getValidationSchema: getHarborServicesValidationSchema,
        component: <HarborServicesFields />,
      };
    case EDIT_FORM_TYPE.ADDITIONAL_SERVICES:
      return {
        getValidationSchema: getAdditionalServicesValidationSchema,
        component: <AdditionalServicesFields />,
      };
  }
};

const EditForm: FunctionComponent<EditPricingFormProps> = ({ onSubmit, closeModal, formType, initialValues }) => {
  const { t } = useTranslation();
  const form = getForm(formType);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={form.getValidationSchema(t)}>
      {({ isSubmitting }) => (
        <Form>
          {form.component}
          <div className={styles.buttonRow}>
            <Button color="supplementary" onClick={closeModal}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('common.save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
