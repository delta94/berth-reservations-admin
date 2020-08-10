import React from 'react';
import classNames from 'classnames';

import styles from './pageContent.module.scss';

export interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

const PageContent = ({ children, className }: PageContentProps) => {
  return <div className={classNames(styles.pageContent, className)}>{children}</div>;
};

export default PageContent;
