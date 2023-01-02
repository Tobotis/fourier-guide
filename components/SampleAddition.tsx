import * as React from 'react'

import { Mafs, CartesianCoordinates, FunctionGraph, labelPi } from '../mafs/'
import FrameMafs from './FrameMafs'
const SampleAddition = () => {
  return (
    <FrameMafs>
      <Mafs xAxisExtent={[-2, 2]} yAxisExtent={[-5, 5]}>
        <FunctionGraph.OfX
          y={(x) =>
            Math.sin(2 * Math.PI * x) +
            2 * Math.sin(4 * Math.PI * x) +
            Math.sin(9 * 2 * Math.PI * x)
          }
          quality="high"
        />

        <CartesianCoordinates />
      </Mafs>
    </FrameMafs>
  )
}

export default SampleAddition
