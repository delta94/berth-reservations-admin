import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import Paragraph from '../../../common/paragraph/Paragraph';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import styles from './boatsCard.module.scss';

interface Boat {
  id: string;
  boatType: string;
  registrationNumber: string;
  boatWidth: string;
  boatLength: string;
  boatDepth: string;
  boatWeight: string;
  boatName: string;
  boatBrand: string;
}

interface LargeBoat extends Boat {
  boatPower: string;
  boatMaterial: string;
  purpose: string;
  inspection: string;
  insurance: string;
}

export interface BoatsCardProps {
  boats: (Boat | LargeBoat)[];
}

const BoatsCard: React.SFC<BoatsCardProps> = ({ boats }) => {
  const { t } = useTranslation();
  const isLargeBoat = (boat: LargeBoat | Boat): boat is LargeBoat =>
    (boat as LargeBoat).boatPower !== undefined;

  return (
    <div>
      {boats.map((boat, i) => (
        <Card
          className={styles.boatsCard}
          key={boat.id}
          title={
            i === 0 ? t('individualCustomer.customerBoats.title') : undefined
          }
        >
          <Paragraph>
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatWidth')}
              value={boat.boatType}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.registrationNumber')}
              value={boat.registrationNumber}
            />
          </Paragraph>
          <Paragraph>
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatLength')}
              value={boat.boatLength}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatDepth')}
              value={boat.boatDepth}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatWeight')}
              value={boat.boatWeight}
            />
          </Paragraph>
          <Paragraph>
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatName')}
              value={boat.boatName}
            />
            <LabelValuePair
              label={t('individualCustomer.customerBoats.boatBrand')}
              value={boat.boatBrand}
            />
          </Paragraph>
          {isLargeBoat(boat) && (
            <>
              <Paragraph>
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.boatPower')}
                  value={boat.boatPower}
                />
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.boatMaterial')}
                  value={boat.boatMaterial}
                />
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.purpose')}
                  value={boat.purpose}
                />
              </Paragraph>
              <Paragraph>
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.inspection')}
                  value={boat.inspection}
                />
              </Paragraph>
              <Paragraph>
                <LabelValuePair
                  label={t('individualCustomer.customerBoats.insurance')}
                  value={boat.insurance}
                />
              </Paragraph>
            </>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BoatsCard;
