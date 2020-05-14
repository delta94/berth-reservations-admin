import { INDIVIDUAL_HARBOR } from '../../../__generated__/INDIVIDUAL_HARBOR';
import { Harbor } from '../types';

export const getHarbor = (harborData: INDIVIDUAL_HARBOR | undefined): Harbor | undefined => {
  if (!harborData || !harborData.harbor || !harborData.harbor.properties) {
    return undefined;
  }

  const { name, streetAddress, zipCode, municipality, wwwUrl, imageFile } = harborData.harbor.properties;

  const getImageFile = (imageFile: string | null) => {
    if (imageFile !== null) {
      return {
        imageFile: new File([], imageFile),
      };
    }
  };

  return {
    name: name || '',
    streetAddress: streetAddress || '',
    zipCode,
    municipality: municipality || '',
    wwwUrl,
    ...getImageFile(imageFile),
  };
};
