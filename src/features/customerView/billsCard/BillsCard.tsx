import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import Section from '../../../common/section/Section';
import styles from './billsCard.module.scss';
import { Bill, isBerthBill } from '../utils';
import { getProductServiceTKey } from '../../../common/utils/translations';
import { formatDate, formatPrice } from '../../../common/utils/format';
import Button from '../../../common/button/Button';

export interface BillsCardProps {
  bills: Bill[];
  handleShowBill(bill: Bill): void;
}

const BillsCard = ({ bills, handleShowBill }: BillsCardProps) => {
  const { t, i18n } = useTranslation();

  const renderBill = (bill: Bill, id: number) => {
    const { contractPeriod } = bill;

    return (
      <div key={id}>
        <Section title={t('customerView.customerBill.berthRental')}>
          {isBerthBill(bill) && (
            <LabelValuePair
              label={t('customerView.customerBill.berthPlace')}
              value={
                bill.berthInformation.harborName +
                ' ' +
                bill.berthInformation.pierIdentifier +
                ' ' +
                bill.berthInformation.number
              }
            />
          )}
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
            value={formatPrice(bill.basePrice, i18n.language, bill.basePriceTaxPercentage)}
          />
          {bill.orderLines.map((orderLine, id) => (
            <LabelValuePair
              align="right"
              label={t(getProductServiceTKey(orderLine.product))}
              value={formatPrice(orderLine.price, i18n.language, orderLine.taxPercentage)}
              key={id}
            />
          ))}
        </Section>
        <Section className={styles.feesSection}>
          <LabelValuePair
            align="right"
            label={t('customerView.customerBill.total')}
            value={formatPrice(bill.totalPrice, i18n.language, bill.totalPriceTaxPercentage)}
          />
        </Section>
        <Button variant="secondary" theme="coat" onClick={() => handleShowBill(bill)} className={styles.button}>
          {t('customerView.customerBill.showInvoice')}
        </Button>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader title={t('customerView.customerBill.title')} />
      <CardBody>
        {bills.length > 0 ? bills.map((bill, id) => renderBill(bill, id)) : t('customerView.customerBill.noBill')}
      </CardBody>
    </Card>
  );
};

export default BillsCard;
