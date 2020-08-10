import {
  NOTIFICATION_TEMPLATES,
  NOTIFICATION_TEMPLATES_notificationTemplates_edges as NOTIFICATION_TEMPLATE_EDGE,
  NOTIFICATION_TEMPLATES_notificationTemplates_edges_node as NOTIFICATION_TEMPLATE_NODE,
  NOTIFICATION_TEMPLATES_notificationTemplates_edges_node_translations as TRANSLATIONS,
} from './__generated__/NOTIFICATION_TEMPLATES';
import { NotificationTemplate } from './types';

const mapTranslations = (translations: (TRANSLATIONS | null)[]): NotificationTemplate['translations'] => {
  return translations.reduce<NotificationTemplate['translations']>((acc, translation) => {
    if (translation === null) return acc;

    const { bodyHtml, bodyText, preview, subject } = translation;
    return {
      ...acc,
      [translation.languageCode]: {
        bodyHtml,
        bodyText,
        preview,
        subject,
      },
    };
  }, {});
};

export const getNotificationTemplates = (data: NOTIFICATION_TEMPLATES | undefined): NotificationTemplate[] => {
  return (
    data?.notificationTemplates?.edges.reduce<NotificationTemplate[]>((acc, notificationTemplate) => {
      const { id, preview, translations, type } = (notificationTemplate as NOTIFICATION_TEMPLATE_EDGE)
        .node as NOTIFICATION_TEMPLATE_NODE;

      const template: NotificationTemplate = {
        id,
        preview,
        translations: mapTranslations(translations),
        type,
      };

      return [...acc, template];
    }, []) ?? []
  );
};
