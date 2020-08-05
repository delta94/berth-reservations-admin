import { CustomerGroup, OrganizationType } from '../../@types/__generated__/globalTypes';

export interface MessageTemplate {
  id: string;
  name: string;
}

export interface MessageFormValues {
  templateId: string;
  subject: string;
  message: string;
}

export interface Organization {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  businessId: string;
  organizationType: OrganizationType;
}

export interface CustomerData {
  address?: string;
  city?: string;
  email?: string;
  id: string;
  name: string;
  organization: Organization | null;
  phone?: string;
  postalCode?: string;
  comment: string | null;
  berthsColumnData: string;
  billsColumnData: string;
  boatsColumnData: string;
  boats: CustomerListBoat[];
  applications: CustomerListApplication[];
  berthLeases: CustomerListBerthLeases[];
  customerGroup: CustomerGroup | null;
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
