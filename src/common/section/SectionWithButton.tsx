import React from 'react';
import classNames from 'classnames';

import Text from '../text/Text';
import styles from './section.module.scss';

export interface SectionWithButtonProps {
  buttonText: string;
  children: React.ReactNode;
  className?: string;
  title: string;
  onClick(): void;
}

const SectionWithButton = ({ title, children, className, buttonText, onClick }: SectionWithButtonProps) => (
  <article className={classNames(styles.section, className)}>
    <div className={styles.sectionHeadWithButton}>
      <Text as="h4" size="m" className={styles.title}>
        {title}
      </Text>
      <button onClick={onClick} type="button" className={styles.title}>
        <Text color="brand">{buttonText}</Text>
      </button>
    </div>
    <section className={styles.body}>{children}</section>
  </article>
);

export default SectionWithButton;
