import { ReactNode } from 'react';
import { ReactDivProps } from './Div';
import { DivRow } from './DivRow';
import { cn } from '../cn';

type Props = ReactDivProps & {
  children: ReactNode;
};

export default function Overlay({ className, children, ...restProps }: Props) {
  const clazzName = `fixed inset-0 bg-ro-gray-600/80 z-50 ${className}`;
  return (
    <DivRow {...restProps} className={cn(clazzName)}>
      {children}
    </DivRow>
  );
}
