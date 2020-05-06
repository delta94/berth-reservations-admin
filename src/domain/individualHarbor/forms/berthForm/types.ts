import { PureQueryOptions } from 'apollo-client';

import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';

export interface FormProps<T> {
  onCancel?(): void;
  onDelete?(deleted: T): void;
  onSubmit?(updated: T): void;

  initialValues?: T;
  // Queries to refetch when mutations are run
  refetchQueries?: PureQueryOptions[];
  isSubmitting?: boolean;
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
