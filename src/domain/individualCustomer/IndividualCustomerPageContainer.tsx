import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import IndividualCustomerPage from './individualCustomerPage/IndividualCustomerPage';
import { INDIVIDUAL_CUSTOMER_QUERY } from './queries';
import { INDIVIDUAL_CUSTOMER } from './__generated__/INDIVIDUAL_CUSTOMER';
import Card from '../../common/card/Card';
import BillsCard from './billsCard/BillsCard';
import CustomerInfoCard from './customerInfoCard/CustomerInfoCard';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import ApplicationCard from './applicationCard/ApplicationCard';

const IndividualHarborPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_CUSTOMER>(
    INDIVIDUAL_CUSTOMER_QUERY,
    { variables: { id } }
  );

  if (error)
    return (
      <IndividualCustomerPage>
        <p>Error</p>
      </IndividualCustomerPage>
    );

  if (!data?.profile)
    return (
      <LoadingSpinner isLoading={loading}>
        <IndividualCustomerPage>
          <p>Error</p>
        </IndividualCustomerPage>
      </LoadingSpinner>
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
    <LoadingSpinner isLoading={loading}>
      <IndividualCustomerPage>
        <CustomerInfoCard
          firstName={firstName}
          lastName={lastName}
          primaryAddress={primaryAddress}
          phone={primaryPhone?.phone}
          email={primaryEmail?.email}
          comment={comment}
        />
        <Card title="VIIMEAIKAINEN TOIMINTA">Placeholder</Card>
        <ApplicationCard
          applicationType="Vaihtohakemus"
          receivedDate="23.8.2019, klo 21.06"
          queueNumber={245}
          status="Ei käsitelty"
          boatType="Purjevene / moottoripursi"
          registrationNumber="A 12345"
          boatWidth="3,2 m"
          boatLength="6 m"
          boatDepth="0,8 m"
          boatWeight="350 kg"
          boatName="Cama la Yano"
          boatBrand="Marine"
          selectedPorts={[
            { title: 'Pursilahdenranta', id: '123' },
            { title: 'Pursilahdenranta', id: '123' },
          ]}
          accessible={true}
        />
        <BillsCard
          berthPlace="Pursilahdenranta B 31"
          contractPeriod="14.9.2019 - 10.6.2019"
          dueDate="1.4.2019"
          basicFee={284}
          mooringFee={[79.52, '28%']}
          electricityFee={[34.08, '12%']}
          waterFee={[5.68, '2%']}
          wasteFee={[22.72, '8%']}
          gateFee={4}
          lightingFee={10}
          total={440}
          handleShowBill={() => alert("Here's your bill!")}
        />
      </IndividualCustomerPage>
    </LoadingSpinner>
  );
};

export default IndividualHarborPageContainer;
