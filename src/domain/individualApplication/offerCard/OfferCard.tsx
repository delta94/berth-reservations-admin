import React from 'react';
import { Button } from 'hds-react/lib';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import Grid from '../../../common/grid/Grid';
import Section from '../../../common/section/Section';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import styles from './offerCard.module.scss';
import InternalLink from '../../../common/internalLink/InternalLink';
import Icon, { IconShapes } from '../../../common/icons/Icon';
import Text from '../../../common/text/Text';
import { formatDimension } from '../../../common/utils/format';
import { BerthMooringType } from '../../../@types/__generated__/globalTypes';

export interface OfferCardProps {
  leaseDetails: {
    id: string;
    berthComment: string;
    berthDepth: number | null;
    berthIsAccessible: boolean;
    berthLength: number | null;
    berthMooringType: BerthMooringType | null;
    berthNum: string;
    berthWidth: number | null;
    electricity: boolean;
    gate: boolean;
    harborName: string;
    lighting: boolean;
    pierIdentifier: string;
    wasteCollection: boolean;
    water: boolean;
  };
  handleDeleteLease: (id: string) => void;
}

const OfferCard: React.FunctionComponent<OfferCardProps> = ({
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
  },
  handleDeleteLease,
}) => {
  const { t, i18n } = useTranslation();
  const isNotNull = (property: boolean | null): property is boolean =>
    property !== null;
  const getColor = (property: boolean) => (property ? 'standard' : 'secondary');
  const properties: {
    prop: boolean | null;
    key: string;
    icon: IconShapes;
  }[] = [
    { prop: wasteCollection, key: 'waste', icon: 'IconTrash' },
    { prop: electricity, key: 'electricity', icon: 'IconPlug' },
    { prop: lighting, key: 'lighting', icon: 'IconStreetLight' },
    { prop: gate, key: 'gate', icon: 'IconFence' },
    { prop: water, key: 'water', icon: 'IconWaterTap' },
  ];

  return (
    <Card className={classNames(styles.offerCard)}>
      <CardHeader title={t('offer.title').toUpperCase()} />
      <CardBody>
        <Grid colsCount={3}>
          <div>
            <Section title={t('common.terminology.berth').toUpperCase()}>
              <InternalLink to="/" underlined>
                {[harborName, pierIdentifier, berthNum]
                  .filter(Boolean)
                  .join(' ')}
              </InternalLink>
            </Section>
            <Section>
              <div className={classNames(styles.berthProperties)}>
                {properties.map(
                  ({ prop, key, icon }) =>
                    isNotNull(prop) && (
                      <div className={styles.property} key={key}>
                        <Icon shape={icon} color={getColor(prop)} outlined />
                        <Text
                          className={styles.propertyLabel}
                          color={getColor(prop)}
                        >
                          {t(`offer.berthDetails.${key}`)}
                        </Text>
                      </div>
                    )
                )}
              </div>
            </Section>
          </div>
          <div>
            <Section title={t('offer.berthDetails.title').toUpperCase()}>
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
                    <button className={classNames(styles.placeholderLink)}>
                      123
                    </button>
                    <br />
                    <button className={classNames(styles.placeholderLink)}>
                      456
                    </button>
                  </>
                }
              />
              <LabelValuePair
                label={t('offer.berthDetails.comment')}
                value={berthComment}
              />
            </Section>
          </div>
          <div>
            <Section title={t('offer.billing.title').toUpperCase()}>
              <LabelValuePair
                label={t('offer.billing.basePrice')}
                value={'284,00 €'}
              />
              <LabelValuePair
                label={t('offer.billing.mooring')}
                value={'79,52 €'}
              />
              <LabelValuePair
                label={t('offer.billing.electricity')}
                value={'34,08 €'}
              />
              <LabelValuePair
                label={t('offer.billing.water')}
                value={'5,68 €'}
              />
              <LabelValuePair
                label={t('offer.billing.waste')}
                value={'22,72 €'}
              />
              <LabelValuePair
                label={t('offer.billing.gate')}
                value={'4,00 €'}
              />
              <LabelValuePair
                label={t('offer.billing.lighting')}
                value={'10,00 €'}
              />
            </Section>
            <Section>
              <LabelValuePair
                label={t('offer.billing.additionalServices')}
                value={
                  <button className={classNames(styles.placeholderLink)}>
                    {t('common.edit')}
                  </button>
                }
              />
              <LabelValuePair
                label={t('offer.billing.parkingPermit')}
                value={'75 €'}
              />
            </Section>
            <hr />
            <Section>
              <LabelValuePair
                label={t('offer.billing.total').toUpperCase()}
                value={'515 €'}
              />
            </Section>
          </div>
        </Grid>
        <hr />
        <div className={classNames(styles.buttonRow)}>
          <div>
            <Button className={classNames(styles.alignLeft)} disabled>
              {t('offer.billing.acceptAndSend')}
            </Button>
          </div>
          <div>
            <Button
              color="supplementary"
              className={classNames(styles.button)}
              disabled
            >
              {t('offer.billing.showBill')}
            </Button>
            <Button
              color="supplementary"
              className={classNames(styles.button)}
              disabled
            >
              {t('offer.billing.showContract')}
            </Button>
            <Button
              color="supplementary"
              className={classNames(styles.button)}
              onClick={() => handleDeleteLease(id)}
            >
              {t('offer.billing.removeOffer')}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OfferCard;
