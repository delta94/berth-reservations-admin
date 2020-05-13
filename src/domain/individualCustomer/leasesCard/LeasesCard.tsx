import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';

import Card from '../../../common/card/Card';
import styles from './leasesCard.module.scss';
import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import InternalLink from '../../../common/internalLink/InternalLink';
import { formatDate } from '../../../common/utils/format';

interface Harbor {
  id: string;
  name: string;
}

export interface Lease {
  id: string;
  harbor: Harbor | null;
  berthNum: string | number;
  pierIdentifier: string | null;
  startDate: string;
  endDate: string;
}

export interface LeasesCardProps {
  leases: Lease[];
  handleShowContract(leaseId: string): void;
}

const LeasesCard: React.SFC<LeasesCardProps> = ({ leases, handleShowContract }) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('individualCustomer.leases.title')} />
      {leases?.map(({ id, pierIdentifier, harbor, berthNum, startDate, endDate }) => {
        const berthAddress = `${harbor?.name || ''} ${pierIdentifier || ''} ${berthNum}`;
        const leaseDate = `${formatDate(startDate, i18n.language)} - ${formatDate(endDate, i18n.language)}`;

        return (
          <CardBody key={id}>
            <Button color="supplementary" onClick={() => handleShowContract(id)} className={styles.button}>
              {t('individualCustomer.leases.showContract')}
            </Button>
            <Section title={t('individualCustomer.leases.berth')}>
              <LabelValuePair
                label={t('individualCustomer.leases.portAndPlace')}
                value={harbor ? <InternalLink to={`/harbors/${harbor.id}`}>{berthAddress}</InternalLink> : berthAddress}
              />
              <LabelValuePair label={t('individualCustomer.leases.valid')} value={leaseDate} />
            </Section>
          </CardBody>
        );
      })}
    </Card>
  );
};

export default LeasesCard;
