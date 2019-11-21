import React from 'react';

import Grid from './Grid';

export default {
  component: Grid,
  title: 'Grid',
};

const Child = () => (
  <div
    style={{
      background: 'grey',
      border: 'solid 2px black',
      height: '200px',
      width: '200px',
    }}
  />
);

export const grid = () => (
  <Grid>
    <Child />
    <Child />
    <Child />
  </Grid>
);

grid.story = {
  name: 'Default',
};

export const fourColumns = () => (
  <Grid colsCount={4}>
    <Child />
    <Child />
    <Child />
    <Child />
    <Child />
    <Child />
  </Grid>
);
