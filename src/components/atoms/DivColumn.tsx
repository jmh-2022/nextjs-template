import { DivProps } from '.'

export const DivColumn = ({ className: _className, ...props }: DivProps) => {
  const className = ['flex flex-col', _className].join(' ')
  return <div {...props} className={className} />
}
