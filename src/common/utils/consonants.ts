import { ChipProps } from '../../common/chip/Chip';
import { ApplicationStatus } from '../../../__generated__/globalTypes';

type ApplicationStatusType = {
  [key in ApplicationStatus]: {
    label: string;
    color: ChipProps['color'];
  };
};

export const APPLICATION_STATUS: ApplicationStatusType = {
  PENDING: { label: 'applications.status.pending', color: 'yellow' },
  OFFER_GENERATED: {
    label: 'applications.status.offerGenerated',
    color: 'blue',
  },
  OFFER_SENT: { label: 'applications.status.offerSent', color: 'green' },
  HANDLED: { label: 'applications.status.handled', color: 'blue' },
  EXPIRED: { label: 'applications.status.expired', color: 'grey' },
  NO_SUITABLE_BERTHS: { label: 'applications.status.noSuitable', color: 'red' },
  NO_SUITABLE_BERTHS_NOTIFIED: {
    label: 'applications.status.noSuitableNotified',
    color: 'orange',
  },
};
