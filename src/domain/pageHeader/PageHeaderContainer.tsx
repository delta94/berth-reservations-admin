import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconShare, IconAngleRight } from 'hds-react';

import { IconPerson } from '../../common/icons';
import Header from '../../common/header/Header';
import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';
import Dropdown from '../../common/dropdown/Dropdown';
import List from '../../common/list/List';
import ListItem from '../../common/list/ListItem';
import { useCurrentUser } from '../auth/hooks';
import authService from '../auth/authService';

const PageHeaderContainer: React.SFC = () => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const fullName = currentUser?.name ?? '-';

  return (
    <Header>
      <Link to="/">
        <HelsinkiLogo size="large" color="white" />
      </Link>
      <Dropdown label={<Button iconLeft={<IconPerson />}>{fullName}</Button>}>
        <List noBullets>
          <ListItem>
            <Button
              onClick={authService.logout}
              color="supplementary"
              iconLeft={<IconShare />}
              iconRight={<IconAngleRight />}
            >
              {t('common.header.logout')}
            </Button>
          </ListItem>
        </List>
      </Dropdown>
    </Header>
  );
};

export default PageHeaderContainer;
