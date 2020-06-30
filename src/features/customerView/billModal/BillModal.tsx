import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react/lib';

import Modal, { ModalProps } from '../../../common/modal/Modal';
import { Bill, isBerthBill } from '../utils';
import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import { formatDate, formatPrice } from '../../../common/utils/format';
import { getOrderStatusTKey, getProductServiceTKey } from '../../../common/utils/translations';
import Text from '../../../common/text/Text';
import styles from './billModal.module.scss';

interface BillModalProps extends Omit<ModalProps, 'children' | 'isOpen'> {
  bill?: Bill;
}

const BillModal = ({ bill, toggleModal, ...modalProps }: BillModalProps) => {
  const { t, i18n } = useTranslation();

  if (!bill) {
    return null;
  }

  const { contractPeriod } = bill;
  return (
    <Modal isOpen={true} {...modalProps}>
      <Text as="h4" color="brand" className={styles.heading}>
        {t('customerView.customerBill.bill')}
      </Text>

      <Section>
        <LabelValuePair
          label={t('customerView.customerBill.billType')}
          value={
            isBerthBill(bill)
              ? t('customerView.customerBill.berthBill')
              : t('customerView.customerBill.winterStorageBill')
          }
        />
        {isBerthBill(bill) ? (
          <LabelValuePair
            label={t('customerView.customerBill.berthPlace')}
            value={`${bill.berthInformation.harborName} ${bill.berthInformation.pierIdentifier} ${bill.berthInformation.number}`}
          />
        ) : (
          'Placeholder'
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
        <LabelValuePair label={t('customerView.customerBill.status')} value={t(getOrderStatusTKey(bill.status))} />
      </Section>

      <hr className={styles.divider} />

      <Section>
        <LabelValuePair
          label={t('customerView.customerBill.basicFee')}
          value={formatPrice(bill.basePrice, i18n.language, bill.basePriceTaxPercentage)}
        />
        {bill.orderLines.map((orderLine, id) => (
          <LabelValuePair
            label={t(getProductServiceTKey(orderLine.product))}
            value={formatPrice(orderLine.price, i18n.language, orderLine.taxPercentage)}
            key={id}
          />
        ))}
      </Section>

      <hr className={styles.divider} />

      <Section>
        <LabelValuePair
          label={t('customerView.customerBill.total')}
          value={formatPrice(bill.totalPrice, i18n.language, bill.totalPriceTaxPercentage)}
        />
      </Section>

      <div className={styles.closeButtonContainer}>
        <Button theme="coat" onClick={() => toggleModal?.(false)}>
          {t('customerView.customerBill.closeModal')}
        </Button>
      </div>
    </Modal>
  );
};

export default BillModal;
