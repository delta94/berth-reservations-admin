import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Select from '../../../common/select/Select';
import styles from './tableTools.module.scss';
import Modal from '../../../common/modal/Modal';
import { CustomerMessageForm } from './CustomerMessageForm';
import { MessageFormValues } from '../types';

export interface TableToolsProps<T> {
  className?: string;
  searchVal: string | undefined;
  searchBy: T;
  searchByOptions: Array<{ value: T; label: string }>;
  setSearchVal(val: string): void;
  setSearchBy(val: T): void;
  handleSendMessage?: (message: MessageFormValues) => void;
}

const TableTools = <T extends string>({
  className,
  searchVal,
  searchBy,
  searchByOptions,
  setSearchVal,
  setSearchBy,
  handleSendMessage,
}: TableToolsProps<T>) => {
  const { t } = useTranslation();
  const [messageModalOpen, setMessageModalOpen] = useState<boolean>(false);

  return (
    <div className={classNames(styles.tableTools, className)}>
      <div>
        <Button onClick={() => setMessageModalOpen(true)} variant="secondary" theme="black">
          {t('customers.message.new')}
        </Button>
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
      {messageModalOpen && (
        <Modal isOpen={messageModalOpen} toggleModal={() => setMessageModalOpen(false)}>
          <CustomerMessageForm handleSendMessage={handleSendMessage} closeModal={() => setMessageModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default TableTools;
