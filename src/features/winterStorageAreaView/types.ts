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

export type WinterStorageCustomer = {
  id: string;
  name: string;
};
