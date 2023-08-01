import * as React from 'react'

import { Mafs, Coordinates, Plot, labelPi } from 'mafs'

const SampleAddition = () => {
  return (
      <Mafs viewBox={{x:[-1,1],y:[-5,5]}} preserveAspectRatio={false} >
        <Plot.OfX
          y={(x) =>
            Math.sin(2 * Math.PI * x) +
            2 * Math.sin(4 * Math.PI * x) +
            Math.sin(9 * 2 * Math.PI * x)
          }
          maxSamplingDepth={15}
        />

        <Coordinates.Cartesian />
      </Mafs>
  )
}

export default SampleAddition
