'use client';
import { createContext, useContext } from 'react';
import { RadioContextProp } from '../types';

const RadioContext = createContext<RadioContextProp | undefined>(undefined);

const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadioContext must be used within a RadioProvider');
  }
  return context;
};

export { RadioContext, useRadioContext };
