import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikErrors } from 'formik';
import { Button } from 'hds-react/lib';

import Modal from '../../../common/modal/Modal';
import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from '../PricingPage';
import BerthsPricingFields from './BerthsPricingFields';
import WinterStoragePricingFields from './WinterStoragePricingFields';
import HarborServicesPricingFields from './HarborServicesPricingFields';
import AdditionalServicesFields from './AdditionalServicesFields';
import styles from './modals.module.scss';

export enum EDIT_PRICING_FORM_TYPES {
  BERTHS = 'BERTHS',
  HARBOR_SERVICES = 'HARBOR_SERVICES',
  WINTER_STORAGE = 'WINTER_STORAGE',
  ADDITIONAL_SERVICES = 'ADDITIONAL_SERVICES',
}

export interface EditPricingModalProps {
  onSubmit: () => void;
  isOpen: boolean;
  closeModal: () => void;
  initialValues:
    | BerthPrice
    | WinterStoragePrice
    | HarborService
    | AdditionalService;
  formType: EDIT_PRICING_FORM_TYPES;
}

const EditPricingModal: FunctionComponent<EditPricingModalProps> = ({
  isOpen,
  closeModal,
  formType,
  initialValues,
}) => {
  const [isFilling, setFormIsFilling] = React.useState(false);
  const { t } = useTranslation();

  const validate = () => {
    if (!isFilling) {
      setFormIsFilling(true);
    }
    const errors: FormikErrors<
      BerthPrice | WinterStoragePrice | HarborService | AdditionalService
    > = {};
    return errors;
  };

  const renderFormFields = (formType: EDIT_PRICING_FORM_TYPES) => {
    switch (formType) {
      case EDIT_PRICING_FORM_TYPES.BERTHS:
        return <BerthsPricingFields />;
      case EDIT_PRICING_FORM_TYPES.WINTER_STORAGE:
        return <WinterStoragePricingFields />;
      case EDIT_PRICING_FORM_TYPES.HARBOR_SERVICES:
        return <HarborServicesPricingFields />;
      case EDIT_PRICING_FORM_TYPES.ADDITIONAL_SERVICES:
        return <AdditionalServicesFields />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      label={t('pricing.editModalHeading').toUpperCase()}
      toggleModal={closeModal}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log('Form submit:', values)}
        validate={validate}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form>
            {renderFormFields(formType)}
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
    </Modal>
  );
};

export default EditPricingModal;
