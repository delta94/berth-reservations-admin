import React from 'react';

import styles from './harborProperties.module.scss';
import Card from '../../../common/card/Card';
import Text from '../../../common/text/Text';
import Grid from '../../../common/grid/Grid';
import Icon from '../../../common/icon/Icon';
import ExternalLink from '../../../common/externalLink/ExternalLink';

interface Props {
  imageUrl: string;
  name: string;
  address: string;
  url: string;
  properties: {
    electricity: boolean;
    gate: boolean;
    maximumWidth: number;
    numberOfPlaces: number;
    water: boolean;
    wasteCollection: boolean;
  };
}

const HarborProperties: React.SFC<Props> = ({
  name,
  address,
  imageUrl,
  url,
  properties,
}) => {
  return (
    <Card title="SATAMA">
      <Grid>
        <img src={imageUrl} className={styles.image} />
        <div>
          <Text as="h2" size="xl">
            {name}
          </Text>
          <ExternalLink to={url}>{address}</ExternalLink>
        </div>
        <div>
          <Grid colsCount={4}>
            <div className={styles.badge}>
              <Text as="h3" size="xxxl">
                {properties.numberOfPlaces}
              </Text>
              <Text as="strong" size="s">
                Paikkoja
              </Text>
            </div>
            <div className={styles.badge}>
              <Icon name="globe" size="large" />
              <Text as="strong" size="s">
                Jonkin verran jonoa
              </Text>
            </div>
            <div className={styles.badge}>
              <Icon
                name="plug"
                size="large"
                color={properties.electricity ? 'standard' : 'secondary'}
              />
              <Text as="strong" size="s">
                Sähkö
              </Text>
            </div>
            <div className={styles.badge}>
              <Icon
                name="waterTap"
                size="large"
                color={properties.water ? 'standard' : 'secondary'}
              />
              <Text as="strong" size="s">
                Vesi
              </Text>
            </div>
            <div className={styles.badge}>
              <Text as="h3" size="xxxl">
                {properties.maximumWidth}
              </Text>
              <Text as="strong" size="s">
                Max. leveys
              </Text>
            </div>
            <div className={styles.badge}>
              <Icon
                name="trash"
                size="large"
                color={properties.wasteCollection ? 'standard' : 'secondary'}
              />
              <Text as="strong" size="s">
                Jätehuolto
              </Text>
            </div>
            <div className={styles.badge}>
              <Icon
                name="fence"
                size="large"
                color={properties.gate ? 'standard' : 'secondary'}
              />
              <Text as="strong" size="s">
                Portti
              </Text>
            </div>
            <div className={styles.badge}>
              <Icon name="streetLight" size="large" />
              <Text as="strong" size="s">
                Valaistus
              </Text>
            </div>
          </Grid>
        </div>
      </Grid>
    </Card>
  );
};

export default HarborProperties;
