import React from 'react';

import LabelValuePair from './LabelValuePair';

export default {
  component: LabelValuePair,
  title: 'LabelValuePair',
};

const dummyProps = { label: 'foo', value: 'bar' };

export const labelValuePair = () => <LabelValuePair {...dummyProps} />;

labelValuePair.story = {
  name: 'Default',
};

export const branded = () => <LabelValuePair {...dummyProps} labelColor="brand" />;

export const rightAligned = () => <LabelValuePair label="foo" align="right" value={'bar'} labelColor="brand" />;

export const labelless = () => <LabelValuePair value="bar" valueColor="critical" />;
