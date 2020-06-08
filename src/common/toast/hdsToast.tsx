import React from 'react';
import { DismissableNotification, DismissableNotificationProps } from 'hds-react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import i18n from '../../locales/i18n';
import { HDSToastContainerId } from './HDSToastContainer';

interface HDSToastArgs {
  type: DismissableNotificationProps['type'];
  labelText: string;
  text: string;
  toastId?: string;
  translated?: boolean;
}

interface DismissableNotificationWrapperProps extends HDSToastArgs {
  toastId: string;
  translated: boolean;
}

const DismissableNotificationWrapper: React.FC<DismissableNotificationWrapperProps> = ({
  type,
  labelText,
  text,
  toastId,
  translated,
}) => {
  const { t } = useTranslation();
  return (
    <DismissableNotification
      type={type}
      closeButtonLabelText={t('common.closeToast')}
      labelText={translated ? t(labelText) : labelText}
      onClose={() => toast.dismiss(toastId)}
    >
      {translated ? t(text) : text}
    </DismissableNotification>
  );
};

const hdsToast = ({ type, labelText, text, toastId, translated = false }: HDSToastArgs) => {
  const id = toastId ?? uuidv4();
  return toast(
    <DismissableNotificationWrapper
      type={type}
      labelText={labelText}
      text={text}
      toastId={id}
      translated={translated}
    />,
    {
      toastId: id,
      containerId: HDSToastContainerId,
    }
  );
};

hdsToast.graphQLErrors = (errors: ReadonlyArray<GraphQLError>) => {
  errors.forEach((error) =>
    hdsToast({
      type: 'error',
      labelText:
        error.extensions?.code && i18n.exists(`toast.graphQLErrors.${error.extensions.code}.label`)
          ? `toast.graphQLErrors.${error.extensions?.code}.label`
          : 'toast.graphQLErrors.default.label',
      text:
        error.extensions?.code && i18n.exists(`toast.graphQLErrors.${error.extensions.code}.description`)
          ? `toast.graphQLErrors.${error.extensions?.code}.description`
          : 'toast.graphQLErrors.default.description',
      translated: true,
    })
  );
};

export default hdsToast;
