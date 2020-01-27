import React from 'react';
import classNames from 'classnames';

import styles from './section.module.scss';
import Text from '../text/Text';

export interface ParagraphProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ title, children, className }: ParagraphProps) => (
  <article className={classNames(styles.section, className)}>
    {title && (
      <Text as="h4" size="m">
        {title}
      </Text>
    )}
    <section className={styles.body}>{children}</section>
  </article>
);

export default Section;
