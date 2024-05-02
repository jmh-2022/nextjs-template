import React, { useEffect, useRef, useState } from 'react'
import { ReactDivProps, SelectOption } from '.'

export type CustomSelectProps = ReactDivProps & {
  options?: SelectOption[]
  selectChange?: (option: SelectOption) => void
  initValue?: SelectOption
  disabled?: boolean
}

/**
 * 셀렉트 박스 컴포넌트
 * @date 5/22/2023 - 9:23:33 AM
 *
 * @param {CustomSelectProps} { options }
 * @returns {*}
 */
const CustomSelectBox = ({
  options,
  className: _className,
  selectChange,
  // placeholder,
  initValue,
  disabled,
  ...props
}: CustomSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectOption = (option: SelectOption) => {
    setSelectedOption(option)
    selectChange && selectChange(option)
    setIsOpen(false)
  }

  const className = ['relative', _className].join(' ')
  const selectRef = useRef<HTMLDivElement>(null)

  const handleClickExternalElement = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // 외부 element클릭 시
    if (initValue) {
      setSelectedOption(initValue)
    }
    window.addEventListener('mousedown', handleClickExternalElement)
    return () =>
      window.removeEventListener('mousedown', handleClickExternalElement)
  }, [initValue, selectRef])

  useEffect(() => {
    if (selectedOption && options) {
      const findChek = options.filter(
        (option) => option.value === selectedOption.value,
      )
      if (findChek.length === 0) setSelectedOption(null)
    }
  }, [selectedOption, options])

  return (
    <div {...props} className={className} ref={selectRef}>
      <button
        className="p-2 w-full rounded-lg border bg-white border-ro-gray-100 text-ro-gray-400 shadow-[0_1px_2px_0px_rgba(0,0,0,0.2)] flex justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* {selectedOption ? (
                    <Title2Regular className="text-ro-gray-600">{selectedOption.label}</Title2Regular>
                ) : (
                    <Caption1Light className="pl-2 text-ro-gray-500">
                        {placeholder ? placeholder : '선택하기'}{' '}
                    </Caption1Light>
                )}
                {disabled ? (
                    <></>
                ) : (
                    <ArrowRightIcon
                        className={`h-6 w-6 ${isOpen ? 'transform rotate-90' : ''} stroke-black duration-300`}
                    />
                )} */}
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 overflow-y-auto bg-white rounded max-h-52 drop-shadow-[0_0_6px_rgba(0,0,0,0.2)]">
          {/* {options &&
                        options.map((option) => (
                            <Body1Regular
                                key={option.value}
                                className="p-3  text-ro-gray-500 "
                                onClick={() => handleSelectOption(option)}
                            >
                                {option.label}
                            </Body1Regular>
                        ))} */}
        </div>
      )}
    </div>
  )
}

export default CustomSelectBox
