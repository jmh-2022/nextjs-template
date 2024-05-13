'use client';

import { useRecoilValue } from 'recoil';
import { ModalComponentProps, modalsAtom } from './atom/modalAtoms';

import { useEffect } from 'react';
import useModals from './hooks/useModals';
import { usePathname } from 'next/navigation';

export default function ModalManager() {
  const pathname = usePathname();
  // 전역 모달 recoil
  const { modalList } = useRecoilValue(modalsAtom);
  // 모달을 닫기 위한 custom hook
  const { closeModal } = useModals();

  const handlOnClose = (modal: ModalComponentProps) => {
    closeModal(modal);
  };

  useEffect(() => {
    const scrollStatusChange = () => {
      if (modalList.length > 0) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    scrollStatusChange();

    return () => scrollStatusChange();
  }, [modalList]);

  if (modalList.length < 0) return null;

  return (
    <>
      {modalList.map((modal, index) => {
        // Component는 모달 Wrapper 이며 모달 Wrapper의 타입으로는 basic, bottomSheet, alert, confirm, toggle이 들어갈 수 있다.
        // restProps 규격 내부에 들어갈 파라미터 현재는 children만 사용한다.
        const { ModalWrapper, modalId, ...restProps } = modal;

        // 개별 모달 닫기 를 위한 함수
        const handleComponentClose = () => {
          handlOnClose(modal);
        };

        return (
          <ModalWrapper
            {...restProps}
            key={index}
            onClose={handleComponentClose}
            modalId={modalId}
          />
        );
      })}
    </>
  );
}
