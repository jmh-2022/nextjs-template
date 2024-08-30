'use client';

import { MainColumn, DivRow } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import useModals from '@/components/modal/hooks/useModals';
import { OverlayCenter } from '@/components/molecules/OverlayCenter';

import ModalConfirm from './ModalConfirm';
import { NextButton } from '../nextui/NextButton';
import { useRouter } from 'next/navigation';

/**
 * @name 헤더컴포넌트
 * @description 헤더컴포넌트
 */

export default function HeaderBack() {
  const { openModal } = useModals();
  const { push, back } = useRouter();

  // 자기 자신을 한번 더 호출 함으로써 동일한 모달을 생성되지 않는지 확인
  const handleClick = () => {
    openModal({
      ModalWrapper: OverlayCenter,
      children: <ModalConfirm content={'크크크크'} onSubmit={handleClick} />,
    });
  };
  return (
    <DivRow className="bg-slate-500 p-4 text-white justify-between">
      <NextButton onClick={back} size="sm">
        뒤로가기
      </NextButton>
    </DivRow>
  );
}
