import React from 'react';

import Card from './Card';
import Text from '../text/Text';
import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';

export default {
  component: Card,
  title: 'Card',
};

export const sampleCard = () => <Card title="heading">content</Card>;

export const Harbor1 = () => (
  <Card>
    <Section title="Osoite">
      <Text color="brand" size="xs">
        Aurinkoranta 1, 00990 Helsinki
      </Text>
    </Section>
    <Section>
      <Text color="brand" size="s">
        Toimipisteen nettisivut
      </Text>
    </Section>
    <Section>
      <Text color="brand" size="s">
        Satamakartta (PDF)
      </Text>
    </Section>
    <Section>
      <Text color="brand" size="s">
        Google maps
      </Text>
    </Section>
  </Card>
);

export const Harbor2 = () => (
  <Card>
    <Section>
      <LabelValuePair label="Max leveys" value="2.5m - 4m" />
      <LabelValuePair
        label="Kiinnitys"
        value="Aisa-, Kävelyaisa- ja Peräpoijupaikkoja"
      />
      <LabelValuePair
        label="Päällikkö"
        value="Mikko Mallikas +358 00 000 000"
      />
      <LabelValuePair label="Huoltotiimi" value="Itäinen veneilytiimi" />
    </Section>
  </Card>
);

export const Harbor3 = () => (
  <Card>
    <Section title="Viimeaikainen toiminta">
      <Text color="brand" size="xs">
        Ei mitään
      </Text>
    </Section>
  </Card>
);
