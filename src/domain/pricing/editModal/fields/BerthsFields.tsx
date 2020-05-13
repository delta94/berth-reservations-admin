import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';
import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import styles from '../editForm.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import { formatDimension } from '../../../../common/utils/format';
import FormTypeTitle from '../FormTypeTitle';
import { BerthPrice } from '../../PricingPage';

const widthOptions = [2, 2.5, 2.75, 3, 4, 5, 5.5, 6, 7];
const periodOptions = ['season', 'month', 'year'];

export const getBerthsValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    width: Yup.number().oneOf(widthOptions).required(t('forms.common.errors.required')),
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

const BerthsFields: FunctionComponent = () => {
  const { t } = useTranslation();
  const { errors } = useFormikContext<BerthPrice>();

  return (
    <>
      <div className={styles.row}>
        <FormTypeTitle label={t('common.terminology.dataEntry')} value={t('pricing.berths.title')} />
      </div>
      <hr />
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="width"
          labelText={t('pricing.berths.width')}
          options={widthOptions.map((option) => ({
            value: option,
            label: formatDimension(option, 'fi'),
          }))}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={TextInput}
          id="privateCustomer"
          name="privateCustomer"
          labelText={`${t('pricing.berths.privateCustomer')} (€)`}
          invalid={!!errors.privateCustomer}
          invalidText={errors.privateCustomer}
        />
        <Field
          required={true}
          as={TextInput}
          id="company"
          name="company"
          labelText={`${t('pricing.berths.company')} (€)`}
          invalid={!!errors.company}
          invalidText={errors.company}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="period"
          labelText={t('pricing.berths.period')}
          options={periodOptions.map((option) => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default BerthsFields;
