import React from 'react';

import List from './List';
import ListItem from '../listItem/ListItem';

export default {
  component: List,
  title: 'List',
};

export const list = () => (
  <List>
    <ListItem>foo</ListItem>
    <ListItem>bar</ListItem>
  </List>
);

list.story = {
  name: 'Default',
};

export const ordered = () => (
  <List ordered>
    <ListItem>foo</ListItem>
    <ListItem>bar</ListItem>
  </List>
);

export const small = () => (
  <List size="small">
    <ListItem>foo</ListItem>
    <ListItem>bar</ListItem>
  </List>
);

export const large = () => (
  <List size="large">
    <ListItem>foo</ListItem>
    <ListItem>bar</ListItem>
  </List>
);

export const custom = () => (
  <List custom>
    <ListItem>foo</ListItem>
    <ListItem>bar</ListItem>
  </List>
);
