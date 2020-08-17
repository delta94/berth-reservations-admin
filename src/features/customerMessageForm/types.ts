type Translation = {
  bodyHtml: string | null;
  bodyText: string | null;
  preview: string | null;
  subject: string | null;
};

export type NotificationTemplate = {
  id: string;
  preview: string | null;
  translations: { [languageCode: string]: Translation };
  type: string;
};

export interface MessageFormValues {
  templateId: string;
  subject: string;
  message: string;
}
