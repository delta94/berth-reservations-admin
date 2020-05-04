import React from 'react';

import { BoatCert } from '../types';
import BoatCertificate from './BoatCertificate';

interface BoatCertificatesProps {
  certificates: BoatCert[];
}

const BoatCertificates: React.FC<BoatCertificatesProps> = ({
  certificates,
}) => {
  console.log('c', certificates);

  return (
    <>
      <BoatCertificate certificate={undefined as any} />
      <BoatCertificate certificate={undefined as any} />
    </>
  );
};

export default BoatCertificates;
