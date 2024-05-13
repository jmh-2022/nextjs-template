'use client';

import React from 'react';
import { DivColumn, DivRow } from '../atoms';
import { Body1Regular } from '../atoms/Texts';
import { ModalWithOutChildrenProps } from '../modal/atom/modalAtoms';

export type ModalConfirmProps = ModalWithOutChildrenProps & {
  content: React.ReactNode;
  onSubmit: () => void;
};

export default function ModalConfirm({
  content,
  onClose,
  onSubmit,
}: ModalConfirmProps) {
  const handleClickConfirm = () => {
    onSubmit();
    // onClose && onClose();
  };
  return (
    <DivColumn className="bg-white rounded-[20px]">
      <DivRow className="py-6 px-8 border-b border-ro-gray-100">
        <Body1Regular className="text-center w-full">{content}</Body1Regular>
      </DivRow>
      <DivRow className="p-6 gap-4">
        <button title="취소" onClick={onClose}>
          취소
        </button>
        <button title="확인" onClick={handleClickConfirm}>
          확인
        </button>
      </DivRow>
    </DivColumn>
  );
}
