import * as React from 'react'

import {
  Mafs,
  Coordinates,
  Plot,
  useStopwatch,
  Point,
} from 'mafs'

interface ScrollingFunctionProps {
  f: (x: number) => number
  ak: Array<[number, number, number]> // [Real part, Im part, index] of the coefficients
  omega?: number
  width?: number
  xExtent?: any
  yExtent?: any
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
      <Mafs
        viewBox={{x:xExtent,y:yExtent}}
        width={width}
        height={height}
      >
        <Plot.OfX
          y={(x) => f(x + time * slow)}
          opacity={0.5}
          minSamplingDepth={15}
        />
        <Plot.OfX
          y={(x) => (x > 0 ? getRealSum()(x + time * slow) : 0)}
          minSamplingDepth={15}
        />
        <Coordinates.Cartesian xAxis={{ labels: false }} />
        <Point x={0} y={getRealSum()(time * slow)} />
      </Mafs>
  )
}

export default ScrollingFunction
