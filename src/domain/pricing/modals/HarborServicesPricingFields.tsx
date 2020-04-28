import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';

import styles from './modals.module.scss';
import Grid from '../../../common/grid/Grid';
import Select from '../../../common/select/Select';
import { HarborService } from '../PricingPage';

export interface HarborServicesPricingFieldsProps {
  placeholder?: null;
  initialValues: HarborService;
}

const HarborServicesPricingFields: FunctionComponent<HarborServicesPricingFieldsProps> = () => {
  return (
    <>
      <div className={styles.row}>
        <TextInput
          id="baz"
          labelText="Tietue"
          value="Satamapalvelut"
          disabled
        />
      </div>
      <hr />
      <Grid colsCount={1} className={styles.row}>
        <Select
          labelText="Palvelu"
          value={'Vesi'}
          options={['Vesi'].map(option => {
            return { value: option, label: option };
          })}
          onChange={() => console.log('Test')}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <TextInput id="foo" labelText="Hinta (€)" value="2" />
        <Select
          labelText="Yksikkö"
          value={'%'}
          options={['%', '€'].map(option => {
            return { value: option, label: option };
          })}
          onChange={() => console.log('Test')}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <Select
          labelText="Aika"
          value={'Kausi'}
          options={[{ value: 'Kausi', label: 'Kausi' }]}
          onChange={() => console.log('Test')}
        />
      </Grid>
    </>
  );
};

export default HarborServicesPricingFields;
