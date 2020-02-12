import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconShare, IconAngleRight } from 'hds-react';

import { IconPerson } from '../../common/icons';
import Header from '../../common/header/Header';
import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';
import Dropdown from '../../common/dropdown/Dropdown';
import List from '../../common/list/List';
import ListItem from '../../common/list/ListItem';
import { StoreState } from '../app/types/AppTypes';
import { logoutTunnistamo } from '../auth/authenticate';

const PageHeaderContainer: React.SFC = () => {
  const { t } = useTranslation();
  const fullName = useSelector<StoreState, string | undefined>(
    store =>
      `${store.authentication.tunnistamo.user?.profile?.given_name} ${store.authentication.tunnistamo.user?.profile?.family_name}`
  );

  return (
    <Header>
      <Link to="/">
        <HelsinkiLogo size="large" color="white" />
      </Link>
      <Dropdown label={<Button iconLeft={<IconPerson />}>{fullName}</Button>}>
        <List noBullets>
          <ListItem>
            <Button
              onClick={() => {
                // Log out
                logoutTunnistamo();
              }}
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
