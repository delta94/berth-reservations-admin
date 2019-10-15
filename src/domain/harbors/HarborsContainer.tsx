import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { HARBORS_QUERY } from './harborsQuery';
import { HARBORS } from './__generated__/HARBORS';

const Harbors: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const HarborsItems =
    data &&
    data.harbors &&
    data.harbors.edges.reduce<JSX.Element[]>((prev, harbor) => {
      if (harbor && harbor.node && harbor.node.properties) {
        return [
          ...prev,
          <li key={harbor.node.id}>{harbor.node.properties.name}</li>,
        ];
      }
      return prev;
    }, []);

  return <ul>{HarborsItems}</ul>;
};

export default Harbors;
