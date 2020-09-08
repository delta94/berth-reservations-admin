import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import {
  UNMARKED_WINTER_STORAGE_APPLICATIONS,
  UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node_winterStorageAreaChoices as CHOICE,
} from './__generated__/UNMARKED_WINTER_STORAGE_APPLICATIONS';

interface UnmarkedWinterStorageChoice {
  winterStorageAreaName: string;
  winterStorageArea: string;
}

export type UnmarkedWinterStorageNotice = {
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
  choice: UnmarkedWinterStorageChoice;
};

export const getUnmarkedWinterStorageNotice = (
  data: UNMARKED_WINTER_STORAGE_APPLICATIONS | undefined
): UnmarkedWinterStorageNotice[] => {
  if (!data || !data.winterStorageApplications) {
    return [];
  }

  return data.winterStorageApplications.edges.reduce<UnmarkedWinterStorageNotice[]>((acc, edge) => {
    if (!edge || !edge.node) {
      return acc;
    }
    const application = edge.node;

    const choices = application.winterStorageAreaChoices;
    const choice: UnmarkedWinterStorageChoice =
      choices !== null && choices.length > 0 && choices[0] !== null
        ? {
            winterStorageArea: (choices[0] as CHOICE).winterStorageArea || '',
            winterStorageAreaName: (choices[0] as CHOICE).winterStorageArea || '',
          }
        : {
            winterStorageArea: 'Virhe',
            winterStorageAreaName: 'Virhe',
          };

    const applicationData: UnmarkedWinterStorageNotice = {
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
      choice,
    };
    return [...acc, applicationData];
  }, []);
};
