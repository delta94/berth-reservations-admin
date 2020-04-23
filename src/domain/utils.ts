import { OrganizationType } from '../@types/__generated__/globalTypes';
import { CUSTOMER_GROUP } from './types';

export const mapCustomerGroup = (
  organization?: { organizationType: OrganizationType } | null
): CUSTOMER_GROUP => {
  if (organization === undefined || organization === null) {
    return CUSTOMER_GROUP.PRIVATE;
  }

  switch (organization.organizationType) {
    case OrganizationType.COMPANY:
      return CUSTOMER_GROUP.COMPANY;
    case OrganizationType.INTERNAL:
      return CUSTOMER_GROUP.INTERNAL;
    case OrganizationType.NON_BILLABLE:
      return CUSTOMER_GROUP.NON_BILLABLE;
    case OrganizationType.OTHER:
      return CUSTOMER_GROUP.OTHER_ORGANIZATION;
  }
};
