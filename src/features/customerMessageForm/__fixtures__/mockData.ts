import { NOTIFICATION_TEMPLATES } from '../__generated__/NOTIFICATION_TEMPLATES';
import { NotificationTemplateLanguage } from '../../../@types/__generated__/globalTypes';

export const mockHtml =
  // eslint-disable-next-line max-len
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="fi" xml:lang="fi"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width"><title>Test HTML</title></head><body><h1>Test HTML</h1><p>Test HTML</p></body></html>';

export const mockData: NOTIFICATION_TEMPLATES = {
  notificationTemplates: {
    edges: [
      {
        node: {
          id: 'Tm90aWZpY2F0aW9uVGVtcGxhdGVOb2RlOjE=',
          preview: mockHtml,
          translations: [
            {
              bodyHtml: mockHtml,
              bodyText: '',
              languageCode: NotificationTemplateLanguage.EN,
              preview: mockHtml,
              subject: 'Confirmation: Berth application',
              __typename: 'NotificationTranslationType',
            },
            {
              bodyHtml: mockHtml,
              bodyText: '',
              languageCode: NotificationTemplateLanguage.SV,
              preview: mockHtml,
              subject: 'Bekräftelse: båtplatsansökning',
              __typename: 'NotificationTranslationType',
            },
            {
              bodyHtml: mockHtml,
              bodyText: '',
              languageCode: NotificationTemplateLanguage.FI,
              preview: mockHtml,
              subject: 'Vahvistus: venepaikan hakemus',
              __typename: 'NotificationTranslationType',
            },
          ],
          type: 'berth_application_created',
          __typename: 'NotificationTemplateNode',
        },
        __typename: 'NotificationTemplateNodeEdge',
      },
      {
        node: {
          id: 'Tm90aWZpY2F0aW9uVGVtcGxhdGVOb2RlOjI=',
          preview: mockHtml,
          translations: [
            {
              bodyHtml: mockHtml,
              bodyText: '',
              languageCode: NotificationTemplateLanguage.FI,
              preview: mockHtml,
              subject: 'Vahvistus: Veneen talvisäilytyspaikan hakemus',
              __typename: 'NotificationTranslationType',
            },
            {
              bodyHtml: mockHtml,
              bodyText: '',
              languageCode: NotificationTemplateLanguage.SV,
              preview: mockHtml,
              subject: 'Bekräftelse: ansökan om vinteruppläggningsplats',
              __typename: 'NotificationTranslationType',
            },
            {
              bodyHtml: mockHtml,
              bodyText: '',
              languageCode: NotificationTemplateLanguage.EN,
              preview: mockHtml,
              subject: 'Confirmation: boat winter storage application',
              __typename: 'NotificationTranslationType',
            },
          ],
          type: 'winter_storage_application_created',
          __typename: 'NotificationTemplateNode',
        },
        __typename: 'NotificationTemplateNodeEdge',
      },
    ],
    __typename: 'NotificationTemplateNodeConnection',
  },
};
