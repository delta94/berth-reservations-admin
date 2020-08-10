import { HARBORS } from './__generated__/HARBORS';
import { HarborData, Map } from './types';
import { BerthSummaryProps } from './berthSummary/BerthSummary';

export const getHarborsData = (data: HARBORS | undefined) => {
  if (data?.harbors?.edges) {
    return data.harbors.edges.reduce<HarborData[]>((acc, harbor) => {
      if (harbor?.node?.properties?.piers) {
        const properties = harbor.node.properties.piers.edges.reduce<{
          electricity: number;
          gate: number;
          lighting: number;
          wasteCollection: number;
          water: number;
        }>(
          (prev, pier) => {
            if (pier?.node?.properties) {
              return {
                electricity: pier.node.properties.electricity ? prev.electricity + 1 : prev.electricity,
                gate: pier.node.properties.gate ? prev.gate + 1 : prev.gate,
                lighting: pier.node.properties.lighting ? prev.lighting + 1 : prev.lighting,
                wasteCollection: pier.node.properties.wasteCollection ? prev.wasteCollection + 1 : prev.wasteCollection,
                water: pier.node.properties.water ? prev.water + 1 : prev.water,
              };
            }
            return prev;
          },
          {
            electricity: 0,
            gate: 0,
            lighting: 0,
            wasteCollection: 0,
            water: 0,
          }
        );

        const maps: Map[] = harbor.node.properties.maps.reduce<Map[]>((acc, map) => {
          if (map !== null) {
            return acc.concat({
              id: map.id,
              url: map.url,
            });
          }
          return acc;
        }, []);

        return [
          ...acc,
          {
            id: harbor.node.id,
            imageFile: harbor.node.properties.imageFile,
            maps,
            maxWidth: harbor.node.properties.maxWidth,
            municipality: harbor.node.properties.municipality,
            name: harbor.node.properties.name || '-',
            numberOfPlaces: harbor.node.properties.numberOfPlaces || 0,
            numberOfInactivePlaces: harbor.node.properties.numberOfInactivePlaces || 0,
            numberOfFreePlaces: harbor.node.properties.numberOfFreePlaces || 0,
            servicemapId: harbor.node.properties.servicemapId,
            streetAddress: harbor.node.properties.streetAddress,
            wwwUrl: harbor.node.properties.wwwUrl,
            zipCode: harbor.node.properties.zipCode,
            ...properties,
          },
        ];
      }
      return acc;
    }, []);
  }
  return [];
};

export const calculateBerthSummary = (
  data: { numberOfPlaces: number; numberOfInactivePlaces: number; numberOfFreePlaces: number }[]
): BerthSummaryProps => {
  if (data.length === 0) {
    return {};
  }

  return data.reduce(
    (acc, harbor) => {
      const berthCount = acc.berthCount + harbor.numberOfPlaces;
      const freeCount = acc.freeCount + harbor.numberOfFreePlaces;
      const otherCount = acc.otherCount + harbor.numberOfInactivePlaces;
      return {
        berthCount,
        freeCount,
        otherCount,
        reservedCount: berthCount - freeCount - otherCount,
      };
    },
    {
      berthCount: 0,
      freeCount: 0,
      otherCount: 0,
      reservedCount: 0,
    }
  );
};
