import React, { useState } from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import FileUpload from './FileUpload';

type StoryProps = {
  value: undefined | File | File[];
  onChange: (value: undefined | File | File[]) => void;
};

export default {
  component: FileUpload,
  title: 'FileUpload',
  decorators: [
    (storyFn: Function) => {
      const [state, setState] = useState();
      return (
        <div
          style={{
            padding: '20px',
            width: '600px',
          }}
        >
          {storyFn({
            value: state,
            onChange: setState,
          })}
        </div>
      );
    },
    withKnobs,
  ],
};

export const fileUploadStory = (storyProps: StoryProps) => <FileUpload name="default" {...storyProps} />;

fileUploadStory.story = {
  name: 'Default',
};

export const propKnobs = (storyProps: StoryProps) => (
  <FileUpload
    name="knobs"
    buttonProps={{
      color: select('buttonProps.color', ['primary', 'secondary', 'tertiary', 'supplementary'], 'supplementary'),
      size: select('buttonProps.size', ['default', 'small'], 'small'),
      label: text('buttonProps.label', ''),
    }}
    disabled={boolean('disabled', false)}
    label={text('label', '')}
    multiple={boolean('multiple', false)}
    maxSize={select(
      'maxSize',
      {
        none: undefined,
        '30 B': 30,
        '500 KB': 500 * 1000,
        '2 MB': 2 * 1000 * 1000,
      },
      undefined
    )}
    required
    {...storyProps}
  />
);
