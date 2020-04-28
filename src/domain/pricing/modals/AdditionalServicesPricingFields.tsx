import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';

import styles from './modals.module.scss';
import Grid from '../../../common/grid/Grid';
import Select from '../../../common/select/Select';
import { AdditionalService } from '../PricingPage';

export interface AdditionalServicesPricingFieldsProps {
  placeholder?: null;
  initialValues: AdditionalService;
}

const AdditionalServicesPricingFields: FunctionComponent<AdditionalServicesPricingFieldsProps> = () => {
  return (
    <>
      <div className={styles.row}>
        <TextInput id="baz" labelText="Tietue" value="Lisäpalvelut" disabled />
      </div>
      <hr />
      <Grid colsCount={1} className={styles.row}>
        <Select
          labelText="Palvelu"
          value={'Pysäköintilupa'}
          options={['Pysäköintilupa'].map(option => {
            return { value: option, label: option };
          })}
          onChange={() => console.log('Test')}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <TextInput id="foo" labelText="Hinta (€)" value="2" />
        <Select
          labelText="ALV"
          value={'24 %'}
          options={['24 %', '12 %'].map(option => {
            return { value: option, label: option };
          })}
          onChange={() => console.log('Test')}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Select
          labelText="Aika"
          value={'1 kk'}
          options={[{ value: '1 kk', label: '1 kk' }]}
          onChange={() => console.log('Test')}
        />
      </Grid>
    </>
  );
};

export default AdditionalServicesPricingFields;
