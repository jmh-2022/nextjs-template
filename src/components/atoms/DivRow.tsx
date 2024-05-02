import { DivProps } from '.'

export const DivRow = ({ className: _className, ...props }: DivProps) => {
  const className = ['flex', _className].join(' ')
  return <div {...props} className={className} />
}
