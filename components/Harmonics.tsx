import * as React from 'react'

import { Mafs, CartesianCoordinates, FunctionGraph, labelPi } from '../mafs/'
import FrameMafs from './FrameMafs'
import TeX from '@matejmazur/react-katex'

const Harmonics = () => {
  const [period, setPeriod] = React.useState(Math.PI)
  return (
    <>
      <div className="text-center my-4">
        <TeX>{'T= ' + period.toFixed(1)}</TeX>:{' '}
        <input
          className="h-2.5"
          type="range"
          min={0.5}
          step={0.1}
          max={4}
          value={period}
          onChange={(event) => {
            setPeriod(+event.target.value)
          }}
        />
      </div>
      <FrameMafs>
        <Mafs
          xAxisExtent={[-5, 5]}
          yAxisExtent={[-9, 1.5]}
          pan={false}
          height={200}
        >
          <FunctionGraph.OfX
            y={(x) => Math.sin((2 * Math.PI * x) / period)}
            quality="high"
          />
          <FunctionGraph.OfX
            y={(x) => Math.sin((2 * (2 * Math.PI * x)) / period) - 2.5}
            quality="high"
          />
          <FunctionGraph.OfX
            y={(x) => Math.sin((3 * (2 * Math.PI * x)) / period) - 5}
            quality="high"
          />
          <FunctionGraph.OfX
            y={(x) => Math.sin((4 * (2 * Math.PI * x)) / period) - 7.5}
            quality="high"
          />
        </Mafs>
      </FrameMafs>
    </>
  )
}

export default Harmonics
