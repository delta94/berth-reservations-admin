import { PureQueryOptions } from 'apollo-client';

import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';

export interface FormProps<T> {
  onCancel?(): void;
  onDelete?(deleted: T): void;
  onCreate?(created: T): void;
  onUpdate?(updated: T): void;

  // Queries to refetch when mutations are run
  refetchQueries?: PureQueryOptions[];
}

export interface BerthFormProps extends FormProps<Berth> {
  berthId: string;
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
