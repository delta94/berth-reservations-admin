import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';

import styles from './customersTableTools.module.scss';

export interface CustomersTableToolsProps {
  handleLinkCustomer?(): void;
  handleCreateCustomer(): void;
}

const CustomersTableTools: React.SFC<CustomersTableToolsProps> = ({
  handleLinkCustomer,
  handleCreateCustomer,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.customersTableTools}>
      <Button
        disabled={!handleLinkCustomer}
        onClick={() => handleLinkCustomer?.()}
      >
        {t('individualApplication.customerTableTools.linkCustomer')}
      </Button>
      <Button
        color="supplementary"
        disabled={!handleCreateCustomer}
        onClick={() => handleCreateCustomer()}
      >
        {t('individualApplication.customerTableTools.createNewCustomer')}
      </Button>
    </div>
  );
};

export default CustomersTableTools;
