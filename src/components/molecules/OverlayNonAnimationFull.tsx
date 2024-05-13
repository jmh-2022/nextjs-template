'use client';

import React, { Children, cloneElement } from 'react';
import BakcButtonControl from '../atoms/BakcButtonControl';
import Overlay from '../atoms/Overlay';
import {
  ModalProps,
  ModalWithOutChildrenProps,
} from '../modal/atom/modalAtoms';

export function OverlayNonAnimationFull({
  onClose,
  children,
  modalId,
}: ModalProps) {
  const handleClickCancel = () => {
    onClose && onClose();
    // setTimeout(() => {
    // }, 200);
  };

  const modifiedChildren = Children.map(children, (child) => {
    // 추가할 props를 정의합니다.
    const additionalProps: ModalWithOutChildrenProps = {
      // 예시로 전달할 파라미터
      onClose: handleClickCancel,
      // onSubmit: handleClickSubmit,
    };

    // 각각의 child에 추가 props를 전달합니다.
    return cloneElement(
      child as React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
      >,
      additionalProps,
    );
  });

  return (
    <Overlay onClick={handleClickCancel}>
      <section
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col h-screen w-full bg-white `}
      >
        {modifiedChildren}
      </section>
      {modalId && (
        <BakcButtonControl onBack={handleClickCancel} modalId={modalId} />
      )}
    </Overlay>
  );
}
