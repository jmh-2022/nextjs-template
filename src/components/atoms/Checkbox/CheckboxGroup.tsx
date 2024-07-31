'use client';

import React from 'react';

import { CheckboxGroupProp } from '../../types';
import { CheckboxContext } from '@/components/context/CheckContext';

const CheckboxGroup = ({ label, children, ...rest }: CheckboxGroupProp) => {
  return (
    <CheckboxContext.Provider value={rest}>{children}</CheckboxContext.Provider>
  );
};

export { CheckboxGroup };
