import React from 'react';

import { Boat, LargeBoat } from '../types';
import BoatCertificate from './BoatCertificate';

interface BoatCertificatesProps {
  boat: Boat | LargeBoat;
}

const BoatCertificates: React.FC<BoatCertificatesProps> = ({ boat }) => {
  return (
    <>
      <BoatCertificate boat={boat} />
      <BoatCertificate boat={boat} />
    </>
  );
};

export default BoatCertificates;
