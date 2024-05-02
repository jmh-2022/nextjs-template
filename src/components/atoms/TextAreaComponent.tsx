import type { DetailedHTMLProps } from 'react';
import React from 'react';

export type ReactTextAreaProps = DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

export type TextAreaProps = ReactTextAreaProps;

/**
 * Textarea 컴포넌트 타입이 없을 시 text가 기본
 * @date 5/11/2023 - 5:08:11 PM
 *
 * @param {TextareaProps} {
  width, height, style: _style, className: _className, 
  type: _type = "text",
  ...props
}
 * @returns {*}
 */
export const TextComponent = ({ className: _className, ...props }: TextAreaProps) => {
    const className = ['outline-none', _className].join(' ');
    return <textarea {...props} className={className} />;
};

/**
 * Textarea 컴포넌트 타입이 없을 시 text가 기본, Ref 를 포함한 태그
 * @date 5/23/2023 - 1:21:12 PM
 *
 * @type {*}
 */
// eslint-disable-next-line react/display-name
export const TextComponentWithRef = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className: _className, ...props }, ref) => {
        const className = ['outline-none', _className].join(' ');

        return <textarea {...props} className={className} ref={ref} />;
    }
);
