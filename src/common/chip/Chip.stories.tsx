import React from 'react';
import { storiesOf } from "@storybook/react";

import Chip from './Chip';

storiesOf("Oldlabels", module)
  .addParameters({
    abstract: {
      // Copy a collection or layer share url from Abstract
      url: "https://share.goabstract.com/900afdee-766a-4c39-b8d3-abd23a53c9eb?"
    }
  })
  // Name your stories after layers in the collection
  .add("atoms/text/labe&tag/warning", () => <Chip label="Lorem ipsum" color="yellow" />)
  .add("atoms/text/labe&tag/disabled", () => <Chip label="Lorem ipsum" color="grey" />)
  .add("atoms/text/labe&tag/success", () => <Chip label="Lorem ipsum" color="green" />)
  .add("atoms/text/labe&tag/info", () => <Chip label="Lorem ipsum" color="blue" />)
  .add("atoms/text/labe&tag/fail", () => <Chip label="Lorem ipsum" color="red" />)

  // https://share.goabstract.com/900afdee-766a-4c39-b8d3-abd23a53c9eb?collectionLayerId=2cc256ed-2d9d-4cf7-b32d-dcf7e527c4fe&mode=design

// Name your stories after layers in the collection
// export const blogIndex = () => <Harborsandberths {...dummyProps} />;
// export const tagWarning = () => <Chip label="Foo" color="blue" />;
// export const tagDisabled = () => <Chip label="Foo" color="blue" />;
// export const tagSuccess = () => <Chip label="Foo" color="blue" />;
// export const tagInfo = () => <Chip label="Foo" color="blue" />;

