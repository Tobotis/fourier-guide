import * as React from 'react'

const FrameMafs = ({ component }) => {
  return (
    <div className="w-auto overflow-hidden sm:text-base text-sm -m-6 md:m-0 md:rounded-lg">
      <div className="unround-mafs">{component}</div>
    </div>
  )
}

export default FrameMafs
