import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react';
import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import styles from '../editForm.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import FormTypeTitle from '../FormTypeTitle';
import { WinterStoragePrice } from '../../winterStoragePricing/WinterStoragePricing';

const areaOptions = ['Kaisaniemi'];
const periodOptions = ['season', 'month', 'year'];

export const getWinterStorageValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    area: Yup.string().oneOf(areaOptions).required(t('forms.common.errors.required')),
    privateCustomer: Yup.number()
      .positive()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    company: Yup.number()
      .positive()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    period: Yup.string().oneOf(periodOptions).required(t('forms.common.errors.required')),
  });

const WinterStorageFields: FunctionComponent = () => {
  const { t } = useTranslation();
  const { errors } = useFormikContext<WinterStoragePrice>();

  return (
    <>
      <div className={styles.row}>
        <FormTypeTitle label={t('common.terminology.dataEntry')} value={t('pricing.winterStorage.title')} />
      </div>
      <hr />
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="area"
          labelText={t('pricing.winterStorage.area')}
          options={areaOptions.map((option) => ({
            value: option,
            label: option,
          }))}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={TextInput}
          id="privateCustomer"
          name="privateCustomer"
          labelText={`${t('pricing.winterStorage.privateCustomer')} (€)`}
          invalid={!!errors.privateCustomer}
          helperText={errors.privateCustomer}
        />
        <Field
          required={true}
          as={TextInput}
          id="company"
          name="company"
          labelText={`${t('pricing.winterStorage.company')} (€)`}
          invalid={!!errors.company}
          helperText={errors.company}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="period"
          labelText={t('pricing.winterStorage.period')}
          options={periodOptions.map((option) => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default WinterStorageFields;
