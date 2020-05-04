import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from './modals.module.scss';
import Grid from '../../../common/grid/Grid';
import Select from '../../../common/select/Select';
import { formatDimension } from '../../../common/utils/format';
import FormTypeField from './FormTypeField';

const BerthsPricingFields: FunctionComponent = () => {
  const { t } = useTranslation();

  const berthWidthOptions = [2, 2.5, 2.75, 3, 4, 5, 5.5, 6, 7];
  const periodOptions = ['season', 'month', 'year'];

  return (
    <>
      <FormTypeField
        label={t('common.terminology.dataEntry')}
        value={t('pricing.berths.title')}
      />
      <hr />
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="width"
          name="width"
          labelText={t('pricing.berths.width')}
          options={berthWidthOptions.map(option => ({
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
        />
        <Field
          required={true}
          as={TextInput}
          id="company"
          name="company"
          labelText={`${t('pricing.berths.company')} (€)`}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Field
          required={true}
          as={Select}
          id="period"
          name="period"
          labelText={t('pricing.berths.period')}
          options={periodOptions.map(option => ({
            value: option,
            label: t([`common.periodTypes.${option}`]),
          }))}
        />
      </Grid>
    </>
  );
};

export default BerthsPricingFields;
