'use client'
import React from 'react'
import { CheckComponentProps, InputComponentWithRef } from '.'

const RadioButtonWithLabel = React.forwardRef<
  HTMLInputElement,
  CheckComponentProps
>(({ value, checked, children, className, ...props }, ref) => {
  return (
    <label htmlFor={value} className={className}>
      {children}
      <InputComponentWithRef
        {...props}
        ref={ref}
        hidden
        id={value}
        value={value}
        type="radio"
        checked={checked} // 부모 컴포넌트에서 제공받은 상태 사용
      />
    </label>
  )
})

RadioButtonWithLabel.displayName = 'RadioButtonWithLabel'

export default RadioButtonWithLabel
