import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Select from '../../../common/select/Select';
import styles from './customerListTableTools.module.scss';
import Modal from '../../../common/modal/Modal';
import Text from '../../../common/text/Text';
import { CustomerMessageForm } from './CustomerMessageForm';
import { MessageFormValues } from '../types';

export interface CustomerListTableToolsProps<T> {
  className?: string;
  searchVal: string | undefined;
  searchBy: T;
  searchByOptions: Array<{ value: T; label: string }>;
  selectedRowsCount: number;
  handleSendMessage?: (message: MessageFormValues) => void;
  setSearchVal(val: string): void;
  setSearchBy(val: T): void;
  clearSelectedRows(): void;
}

const CustomerListTableTools = <T extends string>({
  className,
  searchVal,
  searchBy,
  searchByOptions,
  setSearchVal,
  setSearchBy,
  handleSendMessage,
  selectedRowsCount,
  clearSelectedRows,
}: CustomerListTableToolsProps<T>) => {
  const { t } = useTranslation();
  const [messageModalOpen, setMessageModalOpen] = useState<boolean>(false);

  return (
    <div className={classNames(styles.tableTools, className)}>
      <div className={styles.tableToolsLeft}>
        <Button
          onClick={() => setMessageModalOpen(true)}
          variant="secondary"
          theme="coat"
          disabled={selectedRowsCount <= 0}
        >
          {selectedRowsCount <= 0 ? t('customerList.message.selectRows') : t('customerList.message.new')}
        </Button>
        {selectedRowsCount > 0 && (
          <>
            <Text color="gray">
              {selectedRowsCount === 1
                ? t('customerList.message.selectedRowsSingular', { selectedRowsCount })
                : t('customerList.message.selectedRowsPlural', { selectedRowsCount })}
            </Text>
            <button onClick={clearSelectedRows}>
              <Text color="brand">{t('customerList.message.clearSelectedRows')}</Text>
            </button>
          </>
        )}
      </div>
      <div className={styles.tableToolsRight}>
        <Select
          className={styles.select}
          onChange={(e) => setSearchBy(e.target.value as T)}
          value={searchBy}
          options={searchByOptions}
          required
        />
        <TextInput
          className={styles.searchInput}
          id="searchSimilarCustomers"
          value={searchVal}
          onChange={(e) => setSearchVal((e.target as HTMLInputElement).value)}
        />
      </div>
      <Modal isOpen={messageModalOpen} toggleModal={() => setMessageModalOpen(false)}>
        <CustomerMessageForm handleSendMessage={handleSendMessage} closeModal={() => setMessageModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default CustomerListTableTools;
