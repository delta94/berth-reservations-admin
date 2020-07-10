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
import { WinterStoragePrice } from '../../winterStoragePricing/WinterStoragePricing';
import { PeriodType } from '../../../../@types/__generated__/globalTypes';
import { getPeriodTKey } from '../../../../common/utils/translations';
import { calcCompanyPrice } from '../../utils';

const periodOptions = Object.values(PeriodType);

export const getWinterStorageValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    area: Yup.string().required(t('forms.common.errors.required')),
    privateCustomer: Yup.number()
      .positive()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    period: Yup.string().oneOf(periodOptions),
  });

const WinterStorageFields = () => {
  const { t } = useTranslation();
  const { values, errors } = useFormikContext<WinterStoragePrice>();

  return (
    <>
      <div className={styles.row}>
        <FormTypeTitle label={t('common.terminology.dataEntry')} value={t('pricing.winterStorage.title')} />
      </div>
      <hr />
      <Grid colsCount={2} className={styles.row}>
        <Field as={TextInput} id="area" name="area" label={t('pricing.winterStorage.area')} readOnly />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={TextInput}
          id="privateCustomer"
          name="privateCustomer"
          value={values.privateCustomer || ''}
          label={`${t('pricing.winterStorage.privateCustomer')} (€)`}
          invalid={!!errors.privateCustomer}
          helperText={errors.privateCustomer}
        />
        <Field
          as={TextInput}
          id="company"
          name="company"
          label={`${t('pricing.winterStorage.company')} (€)`}
          invalid={!!errors.company}
          helperText={errors.company}
          value={calcCompanyPrice(values.privateCustomer) || ''}
          readOnly
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          as={Select}
          id="period"
          name="period"
          label={t('pricing.winterStorage.period')}
          options={periodOptions.map((option) => ({
            value: option,
            label: t(getPeriodTKey(option)),
          }))}
          disabled
        />
      </Grid>
    </>
  );
};

export default WinterStorageFields;
