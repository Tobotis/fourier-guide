import * as React from 'react'

import { Mafs, Coordinates, Plot, labelPi } from 'mafs'

interface SignalPlotterProps {
  f: (x: number) => number
}

const SignalPlotter: React.FC<SignalPlotterProps> = ({
  f,
}: SignalPlotterProps) => {
  return (
    <div className='mt-4'>
      <Mafs viewBox={{x:[-5,5], y:[-1.5,1.5]}}>
        <Plot.OfX y={(x) => f(x)}  />
        <Coordinates.Cartesian />
      </Mafs>
      </div>
  )
}

export default SignalPlotter
