import { IdType } from 'react-table';

export const getSelectedRowIds = (selectedRowIds: Record<IdType<any>, boolean>) => {
  return Object.keys(selectedRowIds).filter((key) => selectedRowIds[key]);
};
