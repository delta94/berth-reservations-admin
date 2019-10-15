import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './app.module.scss';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p>{t('harbours_list.title')}</p>
      </header>
    </div>
  );
};

export default App;
