import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { ModalComponentProps, modalsAtom } from '../atom/modalAtoms';
import { v4 as uuid } from 'uuid';
import { ReactElement } from 'react';
import React from 'react';

function arePropsEqual(
  props1: Record<string, any>,
  props2: Record<string, any>,
): boolean {
  const keys1 = Object.keys(props1).filter((key) => key !== 'modalId');
  const keys2 = Object.keys(props2).filter((key) => key !== 'modalId');
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (props1[key] !== props2[key]) {
      return false;
    }
  }
  return true;
}

export default function useModals() {
  const rcSetModalList = useSetRecoilState(modalsAtom);
  const initAtoms = useResetRecoilState(modalsAtom);

  /**
   * 모달 오픈 함 수 onSubmit 사용 시 파라미터 받을 수 있음
   * @param modalParam
   */

  const openModal = (modalParam: ModalComponentProps) => {
    const modalId = uuid();

    rcSetModalList((atomModals) => {
      const existingModals = atomModals.modalList;

      // 현재 모달 배열에서 파라미터로 받은 모달과 동일한 것이 있는지 확인
      const isModalAlreadyPresent = existingModals.some((modal) => {
        const prevModal = modal.children;
        const currentModal = modal.children;
        if (
          React.isValidElement(prevModal) &&
          React.isValidElement(currentModal)
        ) {
          if (prevModal.type !== currentModal.type) {
            return false; // 타입이 다르면 다른 것으로 간주
          }

          // props 비교
          const prevModalProps = (modal.children as ReactElement).props;
          const currentModalProps = (modalParam.children as ReactElement).props;
          return arePropsEqual(prevModalProps, currentModalProps);
        }

        return false; // React 요소가 아니면 항상 다르다고 간주
      });

      // 이미 존재하는 모달이 아니면 새로운 리스트에 추가
      if (!isModalAlreadyPresent) {
        return {
          ...atomModals,
          modalList: [...existingModals, { ...modalParam, modalId }],
        };
      }

      // 이미 존재하는 모달이 있으면 기존 리스트 반환
      return atomModals;
    });
  };

  const closeModal = (modalParam: ModalComponentProps) => {
    rcSetModalList((atomModals) => {
      const modalList = atomModals.modalList.filter(
        (modal) => modal.children !== modalParam.children,
      );
      return {
        ...atomModals,
        modalList,
      };
    });
  };

  const closeModalAll = () => {
    initAtoms();
  };

  return {
    openModal,
    closeModal,
    closeModalAll,
  };
}
