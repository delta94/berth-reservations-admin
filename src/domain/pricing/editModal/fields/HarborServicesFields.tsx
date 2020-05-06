import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from '../editModal.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import FormTypeTitle from '../FormTypeTitle';

const HarborServicesFields: FunctionComponent = () => {
  const { t } = useTranslation();

  const serviceOptions = [
    'mooring',
    'electricity',
    'water',
    'wasteCollection',
    'gate',
    'lighting',
  ];
  const unitOptions = ['%', '€'];
  const periodOptions = ['season', 'month', 'year'];

  return (
    <>
      <FormTypeTitle
        label={t('common.terminology.dataEntry')}
        value={t('pricing.harborServices.title')}
      />
      <hr />
      <Grid colsCount={1} className={styles.row}>
        <Field
          required={true}
          as={Select}
          name="service"
          labelText={t('pricing.harborServices.service')}
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
          labelText={t('pricing.harborServices.price')}
        />
        <Field
          required={true}
          as={Select}
          name="unit"
          labelText={t('pricing.harborServices.unit')}
          options={unitOptions.map(option => ({
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
          options={periodOptions.map(option => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default HarborServicesFields;
