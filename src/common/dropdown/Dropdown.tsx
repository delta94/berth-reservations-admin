import React, { useState } from 'react';

import styles from './dropdown.module.scss';

export interface DropdownProps {
  children: React.ReactNode;
  label: React.ReactNode;
}

const Dropdown = ({ label, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <div className={styles.label} onClick={() => setIsOpen(!isOpen)}>
        {label}
      </div>
      {isOpen && <div className={styles.menu}>{children}</div>}
    </div>
  );
};

export default Dropdown;
