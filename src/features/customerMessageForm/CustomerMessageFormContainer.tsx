import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CustomerMessageForm } from './CustomerMessageForm';
import { NOTIFICATION_TEMPLATES_QUERY } from './queries';
import { NOTIFICATION_TEMPLATES } from './__generated__/NOTIFICATION_TEMPLATES';
import { getNotificationTemplates } from './utils';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
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
  const [previewHtml, setPreviewHtml] = useState<string | undefined>(undefined);

  if (loading || !data?.notificationTemplates) return <LoadingSpinner isLoading={true} />;

  const notificationTemplates = getNotificationTemplates(data);

  const templateOptions = notificationTemplates.map(({ id, type }) => {
    return {
      value: id,
      label: type,
    };
  });

  const getPreviewHtml = (templateId: string) =>
    notificationTemplates.find((template) => {
      return template.id === templateId;
    })?.preview || undefined;

  const handlePreview = (templateId: string) => {
    setPreviewHtml(getPreviewHtml(templateId));
  };

  const onSubmit = (message: MessageFormValues) => {
    alert(`CustomerIds: ${JSON.stringify(selectedCustomerIds)} content: ${JSON.stringify(message)}`);
    handleSendMessage();
  };

  return (
    <>
      <CustomerMessageForm
        handleCancel={closeModal}
        handleCancelPreview={() => setPreviewHtml(undefined)}
        handlePreview={handlePreview}
        handleSendMessage={onSubmit}
        previewHtml={previewHtml}
        recipientCount={selectedCustomerIds.length}
        templateOptions={templateOptions}
      />
    </>
  );
};

export default CustomerMessageFormContainer;
