import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import { WINTER_STORAGE_APPLICATIONS } from './__generated__/WINTER_STORAGE_APPLICATIONS';

interface WinterStorageAreaChoice {
  winterStorageAreaName: string;
  winterStorageArea: string;
  priority: number;
}

export type WinterStorageApplication = {
  id: string;
  queue: number | null;
  status: ApplicationStatus;
  createdAt: string;
  municipality: string;
  customerId?: string;
  boatType?: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatName: string;
  boatModel: string;
  choices: WinterStorageAreaChoice[];
};

export const getWinterStorageApplicationData = (
  data: WINTER_STORAGE_APPLICATIONS | undefined
): WinterStorageApplication[] => {
  if (!data || !data.winterStorageApplications) {
    return [];
  }

  return data.winterStorageApplications.edges.reduce<WinterStorageApplication[]>((acc, edge) => {
    if (!edge || !edge.node) {
      return acc;
    }
    const application = edge.node;
    const applicationData: WinterStorageApplication = {
      id: application.id,
      queue: null, // TODO: populate from query once available
      status: application.status,
      createdAt: application.createdAt,
      municipality: application.municipality,
      customerId: application.customer?.id,
      boatType: data.boatTypes?.find(({ id }) => id === application.boatType)?.name,
      boatRegistrationNumber: application.boatRegistrationNumber,
      boatWidth: application.boatWidth,
      boatLength: application.boatLength,
      boatName: application.boatName,
      boatModel: application.boatModel,
      choices:
        application.winterStorageAreaChoices?.map((choice) => {
          return {
            priority: choice?.priority ?? Number.MAX_VALUE,
            winterStorageAreaName: choice?.winterStorageAreaName ?? '',
            winterStorageArea: choice?.winterStorageAreaName ?? '',
          };
        }) ?? [],
    };
    return [...acc, applicationData];
  }, []);
};
