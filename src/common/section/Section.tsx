import React from 'react';
import classNames from 'classnames';

import Text from '../text/Text';
import styles from './section.module.scss';

export interface SectionProps {
  title?: string;
  className?: string;
}

const Section: React.SFC<SectionProps> = ({ title, children, className }) => (
  <article className={classNames(styles.section, className)}>
    {title && (
      <Text as="h4" size="m" className={styles.title}>
        {title}
      </Text>
    )}
    <section className={styles.body}>{children}</section>
  </article>
);

export default Section;
