import { ApplicationDetailsProps } from '../cards/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { CustomerInfoCardProps } from '../cards/customerInfoCard/CustomerInfoCard';
import { FILTERED_CUSTOMERS } from './__generated__/FILTERED_CUSTOMERS';
import { CustomerData, CUSTOMER_GROUP } from './IndividualApplicationPage';

export const getCustomerInfoData = (
  berthApplication: BERTH_APPLICATION
): CustomerInfoCardProps => {
  const {
    firstName,
    lastName,
    address,
    zipCode,
    municipality,
    phoneNumber,
    email,
    customer,
  } = berthApplication;

  return {
    customerId: customer?.id,
    firstName,
    lastName,
    primaryAddress: { address, postalCode: zipCode, city: municipality },
    phone: phoneNumber,
    email,
  };
};

interface Lease {
  id: string;
  harborName: string;
  harborId: string;
}

export const getApplicationDetailsData = (
  berthApplication: BERTH_APPLICATION,
  boatTypes: BOAT_TYPES[]
): ApplicationDetailsProps => {
  const harborChoices = berthApplication.harborChoices || [];
  const lease = berthApplication.lease
    ? {
        harborId:
          berthApplication.lease.berth?.pier.properties?.harbor.id || '',
        harborName:
          berthApplication.lease.berth?.pier.properties?.harbor.properties
            ?.name || '',
        id: berthApplication.lease.id,
        pierIdentifier:
          berthApplication.lease.berth?.pier.properties?.identifier || '',
        berthNum: berthApplication.lease.berth?.number || '',
      }
    : null;

  return {
    ...berthApplication,
    isSwitch: !!berthApplication?.berthSwitch,
    queue: null,
    harborChoices,
    lease,
    boatType: boatTypes.find(({ id }) => id === berthApplication.boatType)
      ?.name,
  };
};

export const getFilteredCustomersData = (
  data?: FILTERED_CUSTOMERS
): CustomerData[] | null => {
  if (!data?.profiles) return null;

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    if (!edge?.node) return acc;
    const {
      id,
      firstName,
      lastName,
      primaryAddress,
      company,
      berthLeases,
    } = edge.node;

    const berths = berthLeases?.edges
      .map(edge => edge?.node?.berth?.pier.properties?.harbor.properties?.name)
      .join(', ');

    return [
      ...acc,
      {
        id,
        name: `${lastName}, ${firstName}`,
        city: primaryAddress?.city,
        address: primaryAddress?.address,
        customerGroup: company
          ? CUSTOMER_GROUP.COMPANY
          : CUSTOMER_GROUP.PRIVATE,
        berths,
      },
    ];
  }, []);
};
