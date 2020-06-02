import { ChipProps } from '../../common/chip/Chip';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';

type ApplicationStatusType = {
  [key in ApplicationStatus]: {
    label: string;
    color: ChipProps['color'];
  };
};

export const APPLICATION_STATUS: ApplicationStatusType = {
  PENDING: { label: 'applicationList.status.pending', color: 'yellow' },
  OFFER_GENERATED: {
    label: 'applicationList.status.offerGenerated',
    color: 'blue',
  },
  OFFER_SENT: { label: 'applicationList.status.offerSent', color: 'green' },
  HANDLED: { label: 'applicationList.status.handled', color: 'blue' },
  EXPIRED: { label: 'applicationList.status.expired', color: 'grey' },
  NO_SUITABLE_BERTHS: { label: 'applicationList.status.noSuitable', color: 'red' },
  NO_SUITABLE_BERTHS_NOTIFIED: {
    label: 'applicationList.status.noSuitableNotified',
    color: 'orange',
  },
};
