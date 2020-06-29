import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import Section from '../../../common/section/Section';
import styles from './billsCard.module.scss';
import { BerthBill } from '../utils';
import { getProductServiceTKey } from '../../../common/utils/translations';
import { formatDate } from '../../../common/utils/format';
import Button from '../../../common/button/Button';

export interface BillsCardProps {
  bills: BerthBill[];
  handleShowBill(event: React.MouseEvent<HTMLButtonElement>): void;
}

const BillsCard = ({ bills, handleShowBill }: BillsCardProps) => {
  const { t, i18n } = useTranslation();

  const formatPrice = (fee: number, percentage?: number) => {
    const formatter = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'EUR',
      minimumIntegerDigits: 2,
    });

    if (percentage) {
      return `${percentage}%\u00A0\u00A0${formatter.format(fee)}`;
    }
    return formatter.format(fee);
  };

  const renderBill = (bill: BerthBill, id: number) => {
    const { berthInformation, contractPeriod } = bill;
    return (
      <div key={id}>
        <Button variant="secondary" onClick={handleShowBill} className={styles.button}>
          {t('customerView.customerBill.showInvoice')}
        </Button>
        <Section title={t('customerView.customerBill.berthRental')}>
          <LabelValuePair
            label={t('customerView.customerBill.berthPlace')}
            value={`${berthInformation.harborName} ${berthInformation.pierIdentifier} ${berthInformation.number}`}
          />
          <LabelValuePair
            label={t('customerView.customerBill.contractPeriod')}
            value={`${formatDate(contractPeriod.startDate, i18n.language)} - ${formatDate(
              contractPeriod.endDate,
              i18n.language
            )}`}
          />
          <LabelValuePair
            label={t('customerView.customerBill.dueDate')}
            value={formatDate(bill.dueDate, i18n.language)}
          />
        </Section>
        <Section className={styles.feesSection}>
          <LabelValuePair
            align="right"
            label={t('customerView.customerBill.basicFee')}
            value={formatPrice(bill.basePrice, bill.basePriceTaxPercentage)}
          />
          {bill.orderLines.map((orderLine, id) => (
            <LabelValuePair
              align="right"
              label={t(getProductServiceTKey(orderLine.product))}
              value={formatPrice(orderLine.price, orderLine.taxPercentage)}
              key={id}
            />
          ))}
        </Section>
        <Section className={styles.feesSection}>
          <LabelValuePair
            align="right"
            label={t('customerView.customerBill.total')}
            value={formatPrice(bill.totalPrice, bill.totalPriceTaxPercentage)}
          />
        </Section>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader title={t('customerView.customerBill.title')} />
      {bills.length > 0 && <CardBody>{bills.map((bill, id) => renderBill(bill, id))}</CardBody>}
    </Card>
  );
};

export default BillsCard;
