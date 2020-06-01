export interface MessageTemplate {
  id: string;
  name: string;
}

export interface MessageFormValues {
  templateId: string;
  subject: string;
  message: string;
}
