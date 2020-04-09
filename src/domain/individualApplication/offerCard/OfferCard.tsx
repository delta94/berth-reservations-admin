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
  const { t, i18n } = useTranslation();
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
    <Card>
      <CardHeader title={'TARJOUS'} />
      <CardBody>
        <Grid colsCount={3}>
          <div className={classNames(styles.column)}>
            <Section title={'VENEPAIKKA'}>
              <InternalLink to="/" underlined>
                {name}
              </InternalLink>
            </Section>
            <Section>
              <div className={classNames(styles.iconRow)}>
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
          <div className={classNames(styles.column)}>
            <Section title={'PAIKAN TIEDOT'}>
              <LabelValuePair label={'Kiinnitystyyppi'} value={'Peräpoiju'} />
              <LabelValuePair label={'Leveys'} value={'4,0 m'} />
              <LabelValuePair label={'Pituus'} value={'8,0m'} />
              <LabelValuePair label={'Syvyys'} value={'2,2 m'} />
            </Section>
            <Section>
              <span>Esteetön paikka</span>
            </Section>
            <Section>
              <LabelValuePair
                label={'Huoltotiedot'}
                value={
                  <>
                    <span>234</span>
                    <br />
                    <span>456</span>
                  </>
                }
              />
              <LabelValuePair
                label={'Huomiot'}
                value={'Pohjassa on iso kivi'}
              />
            </Section>
          </div>
          <div className={classNames(styles.column)}>
            <Section title={'LASKU'}>
              <LabelValuePair label={'Perushinta'} value={'284,00 €'} />
              <LabelValuePair label={'Kiinnitys'} value={'79,52 €'} />
              <LabelValuePair label={'Sähkö'} value={'34,08 €'} />
              <LabelValuePair label={'Vesi'} value={'5,68 €'} />
              <LabelValuePair label={'Jäte'} value={'22,72 €'} />
              <LabelValuePair label={'Portti'} value={'4,00 €'} />
              <LabelValuePair label={'Valaistus'} value={'10,00 €'} />
            </Section>
            <Section>
              <LabelValuePair label={'Lisäpalvelut'} value={'Muokkaa'} />
              <LabelValuePair label={'Pysäköintilupa'} value={'75 €'} />
            </Section>
            <hr />
            <Section>
              <LabelValuePair label={'YHTEENSÄ'} value={'515 €'} />
            </Section>
          </div>
        </Grid>
        <hr />
        <div className={classNames(styles.buttonRow)}>
          <Button className={classNames(styles.alignLeft)}>
            Hyväksy ja lähetä tarjous
          </Button>
          <div>
            <Button
              color="supplementary"
              className={classNames(styles.button, styles.alignRight)}
            >
              Näytä lasku
            </Button>
            <Button
              color="supplementary"
              className={classNames(styles.button, styles.alignRight)}
            >
              Näytä sopimus
            </Button>
            <Button
              color="supplementary"
              className={classNames(styles.button, styles.alignRight)}
            >
              Poista tarjous
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OfferCard;
