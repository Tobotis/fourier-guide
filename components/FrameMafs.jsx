import * as React from 'react'

const FrameMafs = ({ component }) => {
  return (
    <div className="w-auto overflow-hidden sm:text-base text-sm m-4 md:m-6 md:rounded-lg lg:m-8">
      <div className="unround-mafs">{component}</div>
    </div>
  )
}

export default FrameMafs
