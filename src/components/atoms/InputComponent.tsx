import type { DetailedHTMLProps } from 'react'
import React from 'react'

export type ReactInputProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type InputProps = ReactInputProps

/**
 * Input 컴포넌트 타입이 없을 시 text가 기본
 * @date 5/11/2023 - 5:08:11 PM
 *
 * @param {InputProps} {
  width, height, style: _style, className: _className, 
  type: _type = "text",
  ...props
}
 * @returns {*}
 */
export const InputComponent = ({
  className: _className,
  type: _type = 'text',
  ...props
}: InputProps) => {
  const className = ['outline-none', _className].join(' ')
  return <input {...props} type={_type} className={className} />
}

/**
 * Input 컴포넌트 타입이 없을 시 text가 기본, Ref 를 포함한 태그
 * @date 5/23/2023 - 1:21:12 PM
 *
 * @type {*}
 */
// eslint-disable-next-line react/display-name
export const InputComponentWithRef = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      width,
      height,
      style: _style,
      className: _className,
      type: _type = 'text',
      ...props
    },
    ref,
  ) => {
    const style = {
      ..._style,
      width,
      height,
    }

    const className = ['outline-none', _className].join(' ')

    return (
      <input
        {...props}
        type={_type}
        className={className}
        style={style}
        ref={ref}
      />
    )
  },
)
