import React from 'react';
import classNames from 'classnames';

import styles from './paragraph.module.scss';
import Text from '../text/Text';

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Paragraph = ({ title, children, className }: Props) => (
  <article className={classNames(styles.paragraph, className)}>
    {title && (
      <Text as="h4" color="brand">
        {title}
      </Text>
    )}
    <section className={styles.body}>{children}</section>
  </article>
);

export default Paragraph;
