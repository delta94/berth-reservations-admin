import path from 'path';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

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

const stories = storiesOf('Icons', module);
stories.addDecorator(withKnobs);
stories.addDecorator((storyFn) => (
  <>
    <div style={makeSvgStyleRules('#333')}>{storyFn()}</div>
    <div style={{ background: '#333', ...makeSvgStyleRules('#fff') }}>{storyFn()}</div>
  </>
));

const req = require.context('./berthReservations', false, /^.\/Icon.+.tsx$/);
req.keys().forEach((fileName) => {
  const Component = req(fileName).default;
  const componentName = path.basename(fileName, '.tsx');
  Component.displayName = componentName;

  stories.add(componentName, () => (
    <>
      <Component size="xs" />
      <Component size="s" />
      <Component size="m" />
      <Component size="l" />
      <Component size="xl" />
    </>
  ));
});
