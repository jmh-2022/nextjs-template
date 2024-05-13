'use client';

import { isSafariBrowser } from '@/utils/util';
import { useEffect } from 'react';

type BakcButtonControlProps = {
  onBack: () => void;
  modalId: string;
};

export default function BakcButtonControl({
  onBack,
  modalId,
}: BakcButtonControlProps) {
  useEffect(() => {
    if (!isSafariBrowser()) {
      const handleBackListener = () => {
        onBack();
      };

      document.addEventListener(`modalClose-${modalId}`, handleBackListener, {
        once: true,
      });

      return () => {
        document.removeEventListener(
          `modalClose-${modalId}`,
          handleBackListener,
        );
      };
    }
  }, [modalId, onBack]);

  return (
    // 이 컴포넌트는 시각적으로 아무것도 렌더링하지 않지만,
    // 뒤로 가기 이벤트를 제어합니다.
    null
  );
}
