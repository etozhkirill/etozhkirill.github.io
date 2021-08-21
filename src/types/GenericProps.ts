import React from 'react';

export default interface GenericProps {
  className?: string;
  children?: React.ReactNode;
  [propName: string]: unknown;
}
