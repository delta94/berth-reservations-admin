import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';
import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import styles from '../editForm.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import FormTypeTitle from '../FormTypeTitle';
import { HarborService } from '../../PricingPage';

const serviceOptions = ['mooring', 'electricity', 'water', 'wasteCollection', 'gate', 'lighting'];
const unitOptions = ['%', '€'];
const periodOptions = ['season', 'month', 'year'];

export const getHarborServicesValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    service: Yup.string().oneOf(serviceOptions).required(t('forms.common.errors.required')),
    price: Yup.number()
      .positive()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    unit: Yup.string()
      .oneOf(unitOptions)
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    period: Yup.string().oneOf(periodOptions).required(t('forms.common.errors.required')),
  });

const HarborServicesFields: FunctionComponent = () => {
  const { t } = useTranslation();
  const { errors } = useFormikContext<HarborService>();

  return (
    <>
      <div className={styles.row}>
        <FormTypeTitle label={t('common.terminology.dataEntry')} value={t('pricing.harborServices.title')} />
      </div>
      <hr />
      <Grid colsCount={1} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="service"
          labelText={t('pricing.harborServices.service')}
          options={serviceOptions.map((option) => ({
            value: option,
            label: t([`common.terminology.${option}`]),
          }))}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={TextInput}
          id="price"
          name="price"
          labelText={t('pricing.harborServices.price')}
          invalid={!!errors.price}
          invalidText={errors.price}
        />
        <Field
          required={true}
          as={Select}
          name="unit"
          labelText={t('pricing.harborServices.unit')}
          options={unitOptions.map((option) => ({
            value: option,
            label: option,
          }))}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="period"
          labelText={t('pricing.harborServices.period')}
          options={periodOptions.map((option) => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default HarborServicesFields;
