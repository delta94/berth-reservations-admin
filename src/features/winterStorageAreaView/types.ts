export type Map = {
  id: string;
  url: string;
};

export type WinterStorageArea = {
  electricity: boolean;
  water: boolean;
  gate: boolean;
  summerStorageForBoats: boolean;
  summerStorageForTrailers: boolean;
  summerStorageForDockingEquipment: boolean;
  name: string;
  zipCode: string;
  municipality: string | null;
  streetAddress: string | null;
  wwwUrl: string;
  imageFile: string | null;
  maps: Map[];
  numberOfCustomers: number;
};

export type Lease = {
  id: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicationId: string;
  applicationDate: string;
};

export type WinterStoragePlace = {
  id: string;
  identifier: string;
  number: number;
  isActive: boolean;
  width: number;
  length: number;
  leases?: Lease[];
};

export type WinterStorageSection = {
  identifier: string;
};

export type MarkedWinterStorage = {
  places: WinterStoragePlace[];
  sections: WinterStorageSection[];
};

export type UnmarkedWinterStorage = {
  leases: Lease[];
};
