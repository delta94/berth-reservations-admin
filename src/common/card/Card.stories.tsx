import React from 'react';

import Card from './Card';
import CardHeader from '../cardHeader/CardHeader';
import CardBody from '../cardBody/CardBody';
import Text from '../text/Text';
import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';

export default {
  component: Card,
  title: 'Card',
  decorators: [
    storyFn => (
      <div style={{ backgroundColor: 'lightgrey', height: '100vh' }}>
        {storyFn()}
      </div>
    ),
  ],
};

export const card = () => (
  <Card>
    <CardHeader title="Heading" />
    <CardBody>content</CardBody>
  </Card>
);

card.story = {
  name: 'Default',
};

export const multipleBodies = () => (
  <Card>
    <CardHeader title="Heading" />
    <CardBody>First body</CardBody>
    <CardBody>Second body</CardBody>
  </Card>
);

export const Harbor1 = () => (
  <Card>
    <CardBody>
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
    </CardBody>
  </Card>
);

export const Harbor2 = () => (
  <Card>
    <CardBody>
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
    </CardBody>
  </Card>
);

export const Harbor3 = () => (
  <Card>
    <CardBody>
      <Section title="Viimeaikainen toiminta">
        <Text color="brand" size="xs">
          Ei mitään
        </Text>
      </Section>
    </CardBody>
  </Card>
);
