'use client';

import useModals from '@/components/modal/hooks/useModals';
import { OverlayCenter } from '@/components/molecules/OverlayCenter';
import TabMenu from '@/components/molecules/TabMenu';
import TabMenu2 from '@/components/molecules/TabMenu2';
import ToggleButton from '@/components/molecules/ToggleButton';
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

  const handleToggleChange = (selectedOption: string) => {
    console.log('Selected option:', selectedOption);
  };
  return (
    <HeaderBody>
      <TabMenu />
      <TabMenu2 />
      <div className="p-4">
        <ToggleButton
          options={['수익률', '가격']}
          onChange={handleToggleChange}
        />
      </div>
    </HeaderBody>
  );
}
