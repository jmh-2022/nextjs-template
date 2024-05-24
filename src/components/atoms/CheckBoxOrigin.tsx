import React from 'react';
import { CheckComponentOriginProps, InputComponent } from '.';

export const CheckBoxOrigin = ({
  value,
  children,
  checked = false,
  className,
  ...props
}: CheckComponentOriginProps) => {
  return (
    <label htmlFor={value} className={className}>
      {children}
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
