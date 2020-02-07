import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';

import Card from '../../../common/card/Card';
import styles from './berthsCard.module.scss';
import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';

interface Berth {
  id: string;
  address: string;
  valid: string;
  handleShowContract(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface BerthsCardProps {
  berths: Berth[];
}

const BerthsCard: React.SFC<BerthsCardProps> = ({ berths }) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.berthsCard}>
      <CardHeader title={t('individualCustomer.berths.title')} />
      {berths.map(({ id, address, valid, handleShowContract }) => (
        <CardBody key={id}>
          <Button
            color="supplementary"
            onClick={handleShowContract}
            className={styles.button}
          >
            {t('individualCustomer.berths.showContract')}
          </Button>
          <Section title={t('individualCustomer.berths.berth')}>
            <LabelValuePair
              label={t('individualCustomer.berths.portAndPlace')}
              value={address}
            />
            <LabelValuePair
              label={t('individualCustomer.berths.valid')}
              value={valid}
            />
          </Section>
        </CardBody>
      ))}
    </Card>
  );
};

export default BerthsCard;
