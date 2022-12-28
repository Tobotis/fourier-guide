import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import { sinSum } from '../utils/math_ext'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Vector2,
  Vector,
} from '../mafs'

type props = {
  children: any
  fixedCoordinates: Vector2[]
}

const FixedWaveSummation: React.FC<props> = ({
  children,
  fixedCoordinates,
}) => {
  return (
    <div>
      <FrameMafs>
        <Mafs
          pan={false}
          yAxisExtent={[
            -1.1 *
              fixedCoordinates.reduce(
                (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                0
              ),
            1.1 *
              fixedCoordinates.reduce(
                (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                0
              ),
          ]}
          xAxisExtent={[
            -5 *
              Math.max(...fixedCoordinates.map((value) => Math.abs(value[0]))),
            5 *
              Math.max(...fixedCoordinates.map((value) => Math.abs(value[0]))),
          ]}
        >
          <CartesianCoordinates subdivisions={2} />

          <FunctionGraph.OfX
            quality="high"
            y={(x) => sinSum(x, fixedCoordinates)}
            color="red"
          ></FunctionGraph.OfX>
        </Mafs>
      </FrameMafs>
    </div>
  )
}
export default FixedWaveSummation
