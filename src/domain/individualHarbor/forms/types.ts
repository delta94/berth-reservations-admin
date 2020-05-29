import { PureQueryOptions } from 'apollo-client';

import { BerthMooringType } from '../../../@types/__generated__/globalTypes';
import { PersistedFile } from '../../../common/fileList/FileList';

export interface FormProps<T> {
  initialValues?: T;
  // Queries to refetch when mutations are run
  refetchQueries?: PureQueryOptions[];
  isSubmitting?: boolean;

  onCancel?(): void;
  onDelete?(deleted: T): void;
  onSubmit?(updated: T): void;
}

export type Berth = {
  number?: number;
  comment?: string;
  isActive?: boolean;
  mooringType?: BerthMooringType;
  width?: number;
  length?: number;
  depth?: number | null;
  pier?: string;
  pierId?: string;
};

export type BoatType = {
  id: string;
  name: string | null;
};

export type Pier = {
  identifier?: string;
  suitableBoatTypes?: string[];
  mooring?: boolean;
  wasteCollection?: boolean;
  lighting?: boolean;
  electricity?: boolean;
  water?: boolean;
  gate?: boolean;
  personalElectricity?: boolean;
};

export interface Harbor {
  name?: string;
  streetAddress?: string;
  zipCode?: string;
  municipality?: string;
  wwwUrl?: string;
  existingImageFile?: PersistedFile;
  addedImageFile?: File;
  existingMaps?: PersistedFile[];
  addedMaps?: File[];
}
