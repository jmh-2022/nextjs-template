import { DivProps } from '.'

/**
 * 화면 메인에 사용된다 default로 flex grow flex-col 클래스를 갖고 있다.
 * @param DivProps
 * @returns ({ className: _className, children, ...props }: DivProps) => JSX.Element
 */

export const MainColumn = ({
  className: _className,
  children,
  ...props
}: DivProps) => {
  const className = ['flex grow flex-col', _className].join(' ')
  return (
    <main {...props} className={className}>
      {children}
    </main>
  )
}
