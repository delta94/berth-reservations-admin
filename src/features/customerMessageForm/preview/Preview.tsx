import React from 'react';

import styles from './preview.module.scss';

export interface PreviewProps {
  html: string;
}

const Preview = ({ html }: PreviewProps) => {
  return (
    <div className={styles.preview}>
      <iframe title="PreviewModal" className={styles.iframe} src={'data:text/html,' + encodeURIComponent(html)} />
    </div>
  );
};

export default Preview;
