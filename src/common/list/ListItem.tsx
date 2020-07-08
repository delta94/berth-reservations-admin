import React from 'react';

interface ListItemProps {
  className?: string;
  children: React.ReactNode;
}

const ListItem = ({ className, children }: ListItemProps) => {
  return <li className={className}>{children}</li>;
};

export default ListItem;
