import { HARBORS } from './__generated__/HARBORS';

export interface HarborData {
  electricity: number;
  gate: number;
  lighting: number;
  wasteCollection: number;
  water: number;
  name: string;
  numberOfPlaces: number;
}

export const getHarborsData = (data: HARBORS | undefined) => {
  if (data && data.harbors && data.harbors.edges) {
    return data.harbors.edges.reduce<HarborData[]>((acc, harbor) => {
      if (harbor && harbor.node && harbor.node.properties) {
        const properties = harbor.node.properties.piers.edges.reduce<{
          electricity: number;
          gate: number;
          lighting: number;
          wasteCollection: number;
          water: number;
        }>(
          (prev, pier) => {
            if (pier && pier.node && pier.node.properties) {
              return {
                electricity: pier.node.properties.electricity
                  ? prev.electricity + 1
                  : prev.electricity,
                gate: pier.node.properties.gate ? prev.gate + 1 : prev.gate,
                lighting: pier.node.properties.lighting
                  ? prev.lighting + 1
                  : prev.lighting,
                wasteCollection: pier.node.properties.wasteCollection
                  ? prev.wasteCollection + 1
                  : prev.wasteCollection,
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
        return [
          ...acc,
          {
            name: harbor.node.properties.name || '-',
            numberOfPlaces: harbor.node.properties.numberOfPlaces || 0,
            ...properties,
          },
        ];
      }
      return acc;
    }, []);
  }
  return [];
};
