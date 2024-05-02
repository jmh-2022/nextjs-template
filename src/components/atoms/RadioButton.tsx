import React from 'react'
import { CheckComponentProps, InputComponent } from '.'

export const RadioButton = ({
  value,
  children,
  checked = false,
  className,
  ...props
}: CheckComponentProps) => {
  return (
    <label htmlFor={value} className={className}>
      {children}
      <InputComponent
        {...props}
        id={value}
        value={value}
        type="radio"
        checked={checked}
        hidden
        className="hidden"
      />
    </label>
  )
}
