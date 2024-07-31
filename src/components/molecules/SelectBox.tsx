'use client';

import { TSelectOption } from '@/components/atoms';
import { Icon, UIIcons } from '@/components/atoms/Icons';
import { useExternalElement } from '@/hooks';
import React, { useRef, useState } from 'react';

type SelectBoxProps = {
  selectBoxItemList: TSelectOption[];
  onChange?: (selectedItem: TSelectOption) => void;
};

export default function SelectBox({
  onChange,
  selectBoxItemList,
}: SelectBoxProps) {
  const [selected, setSelected] = useState<TSelectOption>({
    label: selectBoxItemList[0].label,
    value: selectBoxItemList[0].value,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  useExternalElement(divRef, () => {
    setIsOpen(false);
  });

  const handleClickSelectBoxButton = () => {
    setIsOpen((v) => !v);
  };

  const handleClickSelectBox = (index: number) => {
    const selectedItem = selectBoxItemList[index];
    onChange && onChange(selectedItem);
    setSelected(selectedItem);
    setIsOpen(false);
  };

  return (
    <div ref={divRef} className="relative  w-full z-10">
      <button
        onClick={handleClickSelectBoxButton}
        className="flex items-center justify-between text-body font-bold text-gray-600 bg-white border border-gray-200 p-2 rounded-lg w-full"
      >
        {selected.label}
        <Icon
          Component={UIIcons.ArrowUpIcon}
          className={`fill-gray-400 rotate-180`}
        />
      </button>

      {isOpen && (
        <ul className="absolute  w-full rounded-lg bg-white  mt-1 divide-y-1 divide-gray-50 drop-shadow-md">
          {selectBoxItemList.map((v, i) => (
            <li key={v.value} className="flex py-3 px-3 items-center">
              <button
                onClick={() => handleClickSelectBox(i)}
                className="text-body font-regular text-gray-600 w-full text-left"
              >
                {v.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
