import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '../cn';
import { ClassValue } from 'clsx';
/**
VariantProps: class-variance-authority 라이브러리에서 제공하는 클래스 변이 관련 기능을 사용하기 위한 타입입니다.
이 타입은 cva 함수를 사용할 때 클래스의 변이를 지정하기 위해 필요한 속성들을 정의하고 있습니다.

ButtonHTMLAttributes: HTML 버튼 엘리먼트에 적용되는 속성들을 정의한 타입입니다.
이는 React에서 HTML 요소의 속성을 타입으로 지정해 놓은 것으로,
버튼 컴포넌트에 HTML 버튼 엘리먼트의 속성들을 적용하기 위해 사용됩니다.

FC: React에서 함수형 컴포넌트를 정의할 때 사용하는 타입으로,
FC는 "Functional Component"의 약자입니다.
이를 사용하면 React 함수형 컴포넌트를 정의할 때 props의 타입이나 기타 컴포넌트 속성들을 명시적으로 지정할 수 있습니다.
*/

export const ButtonVariants = cva(
  //모든 경우에 공통으로 들어갈 CSS
  `
  flex justify-center items-center active:scale-95 rounded-xl
  text-sm font-bold text-slate-100 transition-all shadow-md
  duration-200 
  `,
  {
    //variant , size에 따라 다른 디자인을 보여줄수 있다
    variants: {
      variant: {
        default: 'active:scale-100',
        grey: ' bg-slate-300 ',
        blue: ' bg-blue-400',
        red: 'bg-red-400',
      },
      size: {
        default: '',
        md: ' w-[6rem] h-[2rem] text-[1rem] rounded-md',
        lg: 'w-[21rem] h-[7rem] text-[1rem] rounded-3xl',
        wlg: 'w-[24rem] h-[5rem] text-[2rem]',
        rounded: 'w-[6rem] h-[6rem] rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    //Button의 속성을 타입지정을 통해 손쉽게 사용
    VariantProps<typeof ButtonVariants> {
  label?: string;
  //라벨은 단지 string을 넣을때 사용
  children?: React.ReactElement;
  //icon component 같은 리엑트 컴포넌트에 사용
  clsx?: ClassValue;
  //추가 className
  //추가 className
}

/**
 * @variant 색상 지정 ex) gray, blue, red
 * @size 사이즈 지정 md, lg, wlg
 * @children ReactElement 아이콘같은걸 넣어준다
 * @label String을 넣어 버튼 라벨을 지정해준다
 * @additionalClass 추가할 클래스 속성을 넣어준다
 * @props 추가할 버튼 속성을 넣어준다
 */
const Button = ({
  variant,
  size,
  children,
  label,
  clsx,
  className: additionalClass,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(ButtonVariants({ variant, size }), clsx, additionalClass)}
      {...props}
    >
      {children && children}
      {label && label}
    </button>
  );
};

export default Button;
