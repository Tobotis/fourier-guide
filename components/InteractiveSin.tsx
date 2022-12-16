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
  Vector2,
  MovablePoint,
  Vector,
} from '../mafs'
import FrameMafs from './FrameMafs'

function InteractiveSin() {
  let [phase, setPhase] = React.useState<Vector2>([0, 0])
  let [amplitude, setAmplitude] = React.useState<Vector2>([Math.PI / 2, 1])
  let [period, setPeriod] = React.useState<Vector2>([2 * Math.PI, 0])

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
              amplitude[0] *
              Math.sin(((2 * Math.PI) / period[0]) * x - phase[0])
            }
          />
          <MovablePoint
            point={period}
            onMove={(newPos) => {
              setPeriod([newPos[0], 0])
            }}
          />
          <MovablePoint
            point={phase}
            onMove={(newPos) => {
              setPeriod([newPos[0] + (period[0] - phase[0]), 0])
              setPhase([newPos[0], 0])
            }}
          />
        </Mafs>
      </FrameMafs>
    </div>
  )
}
export default InteractiveSin
