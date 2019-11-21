import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';

export const getIndividualHarborData = (
  data: INDIVIDUAL_HARBOR | undefined
) => {
  if (data && data.harbor && data.harbor.properties) {
    return { id: data.harbor.id, ...data.harbor.properties };
  }
  return null;
};
