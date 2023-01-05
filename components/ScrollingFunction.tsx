import * as React from 'react'

import {
  Mafs,
  CartesianCoordinates,
  FunctionGraph,
  useStopwatch,
  Vector2,
  Point,
} from '../mafs/'
import FrameMafs from './FrameMafs'

interface ScrollingFunctionProps {
  f: (x: number) => number
  ak: Array<[number, number, number]> // [Real part, Im part, index] of the coefficients
  omega?: number
  width?: number
  xExtent?: Vector2
  yExtent?: Vector2
  slow?: number
  height?: number
}

const ScrollingFunction: React.FC<ScrollingFunctionProps> = ({
  f,
  ak,
  omega = (2 * Math.PI) / 5,
  xExtent = [-5.5, 5.5],
  yExtent = [-3.5, 3.5],
  width,
  height,
  slow = 1,
}: ScrollingFunctionProps) => {
  function getRealSum() {
    let real = (t: number) => {
      let re = 0
      let im = 0
      for (let index = 0; index < ak.length; index++) {
        re +=
          ak[index][0] * Math.cos(ak[index][2] * t * omega) -
          ak[index][1] * Math.sin(ak[index][2] * t * omega)
        im +=
          ak[index][0] * Math.sin(ak[index][2] * t * omega) +
          ak[index][1] * Math.cos(ak[index][2] * t * omega)
      }
      return re
    }
    return real
  }

  const { time, start } = useStopwatch()
  React.useEffect(() => start(), [start])
  return (
    <FrameMafs>
      <Mafs
        xAxisExtent={xExtent}
        yAxisExtent={yExtent}
        width={width}
        height={height}
      >
        <FunctionGraph.OfX
          y={(x) => f(x + time * slow)}
          quality="high"
          opacity={0.5}
        />
        <FunctionGraph.OfX
          y={(x) => (x > 0 ? getRealSum()(x + time * slow) : 0)}
          quality="high"
        />
        <CartesianCoordinates xAxis={{ labels: false }} />
        <Point x={0} y={getRealSum()(time * slow)} />
      </Mafs>
    </FrameMafs>
  )
}

export default ScrollingFunction
