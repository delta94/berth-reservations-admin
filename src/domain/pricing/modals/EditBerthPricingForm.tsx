import React, { FunctionComponent } from 'react';
import { Button, TextInput } from 'hds-react/lib';
import { Formik, Form, Field } from 'formik';

import styles from './modals.module.scss';
import Grid from '../../../common/grid/Grid';
import Select from '../../../common/select/Select';
import { formatDimension } from '../../../common/utils/format';
import { BerthPrice } from '../PricingPage';

export interface EditBerthPricingFormProps {
  initialValues: BerthPrice;
  closeModal: () => void;
}

const EditBerthPricingForm: FunctionComponent<EditBerthPricingFormProps> = ({
  initialValues,
  closeModal,
}) => (
  <Formik initialValues={initialValues} onSubmit={() => alert('Yes!')}>
    {({ isSubmitting }) => (
      <Form id="editPricingModalForm">
        <div className={styles.row}>
          <TextInput id="baz" labelText="Tietue" value="Venepaikka" disabled />
        </div>
        <hr />
        <Grid colsCount={2} className={styles.row}>
          <Field
            required={true}
            aria-required={true}
            component={Select}
            id="width"
            labelText="Leveys"
            options={[2, 2.5, 2.75, 3, 4, 5, 5.5, 6, 7].map(option => {
              return { value: option, label: formatDimension(option, 'fi') };
            })}
          />
        </Grid>
        <Grid colsCount={2} className={styles.row}>
          <Field
            required={true}
            aria-required={true}
            component={TextInput}
            id="privateCustomer"
            name="privateCustomer"
            labelText="Yksityinen (€)"
          />
          <Field
            required={true}
            aria-required={true}
            component={TextInput}
            id="company"
            name="company"
            labelText="Yritys (€)"
          />
        </Grid>
        <Grid colsCount={2} className={styles.row}>
          <Field
            required={true}
            aria-required={true}
            component={Select}
            id="period"
            labelText="Aika"
            options={[{ value: 'kausi', label: 'kausi' }]}
          />
        </Grid>
        <div className={styles.buttonRow}>
          <Button color="supplementary" onClick={() => closeModal()}>
            Peruuta
          </Button>
          <Button
            type="submit"
            className={styles.alignRight}
            disabled={isSubmitting}
          >
            Tallenna
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default EditBerthPricingForm;
