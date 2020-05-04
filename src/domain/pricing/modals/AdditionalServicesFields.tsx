import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from './modals.module.scss';
import Grid from '../../../common/grid/Grid';
import Select from '../../../common/select/Select';
import { formatPercentage } from '../../../common/utils/format';
import FormTypeField from './FormTypeField';

const AdditionalServicesFields: FunctionComponent = () => {
  const { t, i18n } = useTranslation();

  const serviceOptions = [
    'trawlerSummerStorage',
    'parkingPermit',
    'dinghyPlace',
  ];
  const taxOptions = [24];
  const periodOptions = ['season', 'month', 'year'];

  return (
    <>
      <FormTypeField
        label={t('common.terminology.dataEntry')}
        value={t('pricing.additionalServices.title')}
      />
      <hr />
      <Grid colsCount={1} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="service"
          name="service"
          labelText={t('pricing.additionalServices.service')}
          options={serviceOptions.map(option => ({
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
          labelText={`${t('pricing.additionalServices.price')} (€)`}
        />
        <Field
          required={true}
          as={Select}
          id="tax"
          name="tax"
          labelText={t('pricing.additionalServices.tax')}
          options={taxOptions.map(option => ({
            value: option,
            label: formatPercentage(option * 0.01, i18n.language),
          }))}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="period"
          name="period"
          labelText={t('pricing.additionalServices.period')}
          options={periodOptions.map(option => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default AdditionalServicesFields;
