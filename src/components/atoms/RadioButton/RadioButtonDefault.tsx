'use client';
import React from 'react';
import { useRadioContext } from '../../context/RadioContext';

type RadioButtonProps = {
  id: string;
  value: string;
  label?: string;
  className?: string;
};

export default function RadioButtonDefault({
  id,
  value,
  label,
  className,
}: RadioButtonProps) {
  const { name, disabled, value: selectedValue, onChange } = useRadioContext();

  return (
    <label htmlFor={id} className={className}>
      <input
        type="radio"
        id={id}
        name={name} // 컨텍스트에서 받은 name 값 설정
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange && onChange({ value, label })}
        disabled={disabled}
        hidden
      />
      {label}
    </label>
  );
}
