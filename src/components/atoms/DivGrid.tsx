import { DivProps } from '.'

export const DivGrid = ({ className: _className, ...props }: DivProps) => {
  const className = ['grid', _className].join(' ')
  return <div {...props} className={className} />
}
