import React from 'react';

import { BoatCert } from '../types';
import BoatCertificate from './BoatCertificate';
import { getCertificate } from './boatsCardUtils';
import { BoatCertificateType } from '../../../@types/__generated__/globalTypes';

interface BoatCertificatesProps {
  certificates: BoatCert[];
}

const BoatCertificates: React.FC<BoatCertificatesProps> = ({ certificates }) => {
  const insurance = getCertificate(certificates, BoatCertificateType.INSURANCE);
  const inspection = getCertificate(certificates, BoatCertificateType.INSPECTION);

  return (
    <>
      {inspection && <BoatCertificate certificate={inspection} />}
      {insurance && <BoatCertificate certificate={insurance} />}
    </>
  );
};

export default BoatCertificates;
