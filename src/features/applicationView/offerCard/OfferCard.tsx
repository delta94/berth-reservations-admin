import React, { useState } from 'react';
import { IconTrash } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { PureQueryOptions } from 'apollo-client';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Grid from '../../../common/grid/Grid';
import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import styles from './offerCard.module.scss';
import InternalLink from '../../../common/internalLink/InternalLink';
import { formatDimension, formatPrice } from '../../../common/utils/format';
import { BerthMooringType, ProductServiceType } from '../../../@types/__generated__/globalTypes';
import Property from '../../../common/property/Property';
import { IconFence, IconPlug, IconProps, IconStreetLight, IconWaterTap } from '../../../common/icons';
import Button from '../../../common/button/Button';
import { getProductServiceTKey } from '../../../common/utils/translations';
import Text from '../../../common/text/Text';
import Modal from '../../../common/modal/Modal';
import EditForm from './editForm/EditForm';

export interface Product {
  id: string;
  name: ProductServiceType;
  price: number;
  orderId: string;
}

export interface Order {
  id: string;
  price: number;
  totalPrice: number;
  fixedProducts: Product[];
  optionalProducts: Product[];
}

export interface LeaseDetails {
  id: string;
  berthComment: string;
  berthDepth: number | null;
  berthIsAccessible: boolean;
  berthLength: number | null;
  berthMooringType: BerthMooringType | null;
  berthNum: number | string;
  berthWidth: number | null;
  electricity: boolean;
  gate: boolean;
  harborName: string;
  lighting: boolean;
  pierIdentifier: string;
  wasteCollection: boolean;
  water: boolean;
  order: Order | null;
}

export interface OfferCardProps {
  leaseDetails: LeaseDetails;
  refetchQueries: PureQueryOptions[] | string[];
  handleDeleteLease: (id: string) => void;
}

const OfferCard = ({
  leaseDetails: {
    id,
    berthComment,
    berthDepth,
    berthIsAccessible,
    berthLength,
    berthMooringType,
    berthNum,
    berthWidth,
    electricity,
    gate,
    harborName,
    lighting,
    pierIdentifier,
    wasteCollection,
    water,
    order,
  },
  refetchQueries,
  handleDeleteLease,
}: OfferCardProps) => {
  const { t, i18n } = useTranslation();
  const isNotNull = (property: boolean | null): property is boolean => property !== null;
  const properties: {
    prop: boolean | null;
    key: string;
    icon: (props: IconProps) => React.ReactElement | null;
  }[] = [
    { prop: wasteCollection, key: 'waste', icon: IconTrash },
    { prop: electricity, key: 'electricity', icon: IconPlug },
    { prop: lighting, key: 'lighting', icon: IconStreetLight },
    { prop: gate, key: 'gate', icon: IconFence },
    { prop: water, key: 'water', icon: IconWaterTap },
  ];
  const [isEditing, setIsEditing] = useState(false);

  const selectedProducts =
    order?.optionalProducts.reduce<{ productId: string; orderId: string }[]>((acc, product) => {
      return acc.concat({ productId: product.id, orderId: product.orderId });
    }, []) ?? [];

  return (
    <>
      <Card className={styles.offerCard}>
        <CardHeader title={t('offer.title').toUpperCase()} />
        <CardBody>
          <Grid colsCount={3}>
            <Section title={t('common.terminology.berth').toUpperCase()}>
              <Section>
                <InternalLink to="/" underlined>
                  {[harborName, pierIdentifier, berthNum].filter(Boolean).join(' ')}
                </InternalLink>
              </Section>
              <Section>
                <div className={styles.berthProperties}>
                  {properties.map(
                    ({ prop, key, icon }) =>
                      isNotNull(prop) && (
                        <Property
                          className={styles.property}
                          key={key}
                          active={prop}
                          icon={icon}
                          label={t(`offer.berthDetails.${key}`)}
                        />
                      )
                  )}
                </div>
              </Section>
            </Section>
            <Section title={t('offer.berthDetails.title').toUpperCase()}>
              <Section>
                <LabelValuePair
                  label={t('offer.berthDetails.mooringType')}
                  value={t([`common.mooringTypes.${berthMooringType}`])}
                />
                <LabelValuePair
                  label={t('common.terminology.width')}
                  value={formatDimension(berthWidth, i18n.language)}
                />
                <LabelValuePair
                  label={t('common.terminology.length')}
                  value={formatDimension(berthLength, i18n.language)}
                />
                <LabelValuePair
                  label={t('common.terminology.depth')}
                  value={formatDimension(berthDepth, i18n.language)}
                />
              </Section>
              {berthIsAccessible && (
                <Section>
                  <span>{t('offer.berthDetails.accessible')}</span>
                </Section>
              )}
              <Section>
                <LabelValuePair
                  label={t('offer.berthDetails.maintenanceDetails')}
                  value={
                    <>
                      {/* TODO */}
                      <InternalLink to="/">123</InternalLink>
                      <br />
                      <InternalLink to="/">456</InternalLink>
                    </>
                  }
                />
                <LabelValuePair label={t('offer.berthDetails.comment')} value={berthComment} />
              </Section>
            </Section>
            <Section title={t('offer.billing.title').toUpperCase()}>
              {order && (
                <>
                  <Section>
                    <LabelValuePair
                      label={t('offer.billing.basePrice')}
                      value={formatPrice(order.price, i18n.language)}
                    />
                    {order.fixedProducts.map((product, i) => (
                      <LabelValuePair
                        key={i}
                        label={t(getProductServiceTKey(product.name))}
                        value={formatPrice(product.price, i18n.language)}
                      />
                    ))}
                  </Section>
                  <Section>
                    <LabelValuePair
                      label={t('offer.billing.additionalServices')}
                      value={
                        <button onClick={() => setIsEditing(true)}>
                          <Text color="brand">{t('common.edit')}</Text>
                        </button>
                      }
                    />
                    {order.optionalProducts.map((product, i) => (
                      <LabelValuePair
                        key={i}
                        label={t(getProductServiceTKey(product.name))}
                        value={formatPrice(product.price, i18n.language)}
                      />
                    ))}
                  </Section>
                  <hr />
                  <Section>
                    <LabelValuePair
                      label={t('offer.billing.total').toUpperCase()}
                      value={formatPrice(order.totalPrice, i18n.language)}
                    />
                  </Section>
                </>
              )}
            </Section>
          </Grid>
          <hr />
          <div className={styles.buttonRow}>
            <div>
              <Button className={styles.alignLeft} theme="coat" disabled>
                {t('offer.billing.acceptAndSend')}
              </Button>
            </div>
            <div>
              <Button variant="supplementary" className={styles.button} disabled>
                {t('offer.billing.showBill')}
              </Button>
              <Button variant="supplementary" className={styles.button} disabled>
                {t('offer.billing.showContract')}
              </Button>
              <Button variant="secondary" theme="coat" className={styles.button} onClick={() => handleDeleteLease(id)}>
                {t('offer.billing.removeOffer')}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      {order && (
        <Modal isOpen={isEditing}>
          <EditForm
            orderId={order.id}
            selectedProducts={selectedProducts}
            refetchQueries={refetchQueries}
            handleCancel={() => setIsEditing(false)}
            handleSubmit={() => setIsEditing(false)}
          ></EditForm>
        </Modal>
      )}
    </>
  );
};

export default OfferCard;
