import { Harbor } from '../../types';
import { FileContainer } from '../../../../../common/fileUpload/FileUpload';
import { HARBOR_FORM, HARBOR_FORM_harbor_properties as HARBOR_PROPERTIES } from '../__generated__/HARBOR_FORM';

export const getHarbor = (harborData: HARBOR_FORM | undefined): Harbor | undefined => {
  if (!harborData || !harborData.harbor || !harborData.harbor.properties) {
    return undefined;
  }

  const { name, streetAddress, zipCode, municipality, wwwUrl, imageFile, maps } = harborData.harbor.properties;

  const getImageFile = (imageFile: string | null): undefined | FileContainer => {
    if (imageFile === null) {
      return undefined;
    }

    return {
      name: imageFile,
      markedForDeletion: false,
    };
  };

  const getMaps = (maps: HARBOR_PROPERTIES['maps']) =>
    maps.reduce((acc: FileContainer[], map) => {
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
    imageFile: getImageFile(imageFile),
    maps: getMaps(maps),
  };
};

export const mapValuesToMutation = (harborId: string, values: Harbor) => {
  const { name, streetAddress, zipCode, municipality, wwwUrl, imageFile, maps } = values;

  const { addMapFiles, removeMapFiles } = (maps || []).reduce(
    (acc: { addMapFiles: File[]; removeMapFiles: string[] }, map) => {
      if (map.markedForDeletion) {
        return {
          ...acc,
          removeMapFiles: acc.removeMapFiles.concat(map.id as string),
        };
      }

      if (map.data !== undefined) {
        return {
          ...acc,
          addMapFiles: acc.addMapFiles.concat(map.data),
        };
      }

      return acc;
    },
    { addMapFiles: [], removeMapFiles: [] }
  );

  return {
    id: harborId,
    name,
    streetAddress,
    zipCode,
    municipalityId: (municipality as string).toLowerCase(),
    wwwUrl,
    ...(imageFile?.data && {
      imageFile: imageFile.data,
    }),
    ...(addMapFiles.length > 0 && { addMapFiles }),
    ...(removeMapFiles.length > 0 && { removeMapFiles }),
  };
};
