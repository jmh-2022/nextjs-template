import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type DivProps = ReactDivProps & PropsWithChildren

export const Div = ({ ...props }: DivProps) => {
  return <div {...props} />
}
