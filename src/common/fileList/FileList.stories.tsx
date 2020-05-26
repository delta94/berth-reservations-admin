import React, { ReactChildren, useState } from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import FileList, { PersistedFile } from './FileList';

type StoryProps<T> = {
  value: T;
  onChange: (value: T) => void;
};

export default {
  component: FileList,
  title: 'FileList',
};

const Wrapper = ({ children }: { children: ReactChildren }) => (
  <div
    style={{
      padding: '20px',
      width: '600px',
    }}
  >
    {children}
  </div>
);

const mockFiles: PersistedFile[] = [
  {
    id: '1',
    name: 'Test file 1',
    markedForDeletion: false,
  },
  {
    id: '2',
    name: 'Test file 2',
    markedForDeletion: false,
  },
];

const getKnobs = (defaultLabel: string) => ({
  allowDelete: boolean('allowDelete', true),
  helperText: text('helperText', ''),
  invalid: boolean('invalid', false),
  label: text('label', defaultLabel),
  willBeOverwritten: boolean('willBeOverwritten', false),
});

export const singleFileListStory = (storyProps: StoryProps<undefined | PersistedFile>) => (
  <FileList name="default" {...getKnobs('Single file list')} {...storyProps} />
);

singleFileListStory.story = {
  name: 'Single file list',
  decorators: [
    (storyFn: Function) => {
      const [state, setState] = useState(mockFiles[0]);
      return (
        <Wrapper>
          {storyFn({
            value: state,
            onChange: setState,
          })}
        </Wrapper>
      );
    },
    withKnobs,
  ],
};

export const multipleFileListStory = (storyProps: StoryProps<PersistedFile[]>) => (
  <FileList name="default" multiple {...getKnobs('Multiple file list')} {...storyProps} />
);

multipleFileListStory.story = {
  name: 'Multiple file list',
  decorators: [
    (storyFn: Function) => {
      const [state, setState] = useState(mockFiles);
      return (
        <Wrapper>
          {storyFn({
            value: state,
            onChange: setState,
          })}
        </Wrapper>
      );
    },
    withKnobs,
  ],
};
