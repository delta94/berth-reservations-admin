import React from 'react';
import classNames from 'classnames';

import styles from './selectHeader.module.scss';

interface SelectHeaderProps<T> {
  className?: string;
  items: T[];
  selectedItem?: T | null;
  allLabel: string;
  editLabel: string;
  formatter(item: T): string;
  equals(a: T, b: T): boolean;
  renderer?(item: T): React.ReactNode;
  onSelect(item: T | null): void;
  onEdit?(item: T): void;
}

const SelectHeader = <T extends {}>({
  className,
  items,
  selectedItem,
  allLabel,
  editLabel,
  formatter,
  equals,
  renderer,
  onSelect,
  onEdit,
}: SelectHeaderProps<T>) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.selectContainer}>
        <div>
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
