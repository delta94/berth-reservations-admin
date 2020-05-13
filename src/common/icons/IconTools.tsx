import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M138.4 415.45a20.87 20.87 0 0 1-29.47 0l-6.19-6.19a20.87 20.87 0 0 1 0-29.47l84.36-84.35-22.63-22.63-84.35 84.35a52.84 52.84 0 0 0 0 74.73l6.18 6.18a52.9 52.9 0 0 0 74.72 0l84.36-84.35-22.63-22.63zm22.165-183.856l22.628-22.628L306.767 332.54l-22.628 22.628zM229 163.18l-22.64 22.62 123.57 123.58 22.63-22.63-48.1-48.1 58.47-58.47a47 47 0 0 0 52.92-9.32l41.61-41.61L391.23 63l-41.61 41.61a46.92 46.92 0 0 0-9.32 52.93L281.84 216zm143.26-35.93l19-19 21 21-19 19a14.84 14.84 0 1 1-21-21zm-187 58.01a83.79 83.79 0 0 0-48.9-142.47l-17.83 17.84L157.2 99.3v36.42l-22.14 22.87H98.64l-39-39-16.85 16.77a83.79 83.79 0 0 0 142.47 48.9zm262.68 144.06a83.88 83.88 0 1 0-69.73 142.46L396.05 454l-38.68-38.68v-36.46L379.52 356h36.41l39 39 16.81-16.81a83.33 83.33 0 0 0-23.8-48.87z" />
  </svg>
);
