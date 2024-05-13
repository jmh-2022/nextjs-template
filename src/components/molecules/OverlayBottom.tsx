'use client';

import React, { Children, cloneElement, useState } from 'react';
import BakcButtonControl from '../atoms/BakcButtonControl';
import Overlay from '../atoms/Overlay';
import {
  ModalProps,
  ModalWithOutChildrenProps,
} from '../modal/atom/modalAtoms';

export function OverlayBottom({ onClose, children, modalId }: ModalProps) {
  const [fadeInOut, setFadeInOut] = useState<boolean>(true);

  const handleClickCancel = () => {
    setFadeInOut(false);
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  // submit 함수를 어디에서 전달해야될지 고민이다.
  // const handleClickSubmit = () => {
  //     setFadeInOut(false);
  //     onSubmit && onSubmit();
  //     setTimeout(() => {
  //         onClose && onClose();
  //     }, 200);
  // };

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
    <Overlay
      className={`${fadeInOut ? 'animate-fade-in' : 'animate-fade-out'}`}
      onClick={handleClickCancel}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col self-end w-full bg-transparent ${
          fadeInOut ? 'animate-fade-in-up' : 'animate-fade-out-down'
        }`}
      >
        {modifiedChildren}
      </section>
      {modalId && (
        <BakcButtonControl onBack={handleClickCancel} modalId={modalId} />
      )}
    </Overlay>
  );
}
