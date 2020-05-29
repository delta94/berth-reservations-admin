import { OrganizationType } from '../../@types/__generated__/globalTypes';

export interface MessageTemplate {
  id: string;
  name: string;
}

export interface MessageFormValues {
  templateId: string;
  subject: string;
  message: string;
}

export interface CustomerData {
  address?: string;
  berths?: string;
  boats?: string;
  city?: string;
  email?: string;
  id: string;
  invoice?: string;
  name: string;
  organizationType?: OrganizationType;
  phone?: string;
  postalCode?: string;
  startDate?: string;
}
