import React from 'react';
import { TextInput } from 'hds-react';
import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import styles from '../editForm.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import { formatDimension } from '../../../../common/utils/format';
import FormTypeTitle from '../FormTypeTitle';
import { BerthPrice } from '../../berthPricing/BerthPricing';
import { PeriodType } from '../../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../../common/utils/translations';

const widthOptions = [2, 2.5, 2.75, 3, 4, 5, 5.5, 6, 7];
const periodOptions = [PeriodType.SEASON, PeriodType.MONTH, PeriodType.YEAR];

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

const BerthsFields = () => {
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
          id="width"
          name="width"
          label={t('pricing.berths.width')}
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
          helperText={errors.privateCustomer}
        />
        <Field
          required={true}
          as={TextInput}
          id="company"
          name="company"
          labelText={`${t('pricing.berths.company')} (€)`}
          invalid={!!errors.company}
          helperText={errors.company}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="period"
          name="period"
          label={t('pricing.berths.period')}
          options={periodOptions.map((option) => ({
            value: option,
            label: t(getPeriodTKey(option)),
          }))}
        />
      </Grid>
    </>
  );
};

export default BerthsFields;
