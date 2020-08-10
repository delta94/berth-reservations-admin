import { Harbor } from '../../types';
import { HARBOR_FORM, HARBOR_FORM_harbor_properties as HARBOR_PROPERTIES } from '../__generated__/HARBOR_FORM';
import { PersistedFile } from '../../../../../common/fileList/FileList';

export const getHarbor = (harborData: HARBOR_FORM | undefined): Harbor | undefined => {
  if (!harborData || !harborData.harbor || !harborData.harbor.properties) {
    return undefined;
  }

  const { name, streetAddress, zipCode, municipality, wwwUrl, imageFile, maps } = harborData.harbor.properties;

  const getImageFile = (imageFile: string | null): undefined | PersistedFile => {
    if (imageFile === null) {
      return undefined;
    }

    return {
      id: '0',
      name: imageFile,
      markedForDeletion: false,
    };
  };

  const getMaps = (maps: HARBOR_PROPERTIES['maps']) =>
    maps.reduce<PersistedFile[]>((acc, map) => {
      if (map === null) return acc;

      return acc.concat({
        id: map.id,
        name: map.url,
        markedForDeletion: false,
      });
    }, []);

  return {
    name: name || '',
    streetAddress: streetAddress || '',
    zipCode,
    municipality: municipality || '',
    wwwUrl,
    existingImageFile: getImageFile(imageFile),
    addedImageFile: undefined,
    existingMaps: getMaps(maps),
    addedMaps: [],
  };
};

export const mapValuesToMutation = (harborId: string, values: Harbor) => {
  const {
    name,
    streetAddress,
    zipCode,
    municipality,
    wwwUrl,
    addedImageFile,
    existingMaps = [],
    addedMaps = [],
  } = values;

  const removeMapFiles = existingMaps.filter((map) => map.markedForDeletion).map((map) => map.id);

  return {
    id: harborId,
    name,
    streetAddress,
    zipCode,
    municipalityId: (municipality as string).toLowerCase(),
    wwwUrl,
    ...(addedImageFile && { imageFile: addedImageFile }),
    ...(addedMaps.length > 0 && { addMapFiles: addedMaps }),
    ...(removeMapFiles.length > 0 && { removeMapFiles }),
  };
};
