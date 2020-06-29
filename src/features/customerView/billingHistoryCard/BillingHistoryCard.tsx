import React from 'react';
import { useTranslation } from 'react-i18next';

import { Bill, isBerthBill } from '../utils';
import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import Section from '../../../common/section/Section';
import Grid from '../../../common/grid/Grid';
import CardBody from '../../../common/cardBody/CardBody';
import { formatDate, formatPrice } from '../../../common/utils/format';
import Text from '../../../common/text/Text';
import styles from './billingHistoryCard.module.scss';
import Chip, { ChipProps } from '../../../common/chip/Chip';
import { getOrderStatusTKey } from '../../../common/utils/translations';
import { OrderStatus } from '../../../@types/__generated__/globalTypes';

interface BillingHistoryProps {
  bills: Bill[];
  onClick(bill: Bill): void;
}

const BillingHistoryCard = ({ bills, onClick }: BillingHistoryProps) => {
  const billStatusToChipColor = (billStatus: OrderStatus): ChipProps['color'] => {
    switch (billStatus) {
      case OrderStatus.WAITING:
        return 'orange';
      case OrderStatus.PAID:
        return 'green';
      case OrderStatus.EXPIRED:
        return 'red';
      case OrderStatus.REJECTED:
        return 'grey';
    }
  };

  const { t, i18n } = useTranslation();
  return (
    <Card>
      <CardHeader title={t('customerView.billingHistory.title')} />
      <CardBody>
        {bills.length > 0 ? (
          <Section title={t('customerView.billingHistory.sectionTitle')}>
            <Grid colsCount={4}>
              {bills.map((bill, id) => (
                <React.Fragment key={id}>
                  <button onClick={() => onClick(bill)} className={styles.gridItem}>
                    <Text color="brand">
                      {isBerthBill(bill)
                        ? t('customerView.billingHistory.berthBill')
                        : t('customerView.billingHistory.winterStorageBill')}
                    </Text>
                  </button>
                  <div className={styles.gridItem}>
                    <Text>{formatDate(bill.dueDate, i18n.language)}</Text>
                  </div>
                  <div className={styles.gridItem}>
                    <Text>{formatPrice(bill.totalPrice, i18n.language)}</Text>
                  </div>
                  <Chip color={billStatusToChipColor(bill.status)} label={t(getOrderStatusTKey(bill.status))} />
                </React.Fragment>
              ))}
            </Grid>
          </Section>
        ) : (
          t('customerView.billingHistory.noBillingHistory')
        )}
      </CardBody>
    </Card>
  );
};

export default BillingHistoryCard;
