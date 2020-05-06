import React, { FunctionComponent } from 'react';
import { Form, Formik, FormikErrors } from 'formik';
import { Button } from 'hds-react/lib';
import { useTranslation } from 'react-i18next';

import styles from './editModal.module.scss';
import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from '../PricingPage';
import EditFormFields, { PRICING_TYPES } from './fields/EditFormFields';

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

const EditForm: FunctionComponent<EditPricingFormProps> = ({
  onSubmit,
  closeModal,
  formType,
  initialValues,
}) => {
  const { t } = useTranslation();
  const [isFilling, setFormIsFilling] = React.useState(false);

  const validate = () => {
    if (!isFilling) {
      setFormIsFilling(true);
    }
    const errors: FormikErrors<
      BerthPrice | WinterStoragePrice | HarborService | AdditionalService
    > = {};
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
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
