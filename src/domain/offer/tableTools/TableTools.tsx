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
  disableSubmit: boolean;
  handleReturn(): void;
  handleSubmit(): void;
}

const TableTools: React.SFC<TableToolsProps> = ({
  applicationDate,
  applicationType,
  applicationStatus,
  disableSubmit,
  handleSubmit,
  handleReturn,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableTools}>
      <div>
        <Text size="l">
          {t('offer.tableTools.berths')}: {applicationType} {applicationDate}
        </Text>
        <Chip
          className={styles.chip}
          color={APPLICATION_STATUS[applicationStatus].color}
          label={t(APPLICATION_STATUS[applicationStatus].label)}
        />
      </div>
      <div>
        <Button
          className={classNames(styles.button)}
          onClick={handleReturn}
          color="supplementary"
        >
          {t('offer.tableTools.return')}
        </Button>
        <Button
          className={classNames(styles.button)}
          disabled={disableSubmit}
          onClick={handleSubmit}
        >
          {t('offer.tableTools.submit')}
        </Button>
      </div>
    </div>
  );
};

export default TableTools;
