import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './internalNavLink.module.scss';
import Button from '../../../common/button/Button';

interface Props {
  to: string;
  icon?: JSX.Element;
}

const InternalNavLink: React.SFC<Props> = ({ children, to, icon }) => {
  const history = useHistory();

  return (
    <div className={styles.internalNavLink}>
      <Button variant="text" onClick={() => history.push(to)} icon={icon}>
        {children}
      </Button>
    </div>
  );
};

export default InternalNavLink;
