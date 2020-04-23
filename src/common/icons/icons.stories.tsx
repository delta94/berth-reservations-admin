import path from 'path';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import Icon, { IconShapes } from './Icon';
import * as Icons from './index';

const Wrapper = ({ children, size }) => (
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

const stories = storiesOf('Icons', module);
stories.addDecorator(withKnobs);
stories.addDecorator(storyFn => (
  <>
    <div style={makeSvgStyleRules('#333')}>{storyFn()}</div>
    <div style={{ background: '#333', ...makeSvgStyleRules('#fff') }}>
      {storyFn()}
    </div>
  </>
));

const shapes: () => IconShapes[] = () => Object.keys(Icons) as IconShapes[];

stories.add('Icon', () => (
  <Wrapper size="200px">
    <Icon
      outlined={boolean('Outlined', false, 'Icon')}
      shape={select('Shape', shapes(), 'IconAccessibility', 'Icon')}
      size={select('Size', ['small', 'medium', 'large'], 'small', 'Icon')}
      color={select(
        'Color',
        ['standard', 'disabled', 'brand', 'secondary'],
        'standard',
        'Icon'
      )}
    />
  </Wrapper>
));

const req = require.context('.', false, /^.\/Icon.+.tsx$/);
req.keys().forEach(fileName => {
  const Component = req(fileName).default;
  const componentName = path.basename(fileName, '.tsx');
  Component.displayName = componentName;

  stories.add(componentName, () => (
    <>
      <Wrapper size="200px">{<Component />}</Wrapper>
      <Wrapper size="100px">{<Component />}</Wrapper>
      <Wrapper size="50px">{<Component />}</Wrapper>
      <Wrapper size="25px">{<Component />}</Wrapper>
    </>
  ));
});
