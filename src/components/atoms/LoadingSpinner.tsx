import React from 'react'
import { Div } from '.'

export default function LoadingSpinner() {
  return (
    <Div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <Div className="border-4 border-ro-gray-500 border-t-4 border-t-ro-gray-200 rounded-[50%] w-12 h-12 animate-spin" />
    </Div>
  )
}
