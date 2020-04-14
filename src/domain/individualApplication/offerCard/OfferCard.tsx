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

export interface OfferCardProps {
  berth: {
    name: string;
    wasteManagement: boolean | null;
    electricity: boolean | null;
    lighting: boolean | null;
    gate: boolean | null;
    water: boolean | null;
  };
}

const OfferCard: React.FunctionComponent<OfferCardProps> = ({
  berth: { name, wasteManagement, electricity, lighting, gate, water },
}) => {
  const { t } = useTranslation();
  const isNotNull = (property: boolean | null): property is boolean =>
    property !== null;
  const getColor = (property: boolean) => (property ? 'standard' : 'secondary');
  const properties: {
    prop: boolean | null;
    key: string;
    icon: IconShapes;
  }[] = [
    { prop: wasteManagement, key: 'waste', icon: 'IconTrash' },
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
            <Section title={t('common.terminology.berth')}>
              <InternalLink to="/" underlined>
                {name}
              </InternalLink>
            </Section>
            <Section>
              <div className={classNames(styles.berthProperties)}>
                {properties.map(
                  ({ prop, key, icon }) =>
                    isNotNull(prop) && (
                      <div className={styles.property}>
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
            <Section title={t('offer.berthDetails.title')}>
              <LabelValuePair
                label={t('offer.berthDetails.mooringType')}
                value={t('common.mooringTypes.STERN_BUOY_PLACE')}
              />
              <LabelValuePair
                label={t('common.terminology.width')}
                value={'4,0 m'}
              />
              <LabelValuePair
                label={t('common.terminology.length')}
                value={'8,0m'}
              />
              <LabelValuePair
                label={t('common.terminology.draught')}
                value={'2,2 m'}
              />
            </Section>
            <Section>
              <span>{t('offer.berthDetails.accessible')}</span>
            </Section>
            <Section>
              <LabelValuePair
                label={t('offer.berthDetails.maintenanceDetails')}
                value={
                  <>
                    <span>234</span>
                    <br />
                    <span>456</span>
                  </>
                }
              />
              <LabelValuePair
                label={t('offer.berthDetails.comment')}
                value={'Placeholder'}
              />
            </Section>
          </div>
          <div>
            <Section title={t('offer.billing.title')}>
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
                value={t('common.edit')}
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
          <Button className={classNames(styles.alignLeft)}>
            {t('offer.billing.acceptAndSend')}
          </Button>
          <div>
            <Button
              color="supplementary"
              className={classNames(styles.button, styles.alignRight)}
            >
              {t('offer.billing.showBill')}
            </Button>
            <Button
              color="supplementary"
              className={classNames(styles.button, styles.alignRight)}
            >
              {t('offer.billing.showContract')}
            </Button>
            <Button
              color="supplementary"
              className={classNames(styles.button, styles.alignRight)}
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
