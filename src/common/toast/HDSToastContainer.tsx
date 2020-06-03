import React from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './hdsToastContainer.module.scss';

export const HDSToastContainerId = 'HDSToastContainer';

const HDSToastContainer: React.FC = () => {
  return (
    <ToastContainer
      closeButton={false}
      autoClose={false}
      hideProgressBar={true}
      closeOnClick={false}
      draggable={false}
      className={styles.container}
      containerId={HDSToastContainerId}
      enableMultiContainer={true}
    />
  );
};

export default HDSToastContainer;
