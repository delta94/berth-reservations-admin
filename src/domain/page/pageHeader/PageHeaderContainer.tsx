import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconShare, IconAngleRight } from 'hds-react';

import { IconPerson } from '../../../common/icons';
import Header from '../../../common/header/Header';
import HelsinkiLogo from '../../../common/helsinkiLogo/HelsinkiLogo';
import Dropdown from '../../../common/dropdown/Dropdown';
import List from '../../../common/list/List';
import ListItem from '../../../common/list/ListItem';
import { useCurrentUser } from '../../auth/hooks';
import authService from '../../auth/authService';
import Text from '../../../common/text/Text';
import styles from './pageHeader.module.scss';

const PageHeaderContainer: React.SFC = () => {
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
