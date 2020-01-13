import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import IndividualCustomerPage from './individualCustomerPage/IndividualCustomerPage';
import { INDIVIDUAL_CUSTOMER_QUERY } from './queries';
import { INDIVIDUAL_CUSTOMER } from './__generated__/INDIVIDUAL_CUSTOMER';
import Card from '../../common/card/Card';
import Paragraph from '../../common/paragraph/Paragraph';
import LabelValuePair from '../../common/labelValuePair/LabelValuePair';
import Text from '../../common/text/Text';

const IndividualHarborPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_CUSTOMER>(
    INDIVIDUAL_CUSTOMER_QUERY,
    { variables: { id } }
  );

  if (loading)
    return (
      <IndividualCustomerPage>
        <p>Loading...</p>
      </IndividualCustomerPage>
    );
  if (error || !data?.profile)
    return (
      <IndividualCustomerPage>
        <p>Error</p>
      </IndividualCustomerPage>
    );

  const {
    firstName,
    lastName,
    primaryAddress,
    primaryPhone,
    primaryEmail,
    comment,
  } = data.profile;

  return (
    <IndividualCustomerPage>
      <Card title="ASIAKASTIEDOT">
        <Text as="h4" size="m">
          HAKIJAN HENKILÖTIEDOT
        </Text>
        <Paragraph>
          <LabelValuePair label="Etunimet" value={firstName} />
          <LabelValuePair label="Sukunimi" value={lastName} />
        </Paragraph>
        <Paragraph>
          <LabelValuePair
            label="Jakeluosoite"
            value={primaryAddress?.address}
          />
          <LabelValuePair
            label="Postinumero"
            value={primaryAddress?.postalCode}
          />
          <LabelValuePair
            label="Postitoimipaikka"
            value={primaryAddress?.city}
          />
        </Paragraph>
        <Paragraph>
          <LabelValuePair label="Matkapuhelin" value={primaryPhone?.phone} />
          <LabelValuePair
            label="Sähköpostiosoite"
            value={primaryEmail?.email}
          />
        </Paragraph>
        <Paragraph>
          <LabelValuePair label="Huomiot" value={comment} />
        </Paragraph>
      </Card>
    </IndividualCustomerPage>
  );
};

export default IndividualHarborPageContainer;
