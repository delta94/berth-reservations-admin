import { Boat, LargeBoat } from '../types';

const LARGE_BOAT_ID = '8';

export const isLargeBoat = (boat: LargeBoat | Boat): boat is LargeBoat =>
  (boat as LargeBoat).boatType.id === LARGE_BOAT_ID;
