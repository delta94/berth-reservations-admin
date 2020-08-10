import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconShare, IconAngleRight, IconUser } from 'hds-react';

import Header from '../../../common/header/Header';
import HelsinkiLogo from '../../../common/helsinkiLogo/HelsinkiLogo';
import Dropdown from '../../../common/dropdown/Dropdown';
import List from '../../../common/list/List';
import ListItem from '../../../common/list/ListItem';
import { useCurrentUser } from '../../../features/auth/hooks';
import authService from '../../../features/auth/authService';
import Text from '../../../common/text/Text';
import styles from './pageHeader.module.scss';
import Button from '../../../common/button/Button';

const PageHeader = () => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const fullName = currentUser?.name ?? '-';

  return (
    <Header>
      <Link to="/" className={styles.mainLink}>
        <HelsinkiLogo size="large" color="white" />
        <Text as="h1" size="m" className={styles.serviceName}>
          {t('common.header.serviceName')}
        </Text>
      </Link>
      <Dropdown
        label={
          <Button variant="primary" iconLeft={<IconUser />}>
            {fullName}
          </Button>
        }
      >
        <List noBullets>
          <ListItem>
            <Button
              onClick={authService.logout}
              variant="secondary"
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

export default PageHeader;
