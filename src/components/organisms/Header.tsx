'use client';

import { MainColumn, DivRow, DivColumn } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import useModals from '@/components/modal/hooks/useModals';
import { OverlayCenter } from '@/components/molecules/OverlayCenter';

import Link from 'next/link';
import ModalConfirm from './ModalConfirm';
import { NextButton } from '../nextui/NextButton';
import { useRouter } from 'next/navigation';

/**
 * @name 헤더컴포넌트
 * @description 헤더컴포넌트
 */

export default function Header() {
  const { openModal } = useModals();
  const { push } = useRouter();

  // 자기 자신을 한번 더 호출 함으로써 동일한 모달을 생성되지 않는지 확인
  const handleClick = () => {
    openModal({
      ModalWrapper: OverlayCenter,
      children: <ModalConfirm content={'크크크크'} onSubmit={handleClick} />,
    });
  };
  return (
    <DivColumn className="p-4 bg-slate-500 text-white">
      <DivRow className="gap-4">
        <Link href={'/posts'}>
          <Button
            variant={'grey'}
            size={'md'}
            label="서버"
            className="text-white"
          />
        </Link>

        <Link href={'/charts'}>
          <Button
            variant={'grey'}
            size={'md'}
            label="차트"
            className="text-white"
          />
        </Link>
        <Button
          variant={'blue'}
          size={'md'}
          label="알럿"
          onClick={handleClick}
          className="text-white"
        />
        <NextButton
          disableRipple
          className="py-1"
          size="sm"
          onClick={() => push('/posts/save')}
        >
          생성
        </NextButton>
      </DivRow>
    </DivColumn>
  );
}
