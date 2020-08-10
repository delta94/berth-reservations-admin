export type Map = {
  id: string;
  url: string;
};

export interface WinterStorageAreaData {
  electricity: number;
  gate: number;
  id: string;
  imageFile: string | null;
  maps: Map[];
  maxWidth: number | null;
  municipality: string | null;
  name: string | null;
  numberOfFreePlaces: number;
  numberOfPlaces: number;
  streetAddress: string | null;
  summerStorageForDockingEquipment: number;
  summerStorageForTrailers: number;
  water: number;
  wwwUrl: string;
  zipCode: string;
}
