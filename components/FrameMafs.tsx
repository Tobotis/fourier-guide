import * as React from 'react'

type FrameProps = {
  children: JSX.Element
}

const FrameMafs = ({ children }: FrameProps) => {
  return (
    <div className="w-auto overflow-hidden sm:text-base text-sm m-4 md:m-6 rounded-lg lg:m-8">
      <div className="unround-mafs">{children}</div>
    </div>
  )
}

export default FrameMafs
