import React from 'react';
import { HashRouter } from 'react-router-dom';

import ActionHistoryCard from './ActionHistoryCard';

export default {
  component: ActionHistoryCard,
  title: 'ActionHistoryCard',
  decorators: [
    (storyFn: Function) => (
      <HashRouter>
        <div
          style={{
            padding: '20px',
            width: '600px',
          }}
        >
          {storyFn()}
        </div>
      </HashRouter>
    ),
  ],
};

export const actionHistoryCard = () => <ActionHistoryCard />;
