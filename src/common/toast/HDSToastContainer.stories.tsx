import React, { useState } from 'react';

import HDSToastContainer from './HDSToastContainer';
import hdsToast from './hdsToast';

export default {
  component: HDSToastContainer,
  title: 'HDSToastContainer',
  decorators: [
    () => {
      const [count, setCount] = useState(0);
      return (
        <div style={{ padding: '2em', width: '100vw', height: '100vh' }}>
          <HDSToastContainer />
          <button
            style={{ border: '1px solid black', padding: '1em' }}
            onClick={() => {
              hdsToast({ type: 'error', labelText: 'Test label', text: 'Test text', toastId: `toast-${count}` });
              setCount(count + 1);
            }}
          >
            Click to test toast
          </button>
        </div>
      );
    },
  ],
};

export const hdsToastContainer = () => undefined;

hdsToastContainer.story = {
  name: 'Default',
};
