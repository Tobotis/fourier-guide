import * as React from 'react'

import { Mafs, CartesianCoordinates, FunctionGraph, labelPi } from '../mafs/'
import FrameMafs from './FrameMafs'
const SampleAddition = () => {
  return (
    <FrameMafs>
      <Mafs yAxisExtent={[-5, 5]}>
        <CartesianCoordinates xAxis={{ lines: Math.PI, labels: labelPi }} />
        <FunctionGraph.OfX
          y={(x) => Math.sin(x) + 2 * Math.sin(2 * x) + Math.sin(9 * x)}
        />
      </Mafs>
    </FrameMafs>
  )
}

export default SampleAddition
