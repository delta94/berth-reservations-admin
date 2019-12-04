import React from 'react';

import styles from './harborProperties.module.scss';
import Card from '../../../common/card/Card';
import Text from '../../../common/text/Text';
import Grid from '../../../common/grid/Grid';
import Icon from '../../../common/icon/Icon';
import ExternalLink from '../../../common/externalLink/ExternalLink';
import Property from '../property/Property';

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
    lighting: boolean;
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
            <Property
              counter={properties.numberOfPlaces}
              label="Paikkoja"
              active={!!properties.numberOfPlaces}
            />
            <Property iconName="globe" label="Jonkin verran jonoa" />
            <Property
              iconName="plug"
              label="Sähkö"
              active={properties.electricity}
            />
            <Property
              iconName="waterTap"
              label="water"
              active={properties.water}
            />
            <Property counter={properties.maximumWidth} label="Max. leveys" />
            <Property
              iconName="trash"
              label="Jätehuolto"
              active={properties.wasteCollection}
            />
            <Property
              iconName="fence"
              label="Portti"
              active={properties.gate}
            />
            <Property
              iconName="streetLight"
              label="Valaistus"
              active={properties.lighting}
            />
          </Grid>
        </div>
      </Grid>
    </Card>
  );
};

export default HarborProperties;
