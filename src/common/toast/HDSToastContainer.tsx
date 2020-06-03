import React from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './hdsToastContainer.module.scss';

const HDSToastContainer: React.FC = () => {
  return (
    <ToastContainer
      closeButton={false}
      autoClose={false}
      hideProgressBar={true}
      closeOnClick={false}
      draggable={false}
      className={styles.container}
    />
  );
};

export default HDSToastContainer;
