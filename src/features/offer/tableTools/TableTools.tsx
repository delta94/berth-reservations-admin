import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';

import styles from './tableTools.module.scss';
import Text from '../../../common/text/Text';
import Chip from '../../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../../common/utils/consonants';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';

export interface TableToolsProps {
  applicationDate: string;
  applicationType: string;
  applicationStatus: ApplicationStatus;
  handleReturn(): void;
}

const TableTools = ({ applicationDate, applicationType, applicationStatus, handleReturn }: TableToolsProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableTools}>
      <div>
        <Text size="l">
          {t('offer.tableTools.berths').toUpperCase()}: {applicationType} {applicationDate}
        </Text>
        <Chip
          className={styles.chip}
          color={APPLICATION_STATUS[applicationStatus].color}
          label={t(APPLICATION_STATUS[applicationStatus].label)}
        />
      </div>
      <div>
        <Button variant="secondary" theme="black" className={classNames(styles.button)} onClick={handleReturn}>
          {t('offer.tableTools.return')}
        </Button>
      </div>
    </div>
  );
};

export default TableTools;
