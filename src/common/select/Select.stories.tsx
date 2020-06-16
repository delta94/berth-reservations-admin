import React, { useState } from 'react';

import Select from './Select';

export default {
  component: Select,
  title: 'Select',
  decorators: [
    (storyFn: Function) => {
      const [state, setState] = useState('foo');
      return storyFn({ value: state, onChange: setState });
    },
  ],
};

export const select = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <Select
    labelText="Foo"
    value={value}
    options={[
      { value: 'foo', label: 'Foo' },
      { value: 'bar', label: 'Bar' },
    ]}
    onChange={(e) => onChange(e.target.value)}
  />
);

select.story = {
  name: 'Default',
};
