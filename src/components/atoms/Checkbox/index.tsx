'use client';

import React from 'react';

import { CheckComponentProps, InputComponent, InputProps } from '..';
import { useCheckboxContext } from '@/components/context/CheckContext';

const Checkbox = ({
  value,
  className,
  checked,
  activeComponent,
  inactiveComponent,
  children,
  ...props
}: CheckComponentProps) => {
  const { disabled, onChange, value: selectedValue } = useCheckboxContext();
  return (
    <label htmlFor={value} className={className}>
      {children}
      {checked ? activeComponent : inactiveComponent}
      <InputComponent
        {...props}
        id={value}
        value={value}
        type="checkbox"
        checked={checked}
        className="hidden"
      />
    </label>
  );
};
const CheckboxDefault = ({
  value,
  className,
  children,
  ...props
}: InputProps & { value: string | undefined }) => {
  const { disabled, onChange, value: selectedValue } = useCheckboxContext();
  return (
    <label htmlFor={value} className={className}>
      {children}
      <InputComponent
        {...props}
        id={value}
        value={value}
        disabled={disabled}
        type="checkbox"
        onChange={(e) =>
          onChange && onChange({ checked: e.target.checked, value })
        }
        hidden
      />
    </label>
  );
};
const CheckboxOne = ({
  value,
  className,
  checked,
  activeComponent,
  inactiveComponent,
  children,
  ...props
}: CheckComponentProps) => {
  return (
    <label htmlFor={value} className={className}>
      {children}
      {checked ? activeComponent : inactiveComponent}
      <InputComponent
        {...props}
        id={value}
        value={value}
        type="checkbox"
        checked={checked}
        className="hidden"
      />
    </label>
  );
};

export { Checkbox, CheckboxOne, CheckboxDefault };
