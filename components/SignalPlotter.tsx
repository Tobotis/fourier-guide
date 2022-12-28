import * as React from 'react'

import { Mafs, CartesianCoordinates, FunctionGraph, labelPi } from '../mafs/'
import FrameMafs from './FrameMafs'

interface SignalPlotterProps {
  f: (x: number) => number
}

const SignalPlotter: React.FC<SignalPlotterProps> = ({
  f,
}: SignalPlotterProps) => {
  return (
    <FrameMafs>
      <Mafs xAxisExtent={[-5, 5]} yAxisExtent={[-0.2, 1.5]} height={200}>
        <FunctionGraph.OfX y={(x) => f(x)} quality="high" />
        <CartesianCoordinates />
      </Mafs>
    </FrameMafs>
  )
}

export default SignalPlotter
