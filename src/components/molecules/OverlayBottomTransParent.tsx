'use client';

import React, { Children, cloneElement, useState } from 'react';
import {
  ModalProps,
  ModalWithOutChildrenProps,
} from '../modal/atom/modalAtoms';

export function OverlayBottomTransParent({ onClose, children }: ModalProps) {
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
    <section
      onClick={(e) => e.stopPropagation()}
      className={`absolute bottom-0 w-full  flex flex-col justify-end bg-transparent mb-20 ${
        // fadeInOut ? 'animate-fade-in-up-toast' : 'animate-fade-out-down-toast'
        fadeInOut ? 'animate-fade-in-up-toast' : ''
      }`}
    >
      {modifiedChildren}
    </section>
    // <Overlay className={`bg-transparent`} onClick={handleClickCancel}>
    // </Overlay>
  );
}
