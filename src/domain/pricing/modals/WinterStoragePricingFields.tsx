import React, { FunctionComponent } from 'react';
import { TextInput } from 'hds-react/lib';

import styles from './modals.module.scss';
import Grid from '../../../common/grid/Grid';
import Select from '../../../common/select/Select';
import { HarborService, WinterStoragePrice } from '../PricingPage';

export interface WinterStoragePricingFieldsProps {
  test?: 'test';
  initialValues: WinterStoragePrice;
}

const WinterStoragePricingFields: FunctionComponent<WinterStoragePricingFieldsProps> = () => {
  return (
    <>
      <div className={styles.row}>
        <TextInput
          id="baz"
          labelText="Tietue"
          value="Talvisäilytyspaikka"
          disabled
        />
      </div>
      <hr />
      <Grid colsCount={1} className={styles.row}>
        <Select
          labelText="Alue"
          value={'Kaisaniemi'}
          options={['Kaisaniemi'].map(option => {
            return { value: option, label: option };
          })}
          onChange={() => console.log('Test')}
        />
      </Grid>
      <Grid colsCount={2} className={styles.row}>
        <TextInput id="foo" labelText="Yksityinen (€)" value="116,00" />
        <TextInput id="bar" labelText="Yritys (€)" value="236.00" />
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

export default WinterStoragePricingFields;
