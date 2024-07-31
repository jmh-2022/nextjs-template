'use client';

import React, { useState } from 'react';
import { DivRow, TSelectOption } from '@/components/atoms';

import RadioButton from '@/components/atoms/RadioButton';
import RadioGroup from '../atoms/RadioButton/RadioGroup';

type RadioButtonAreaDefaultProps = {
  buttonList: TSelectOption[];
  onChange?: (selectedOption: TSelectOption) => void;
  label: string;
  name: string;
};

export default function RadioButtonAreaDefault({
  buttonList,
  onChange,
  label,
  name,
}: RadioButtonAreaDefaultProps) {
  const [selectedValue, setSelectedValue] = useState<TSelectOption>(
    buttonList[0],
  );
  const handleChangeRadio = (v: TSelectOption) => {
    setSelectedValue(v);

    onChange && onChange(v);
  };
  return (
    <RadioGroup
      label={label}
      name={name}
      value={selectedValue.value}
      onChange={handleChangeRadio}
    >
      <DivRow className="gap-2 w-full">
        {buttonList.map((v) => {
          return (
            <RadioButton
              id={v.value}
              label={v.label}
              value={v.value}
              key={v.value}
              className={`w-full rounded py-2  text-center drop-shadow text-caption1 font-regular ${selectedValue.value === v.value ? 'bg-ir-main-normal text-white drop-shadow' : 'bg-gray-50 text-gray-500'}`}
            />
          );
        })}
      </DivRow>
    </RadioGroup>
  );
}
