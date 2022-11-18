import * as React from 'react'
import { Mafs, FunctionGraph, CartesianCoordinates } from '../mafs'

type FrameTextProps = {
  display: JSX.Element
  text: String
}

const FrameText = ({ display, text }: FrameTextProps) => {
  return (
    <div className="my-4 flex flex-row gap-5">
      <div className="rounded-lg overflow-hidden flex-none">{display}</div>
      <div className="shrink hover:font-medium transition-all">{text}</div>
    </div>
  )
}
export default FrameText
