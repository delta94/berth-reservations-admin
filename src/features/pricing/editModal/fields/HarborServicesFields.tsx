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
import { HarborService } from '../../harborServicePricing/HarborServicePricing';
import { PeriodType, PriceUnits, ProductServiceType } from '../../../../@types/__generated__/globalTypes';
import { getPeriodTKey, getProductServiceTKey, getPriceUnits } from '../../../../common/utils/translations';

const serviceOptions = Object.values(ProductServiceType);
const unitOptions = Object.values(PriceUnits);
const periodOptions = Object.values(PeriodType);

export const getHarborServicesValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    service: Yup.string().oneOf(serviceOptions).required(t('forms.common.errors.required')),
    price: Yup.number()
      .positive()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    unit: Yup.string().oneOf(unitOptions).typeError(t('forms.common.errors.numberType')),
    period: Yup.string().oneOf(periodOptions),
  });

const HarborServicesFields = () => {
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
          id="service"
          name="service"
          label={t('pricing.harborServices.service')}
          options={serviceOptions.map((option) => ({
            value: option,
            label: t(getProductServiceTKey(option)),
          }))}
          disabled
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={TextInput}
          id="price"
          name="price"
          label={t('pricing.harborServices.price')}
          invalid={!!errors.price}
          helperText={errors.price}
        />
        <Field
          as={Select}
          id="unit"
          name="unit"
          label={t('pricing.harborServices.unit')}
          options={unitOptions.map((option) => ({
            value: option,
            label: getPriceUnits(option),
          }))}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          as={Select}
          id="period"
          name="period"
          label={t('pricing.harborServices.period')}
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

export default HarborServicesFields;
