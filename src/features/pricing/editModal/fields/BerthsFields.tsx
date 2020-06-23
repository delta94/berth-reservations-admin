import React from 'react';
import { TextInput } from 'hds-react';
import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import styles from '../editForm.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import FormTypeTitle from '../FormTypeTitle';
import { BerthPrice } from '../../berthPricing/BerthPricing';
import { PeriodType } from '../../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../../common/utils/translations';
import { calcCompanyPrice } from '../../utils';

export const getBerthsValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t('forms.common.errors.required')),
    privateCustomer: Yup.number()
      .positive()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    company: Yup.number().positive().typeError(t('forms.common.errors.numberType')),
    period: Yup.string().oneOf(Object.values(PeriodType)),
  });

const BerthsFields = () => {
  const { t } = useTranslation();
  const { values, errors } = useFormikContext<BerthPrice>();

  return (
    <>
      <div className={styles.row}>
        <FormTypeTitle label={t('common.terminology.dataEntry')} value={t('pricing.berths.title')} />
      </div>
      <hr />
      <Grid colsCount={2} className={styles.row}>
        <Field as={TextInput} id="name" name="name" labelText={t('pricing.berths.width')} readOnly />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={TextInput}
          id="privateCustomer"
          name="privateCustomer"
          labelText={`${t('pricing.berths.privateCustomer')} (€)`}
          invalid={!!errors.privateCustomer}
          helperText={errors.privateCustomer}
        />
        <Field
          as={TextInput}
          id="company"
          name="company"
          labelText={`${t('pricing.berths.company')} (€)`}
          invalid={!!errors.company}
          helperText={errors.company}
          value={values.privateCustomer ? calcCompanyPrice(values.privateCustomer) : ''}
          readOnly
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          as={Select}
          id="period"
          name="period"
          label={t('pricing.berths.period')}
          options={Object.values(PeriodType).map((option) => ({
            value: option,
            label: t(getPeriodTKey(option)),
          }))}
          disabled
        />
      </Grid>
    </>
  );
};

export default BerthsFields;
