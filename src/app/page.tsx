'use client';

import useModals from '@/components/modal/hooks/useModals';
import { OverlayCenter } from '@/components/molecules/OverlayCenter';
import ModalAlert from '@/components/organisms/ModalAlert';
import HeaderBody from '@/components/templates/HeaderBody';

export default function Home() {
  const { openModal } = useModals();
  const handleClick = () => {
    openModal({
      ModalWrapper: OverlayCenter,
      children: <ModalAlert content={'크크크크'} />,
    });
  };
  return (
    <HeaderBody>
      <>크크</>
    </HeaderBody>
  );
}
