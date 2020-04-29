export interface Boat {
  id: string;
  boatType: { id: string; name: string | null };
  registrationNumber: string;
  width: number;
  length: number;
  draught: number | null;
  weight: number | null;
  name: string;
  model: string;
}

export interface LargeBoat extends Boat {
  propulsion: string;
  hullMaterial: string;
  boatIsInspected: boolean;
  boatIsInsured: boolean;
}
