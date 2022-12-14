import * as React from 'react'
import * as vec from 'vec-la'
import {
  Mafs,
  CartesianCoordinates,
  FunctionGraph,
  labelPi,
  useMovablePoint,
  Text,
  Theme,
} from '../mafs'
import FrameMafs from './FrameMafs'

function InteractiveSin() {
  const phase = useMovablePoint([0, 0], {
    constrain: 'horizontal',
    color: Theme.orange,
  })

  const translation = vec.matrixBuilder().translate(phase.x, phase.y).get()
  const freq = useMovablePoint([2 * Math.PI, 0], {
    constrain: 'horizontal',
    transform: translation,
    color: Theme.blue,
  })
  const amplitude = useMovablePoint([Math.PI / 2, 1], {
    constrain: 'vertical',
    transform: translation,
    color: Theme.indigo,
  })
  return (
    <div>
      <FrameMafs>
        <Mafs yAxisExtent={[-2.5, 2.5]} xAxisExtent={[-15, 15]}>
          <CartesianCoordinates
            subdivisions={4}
            xAxis={{ lines: Math.PI, labels: labelPi }}
          />
          <FunctionGraph.OfX
            y={(x) =>
              amplitude.y *
              Math.sin(((2 * Math.PI) / (freq.x - phase.x)) * x - phase.x)
            }
          />
          {freq.element}
          {amplitude.element}
          {phase.element}
          <Text x={2} y={2}>
            {phase.x.toFixed(3)}
          </Text>
        </Mafs>
      </FrameMafs>
    </div>
  )
}
export default InteractiveSin
