import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CustomerMessageForm } from './CustomerMessageForm';
import { NOTIFICATION_TEMPLATES_QUERY } from './queries';
import { NOTIFICATION_TEMPLATES } from './__generated__/NOTIFICATION_TEMPLATES';
import { getNotificationTemplates } from './utils';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import Modal from '../../common/modal/Modal';
import Preview from './preview/Preview';
import { MessageFormValues } from './types';

export interface CustomerMessageFormContainerProps {
  closeModal: () => void;
  handleSendMessage: () => void;
  selectedCustomerIds: string[];
}

const CustomerMessageFormContainer = ({
  closeModal,
  handleSendMessage,
  selectedCustomerIds,
}: CustomerMessageFormContainerProps) => {
  const { data, loading } = useQuery<NOTIFICATION_TEMPLATES>(NOTIFICATION_TEMPLATES_QUERY);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  if (loading || !data?.notificationTemplates) return <LoadingSpinner isLoading={true} />;

  const notificationTemplates = getNotificationTemplates(data);

  const handlePreview = (id: string) => {
    setPreview(
      notificationTemplates.find((template) => {
        return template.id === id;
      })?.preview || undefined
    );
  };

  const onSubmit = (message: MessageFormValues) => {
    alert(`CustomerIds: ${JSON.stringify(selectedCustomerIds)} content: ${JSON.stringify(message)}`);
    handleSendMessage();
  };

  return (
    <>
      <CustomerMessageForm
        templates={notificationTemplates}
        handleCancel={closeModal}
        handlePreview={handlePreview}
        handleSendMessage={onSubmit}
      />
      {preview && (
        <Modal isOpen={true} toggleModal={() => setPreview(undefined)}>
          <Preview preview={preview} handleCancel={() => setPreview(undefined)} />
        </Modal>
      )}
    </>
  );
};

export default CustomerMessageFormContainer;
