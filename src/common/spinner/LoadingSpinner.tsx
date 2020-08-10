import React from 'react';

import styles from './loadingSpinner.module.scss';

export interface LoadingSpinnerProps {
  children?: React.ReactNode;
  isLoading: boolean;
}

const LoadingSpinner = ({ isLoading, children }: LoadingSpinnerProps) => {
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
