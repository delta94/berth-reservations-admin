export type Lease = {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type BerthData = {
  id: string;
  harborId: string;
  harbor: string;
  pier: string;
  berth: string | number;
  berthId: string;
  width: number | null;
  length: number | null;
  draught: number | null;
  mooringType: string;
  leases: Lease[];
  comment: string;
  properties: {
    lighting: boolean | null;
    water: boolean | null;
    gate: boolean | null;
    electricity: boolean | null;
    wasteCollection: boolean | null;
    isAccessible: boolean | null;
  };
};

export type PierTab = {
  label: string;
  value: string;
  disabled: boolean;
};
