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
  city?: string;
  email?: string;
  id: string;
  name: string;
  organizationType?: OrganizationType;
  phone?: string;
  postalCode?: string;
  comment: string | null;
  berthsColumnData: string;
  billsColumnData: string;
  boatsColumnData: string;
  boats: CustomerListBoat[];
  applications: CustomerListApplication[];
  berthLeases: CustomerListBerthLeases[];
}

export interface CustomerListBerthLeases {
  id: string;
  title: string;
}

export interface CustomerListWinterStoragePlaces {
  id: string;
  title: string;
}

export interface CustomerListBoat {
  id: string;
  name: string;
}

export interface CustomerListApplication {
  id: string;
  createdAt: string;
}

export interface CustomerListBill {
  id: string;
  date: string;
}
