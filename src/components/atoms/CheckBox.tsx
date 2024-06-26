import React from 'react';
import { CheckComponentProps, InputComponent } from '.';

export const CheckBox = ({
  value,
  activeComponent,
  inactiveComponent,
  checked = false,
  className,
  ...props
}: CheckComponentProps) => {
  return (
    <label htmlFor={value} className={className}>
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
