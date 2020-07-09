import { INDIVIDUAL_HARBOR_harbor_properties as HarborProperties } from './__generated__/INDIVIDUAL_HARBOR';

interface PierProps {
  electricity: boolean;
  gate: boolean;
  lighting: boolean;
  water: boolean;
  wasteCollection: boolean;
}

export type IndividualHarborData = {
  id: string;
} & Pick<
  HarborProperties,
  | 'name'
  | 'numberOfPlaces'
  | 'numberOfFreePlaces'
  | 'streetAddress'
  | 'zipCode'
  | 'municipality'
  | 'wwwUrl'
  | 'imageFile'
  | 'servicemapId'
  | 'maxWidth'
> &
  PierProps;

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

export type Berth = {
  id: string;
  isActive: boolean;
  number: number;
  identifier: string;
  length: number;
  width: number;
  depth: number | null;
  mooringType: string;
  comment: string;
  leases?: Lease[];
};

export type Pier = {
  id: string;
  identifier: string;
  electricity: boolean;
  wasteCollection: boolean;
  water: boolean;
  lighting: boolean;
  gate: boolean;
  suitableBoatTypes: string[];
};

export type Map = {
  id: string;
  url: string;
};
