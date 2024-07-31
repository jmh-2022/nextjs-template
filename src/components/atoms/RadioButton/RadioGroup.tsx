'use client';

import React from 'react';
import { RadioContext } from '../../context/RadioContext';
import { RadioGroupProp } from '../../types';

export default function RadioGroup({
  label,
  children,
  ...rest
}: RadioGroupProp) {
  return <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>;
}
