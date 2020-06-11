import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import IconWrapper from './IconWrapper';
import { IconBoat } from '../icons';

const Wrapper = ({ children, size }: { children: React.ReactChild; size: string }) => (
  <div
    style={{
      margin: '10px',
      width: size,
      height: size,
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
  >
    {children}
  </div>
);

const makeSvgStyleRules = (color: string) => ({
  fill: color,
  padding: '10px',
});

export default {
  component: IconWrapper,
  title: 'IconWrapper',
  decorators: [
    (storyFn: Function) => (
      <>
        <div style={makeSvgStyleRules('#333')}>{storyFn()}</div>
        <div style={{ background: '#333', ...makeSvgStyleRules('#fff') }}>{storyFn()}</div>
      </>
    ),
    withKnobs,
  ],
};

export const iconWrapper = () => (
  <Wrapper size="200px">
    <IconWrapper
      outlined={boolean('Outlined', false, 'Icon')}
      icon={IconBoat}
      size={select('Size', ['xs', 's', 'm', 'l', 'xl'], 's', 'Icon')}
      color={select('Color', ['standard', 'disabled', 'brand', 'secondary'], 'standard', 'Icon')}
    />
  </Wrapper>
);
