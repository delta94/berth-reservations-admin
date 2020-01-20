import React from 'react';

import styles from './loadingSpinner.module.scss';

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingSpinner: React.SFC<Props> = ({ isLoading, children }) => {
  if (isLoading === true) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }
  return <>{children}</>;
};

export default LoadingSpinner;
