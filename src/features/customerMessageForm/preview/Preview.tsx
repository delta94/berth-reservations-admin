import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './preview.module.scss';
import Button from '../../../common/button/Button';

export interface PreviewProps {
  preview: any;
  handleCancel: () => void;
}

const Preview = ({ handleCancel, preview }: PreviewProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.preview}>
      <iframe title="PreviewModal" className={styles.iframe} src={'data:text/html,' + encodeURIComponent(preview)} />
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={handleCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  );
};

export default Preview;
