import React from 'react';

import { MainColumn } from '../atoms';
import Header from '../organisms/Header';

/**
 * @name 헤더바디템플릿
 * @description 헤더바디템플릿
 */

export default function HeaderBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MainColumn>{children}</MainColumn>
    </>
  );
}
