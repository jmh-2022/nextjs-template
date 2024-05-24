// 나누어 쪼개질 수 없는 형태의 컴포넌트를 생성한다.
// ex div,input, button 등등..

// 체크 박스, 라디오 버튼, 셀렉트 박스를 위한 옵션

import { PropsWithChildren } from 'react';
import { InputProps } from './InputComponent';

// value 값으로 아이디 및 htmlFor 값을 채운다.
export type SelectOption<T = string> = {
  value: T;
  label?: string;
};

// 체크 박스 기능 컴포넌트 Props
export type CheckComponentProps = SelectOption &
  InputProps & {
    activeComponent: React.ReactNode;
    inactiveComponent: React.ReactNode;
  };
export type CheckComponentOriginProps = SelectOption &
  PropsWithChildren &
  InputProps;

export * from './Div';
export * from './DivColumn';
export * from './DivRow';
export * from './DivGrid';
export * from './MainColumn';
export * from './InputComponent';
export * from './TextAreaComponent';
// export * from './RadioButtonWithLabel';
export * from './CheckBox';
export * from './RadioButton';
export * from './LoadingSpinner';
