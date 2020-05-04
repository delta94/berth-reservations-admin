import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from '../modals.module.scss';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import FormTypeTitle from '../FormTypeTitle';

const WinterStoragePricingFields: FunctionComponent = () => {
  const { t } = useTranslation();

  const areaOptions = ['Kaisaniemi'];
  const periodOptions = ['season', 'month', 'year'];

  return (
    <>
      <FormTypeTitle
        label={t('common.terminology.dataEntry')}
        value={t('pricing.winterStorage.title')}
      />
      <hr />
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="area"
          name="area"
          labelText={t('pricing.winterStorage.area')}
          options={areaOptions.map(option => ({
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
        />
        <Field
          required={true}
          as={TextInput}
          id="company"
          name="company"
          labelText={`${t('pricing.winterStorage.company')} (€)`}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="period"
          labelText={t('pricing.winterStorage.period')}
          options={periodOptions.map(option => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default WinterStoragePricingFields;
