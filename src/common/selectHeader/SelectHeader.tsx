import React from 'react';
import classNames from 'classnames';

import styles from './selectHeader.module.scss';

interface SelectHeaderProps<T> {
  allLabel: string;
  className?: string;
  editLabel: string;
  items: T[];
  selectedItem?: T | null;
  title?: string;
  formatter(item: T): string;
  equals(a: T, b: T): boolean;
  onEdit?(item: T): void;
  onSelect(item: T | null): void;
  renderer?(item: T): React.ReactNode;
}

const SelectHeader = <T extends {}>({
  allLabel,
  className,
  editLabel,
  items,
  selectedItem,
  title,
  formatter,
  equals,
  onEdit,
  onSelect,
  renderer,
}: SelectHeaderProps<T>) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.selectContainer}>
        <div>
          {title && <span className={styles.title}>{title}</span>}
          <button
            onClick={() => onSelect(null)}
            className={classNames(styles.button, {
              [styles.buttonSelected]: !selectedItem,
            })}
          >
            {allLabel}
          </button>
          {items.map((item, id) => (
            <button
              key={id}
              onClick={() => onSelect(item)}
              className={classNames(styles.button, {
                [styles.buttonSelected]: selectedItem && equals(selectedItem, item),
              })}
            >
              {formatter(item)}
            </button>
          ))}
        </div>
        {selectedItem && (
          <button onClick={() => onEdit?.(selectedItem)} className={styles.editButton}>
            {editLabel}
          </button>
        )}
      </div>
      {selectedItem && renderer?.(selectedItem)}
    </div>
  );
};

export default SelectHeader;
