import { BERTH_APPLICATIONS } from './__generated__/BERTH_APPLICATIONS';

interface HarborChoice {
  harbor: string;
  harborName: string;
  priority: number;
}

export interface ApplicationData {
  id: string;
  isSwitch: boolean;
  queue: number | null;
  createdAt: string;
  municipality: string;
  status: string | null;
  lease: string;
  boatType?: string | null;
  boatRegistrationNumber: string;
  boatWidth: string;
  boatLength: string;
  boatDraught: string | null;
  boatWeight: string | null;
  boatName: string;
  boatModel: string;
  harborChoices: Array<HarborChoice | null>;
  accessibilityRequired: boolean;
}

export const formatDate = (date: string, locale = 'fi') =>
  new Date(date).toLocaleString(locale);

export const getBerthApplicationData = (
  data: BERTH_APPLICATIONS | undefined
): ApplicationData[] => {
  const boatTypes = data?.boatTypes;

  return (
    data?.berthApplications?.edges.reduce<ApplicationData[]>(
      (acc, application) => {
        if (application?.node) {
          const {
            id,
            berthSwitch,
            createdAt,
            municipality,
            status,
            boatDraught,
            boatRegistrationNumber,
            boatModel,
            boatName,
            boatWidth,
            boatLength,
            boatType,
            boatWeight,
            harborChoices = [],
            accessibilityRequired,
          } = application.node;

          const applicationData = {
            id,
            isSwitch: !!berthSwitch,
            queue: null,
            createdAt,
            municipality,
            status,
            lease: '', //TODO: replace it with the actual data when https://helsinkisolutionoffice.atlassian.net/browse/VEN-348 is implemented.
            boatRegistrationNumber,
            boatModel,
            boatName,
            boatWidth: `${boatWidth} m`,
            boatLength: `${boatLength} m`,
            boatDraught: boatDraught ? `${boatDraught} m` : null,
            boatWeight: boatWeight ? `${boatWeight} kg` : null,
            boatType: boatTypes?.find(({ id }) => id === boatType)?.name,
            harborChoices: harborChoices || [],
            accessibilityRequired,
          };
          return [...acc, applicationData];
        }
        return acc;
      },
      []
    ) ?? []
  );
};