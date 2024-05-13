'use client';

import React, { useCallback, useEffect } from 'react';
import { DivColumn, DivRow } from '../atoms';
import { ModalWithOutChildrenProps } from '../modal/atom/modalAtoms';

export type ModalAlertProps = ModalWithOutChildrenProps & {
  content: React.ReactNode;
};

export default function Toast({ content, onClose }: ModalAlertProps) {
  const handleTimeoutCancel = useCallback(() => {
    setTimeout(() => {
      onClose && onClose();
    }, 800);
  }, [onClose]);
  useEffect(() => {
    setTimeout(() => {
      handleTimeoutCancel();
    }, 1000);
  }, [handleTimeoutCancel]);

  return (
    <DivColumn className=" text-white px-8">
      <DivRow className="px-8 py-2 border-b border-ro-gray-100 bg-ro-gray-400 rounded-full">
        {content}
      </DivRow>
    </DivColumn>
  );
}
