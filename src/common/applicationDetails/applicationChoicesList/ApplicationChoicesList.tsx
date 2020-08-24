import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import Section from '../../section/Section';
import List from '../../list/List';
import ListItem from '../../list/ListItem';
import Text from '../../text/Text';
import InternalLink from '../../internalLink/InternalLink';

interface Choice {
  priority: number;
}

export interface HarborChoice extends Choice {
  harborName: string;
  harbor: string;
}

export interface WinterStorageAreaChoice extends Choice {
  winterStorageAreaName: string;
  winterStorageArea: string;
}

interface ApplicationChoicesListProps {
  choices: Array<HarborChoice> | Array<WinterStorageAreaChoice>;
  applicationId: string;
  customerId?: string;
}

const isHarborChoice = (choice: Choice): choice is HarborChoice => (choice as HarborChoice).harbor !== undefined;

const ApplicationChoicesList = ({ choices, applicationId, customerId }: ApplicationChoicesListProps) => {
  const { t } = useTranslation();
  const routerQuery = new URLSearchParams(useLocation().search);

  if (choices.length === 0) {
    return null;
  }

  return (
    <Section
      title={
        isHarborChoice(choices[0])
          ? t('applicationList.applicationDetails.selectedPorts')
          : t('applicationList.applicationDetails.selectedWinterStorageAreas')
      }
    >
      <List noBullets>
        {[...choices]
          .sort((choiceA, choiceB) => choiceA.priority - choiceB.priority)
          .map((choice, i) => {
            const target = isHarborChoice(choice) ? choice.harbor : choice.winterStorageArea;
            const targetName = isHarborChoice(choice) ? choice.harborName : choice.winterStorageAreaName;

            routerQuery.set(isHarborChoice(choice) ? 'harbor' : 'winter-storage-area', target);

            return (
              <ListItem key={i}>
                <Text>
                  {`${t('applicationList.applicationDetails.choice')} 
                      ${i + 1}: `}
                </Text>
                {!!customerId ? (
                  <InternalLink to={`/offer/${applicationId}?${routerQuery}`}>{targetName}</InternalLink>
                ) : (
                  <Text>{targetName}</Text>
                )}
              </ListItem>
            );
          })}
      </List>
    </Section>
  );
};

export default ApplicationChoicesList;
