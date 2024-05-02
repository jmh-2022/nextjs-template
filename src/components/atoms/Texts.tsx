import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'

type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export type TitleProps = TextProps & {
  numberOfLines?: number
}

//제목 영역
/**
    제목 1
 * 페이지 단위 타이틀로 사용 권장 예시) 화면을 명시하는 타이틀
 * @date 5/17/2023 - 12:54:11 PM
 *
 * @param {TitleProps} {className: _className,  ...props}
 * @returns {*}
 */
export const Title1SemiBold = ({
  className: _className,
  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-title1 font-semibold tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Title1Regular = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-title1 font-normal  tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Title1Light = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-title1 font-light  tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Title2SemiBold = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-title2 font-semibold tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Title2Regular = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-title2 font-normal  tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Title2Light = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-title2 font-light  tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Body1SemiBold = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-body1 font-semibold tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}
export const Body1Regular = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-body1 font-normal tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Body1Light = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-body1 font-light tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Body2SemiBold = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-body2 font-semibold tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}
export const Body2Regular = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-body2 font-normal tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Body2Light = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-body2 font-light tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Caption1SemiBold = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-caption1 font-semibold tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}
export const Caption1Regular = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-caption1 font-normal tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Caption1Light = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-caption1 font-light tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Label1SemiBold = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-label1 font-semibold tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}
export const Label1Regular = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-label1 font-normal tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}

export const Label1Light = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = twMerge(
    'font-pretendard text-ro-label1 font-light tracking-wide whitespace-pre-line',
    _className,
  )

  return <p {...props} className={className} />
}
