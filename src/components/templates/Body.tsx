import React from 'react';
import { MainColumn } from '../atoms';

/**
 * @name 바디템플릿
 * @description 화면에 바디만 필요한경우
 */

export default function Body({ children }: { children: React.ReactNode }) {
  return <MainColumn>{children}</MainColumn>;
}
