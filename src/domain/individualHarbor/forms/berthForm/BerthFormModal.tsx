import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../../../../common/modal/Modal';
import BerthForm from './BerthForm';
import { BerthFormProps } from './types';

const BerthFormModal: React.FC<BerthFormProps> = props => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={true} label={t('forms.berth.title')}>
      <BerthForm {...props} />
    </Modal>
  );
};

export default BerthFormModal;
