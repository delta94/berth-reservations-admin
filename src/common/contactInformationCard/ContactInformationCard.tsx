import React from 'react';
import { useTranslation } from 'react-i18next';

import CardHeader from '../cardHeader/CardHeader';
import CardBody from '../cardBody/CardBody';
import Card from '../card/Card';
import Text from '../text/Text';
import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';
import ExternalLink from '../externalLink/ExternalLink';
import styles from './contactInformation.module.scss';
import { formatAddress } from '../utils/format';

export type ContactInformationCardProps = {
  municipality?: string | null;
  name?: string | null;
  streetAddress?: string | null;
  zipCode: string;
};

const ContactInformationCard = ({ name, streetAddress, zipCode, municipality }: ContactInformationCardProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('common.terminology.contactInformation').toUpperCase()} />
      <CardBody>
        <Text as="h3">{name || '-'}</Text>
        <p>{formatAddress(streetAddress, zipCode, municipality)}</p>

        <Section
          title={t('common.terminology.maintenance').toUpperCase() + ' (PLACEHOLDER)'}
          className={styles.section}
        >
          <p>Itäinen veneilytiimi</p>
          <p>(Kulosaaren sillasta itään)</p>
          <ExternalLink href="mailto:itainenveneilytiimi@hel.fi">itainenveneilytiimi@hel.fi</ExternalLink>
        </Section>

        <Section
          title={t('common.terminology.harborChief').toUpperCase() + ' (PLACEHOLDER)'}
          className={styles.section}
        >
          <LabelValuePair label={'Nimi'} value={'Mikko Mallikas'} />
          <LabelValuePair label={'Puhelin'} value={'+358 00 000 0000'} />
          <LabelValuePair
            label={'Sähköposti'}
            value={<ExternalLink href="mailto:etunimi.sukunimi@gmail.com">etunimi.sukunimi@gmail.com</ExternalLink>}
          />
        </Section>
      </CardBody>
    </Card>
  );
};

export default ContactInformationCard;
