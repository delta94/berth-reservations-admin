import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../section/Section';
import ExternalLink from '../externalLink/ExternalLink';

type Map = {
  id: string;
  url: string;
};

export interface MapLinksProps {
  maps: Map[];
}

const MapLinks = ({ maps }: MapLinksProps) => {
  const { t } = useTranslation();

  if (maps.length === 0) return null;
  return (
    <Section>
      {maps.map((map, index) => (
        <div key={map.id}>
          <ExternalLink href={map.url} variant="withArrow">
            {`${t('common.terminology.harborMap')} ${maps.length > 1 ? `${index + 1} ` : ''}(PDF)`}
          </ExternalLink>
        </div>
      ))}
    </Section>
  );
};

export default MapLinks;
