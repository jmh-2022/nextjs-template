'use client';

import React from 'react';

import { DivColumn, DivRow } from '../atoms';
import { ModalWithOutChildrenProps } from '../modal/atom/modalAtoms';

export type ModalAlertProps = ModalWithOutChildrenProps & {
  content: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
};

export default function ModalAlert({
  content,
  onClose,
  onSubmit,
}: ModalAlertProps) {
  const handleClick = () => {
    onClose && onClose();
    onSubmit && onSubmit();
  };
  return (
    <DivColumn className="bg-white rounded-[20px]">
      <DivRow className="py-6 px-8 border-b border-ro-gray-100">
        <p className="text-center w-full">{content}</p>
      </DivRow>
      <DivRow className="p-6">
        <button onClick={handleClick}>확인</button>
      </DivRow>
    </DivColumn>
  );
}
