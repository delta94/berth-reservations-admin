import React, { useState } from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import FileUpload from './FileUpload';

type StoryProps<T> = {
  value: T;
  onChange: (value: T) => void;
};

export default {
  component: FileUpload,
  title: 'FileUpload',
};

const getKnobs = (defaultLabel: string) => ({
  buttonLabel: text('buttonLabel', ''),
  disabled: boolean('disabled', false),
  helperText: text('helperText', ''),
  invalid: boolean('invalid', false),
  labelText: text('labelText', defaultLabel),
  maxSize: select(
    'maxSize',
    {
      none: undefined,
      '30 B': 30,
      '500 KB': 500 * 1000,
      '2 MB': 2 * 1000 * 1000,
    },
    undefined
  ),
});

export const singleFileUploadStory = (storyProps: StoryProps<undefined | File>) => (
  <FileUpload id="default" {...getKnobs('Single file upload')} {...storyProps} />
);

singleFileUploadStory.story = {
  name: 'Single file upload',
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

export const multipleFileUploadStory = (storyProps: StoryProps<File[]>) => (
  <FileUpload id="default" multiple {...getKnobs('Multiple file upload')} {...storyProps} />
);

multipleFileUploadStory.story = {
  name: 'Multiple file upload',
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
