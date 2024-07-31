'use client';
import { createContext, useContext } from 'react';
import { CheckContextProp } from '../types';

const CheckboxContext = createContext<CheckContextProp | undefined>(undefined);

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      'useCheckboxValueContext must be used within a useCheckboxValueProvider',
    );
  }
  return context;
};

export { CheckboxContext, useCheckboxContext };
