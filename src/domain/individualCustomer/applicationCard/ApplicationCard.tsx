import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import Paragraph from '../../../common/paragraph/Paragraph';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import styles from './applicationCard.module.scss';
import Grid from '../../../common/grid/Grid';
import Checkbox from '../../../common/checkbox/Checkbox';

interface Port {
  id: string;
  title: string;
}

export interface ApplicationCardProps {
  applicationType: string;
  receivedDate: string;
  queueNumber: number;
  status: string;
  boatType: string;
  registrationNumber: string;
  boatWidth: string;
  boatLength: string;
  boatDepth: string;
  boatWeight: string;
  boatName: string;
  boatBrand: string;
  selectedPorts: Port[];
  accessible: boolean;
}

const ApplicationCard: React.SFC<ApplicationCardProps> = ({
  applicationType,
  receivedDate,
  queueNumber,
  status,
  boatType,
  registrationNumber,
  boatWidth,
  boatLength,
  boatDepth,
  boatWeight,
  boatName,
  boatBrand,
  selectedPorts,
  accessible,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      title={t('individualCustomer.application.title')}
      className={styles.applicationCard}
    >
      <Grid colsCount={3}>
        <Paragraph title={t('individualCustomer.application.application')}>
          <LabelValuePair
            label={t('individualCustomer.application.applicationType')}
            value={applicationType}
          />
          <LabelValuePair
            label={t('individualCustomer.application.receivedDate')}
            value={receivedDate}
          />
          <LabelValuePair
            label={t('individualCustomer.application.queueNumber')}
            value={`${queueNumber}`}
          />
          <LabelValuePair
            label={t('individualCustomer.application.status')}
            value={status}
          />
        </Paragraph>
        <div>
          <Paragraph title={t('individualCustomer.application.boatInfo')}>
            <LabelValuePair
              label={t('individualCustomer.application.boatType')}
              value={boatType}
            />
            <LabelValuePair
              label={t('individualCustomer.application.registrationNumber')}
              value={registrationNumber}
            />
          </Paragraph>
          <Paragraph>
            <LabelValuePair
              label={t('individualCustomer.application.boatWidth')}
              value={boatWidth}
            />
            <LabelValuePair
              label={t('individualCustomer.application.boatLength')}
              value={boatLength}
            />
            <LabelValuePair
              label={t('individualCustomer.application.boatDepth')}
              value={boatDepth}
            />
            <LabelValuePair
              label={t('individualCustomer.application.boatWeight')}
              value={boatWeight}
            />
          </Paragraph>
          <Paragraph>
            <LabelValuePair
              label={t('individualCustomer.application.boatName')}
              value={boatName}
            />
            <LabelValuePair
              label={t('individualCustomer.application.boatBrand')}
              value={boatBrand}
            />
          </Paragraph>
        </div>
        <div>
          <Paragraph title={t('individualCustomer.application.selectedPorts')}>
            {selectedPorts.map(({ title }, i) => (
              <LabelValuePair
                key={i}
                label={`${t('individualCustomer.application.choice')} ${i + 1}`}
                value={title}
              />
            ))}
          </Paragraph>
          <Paragraph>
            <Checkbox
              label={t('individualCustomer.application.accessible')}
              checked={accessible}
              disabled
              readOnly
            />
          </Paragraph>
        </div>
      </Grid>
    </Card>
  );
};

export default ApplicationCard;
