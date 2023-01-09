import * as React from 'react'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  Theme,
  Vector,
  Text,
} from '../mafs'
import * as vec from 'vec-la'
import FrameMafs from './FrameMafs'
import { Angle } from '../utils/mafs_extended/Angle'

const PolarCoordinates = () => {
  const tip = useMovablePoint([2, 1], {
    color: Theme.blue,
  })
  return (
    <FrameMafs>
      <Mafs>
        <CartesianCoordinates
          yAxis={{
            labels: (y) => {
              return y.toString() + 'i'
            },
          }}
        />
        <Vector tip={tip.point} />
        <Text x={tip.x} y={tip.y}></Text>
        <Angle
          position={[0, 0]}
          start_angle={Math.min(0, Math.atan2(tip.y, tip.x))}
          end_angle={Math.max(Math.atan2(tip.y, tip.x), 0)}
          radius={vec.mag(tip.point) / 2}
          label={
            'θ ≈ ' +
            ((Math.atan2(tip.y, tip.x) * 180) / Math.PI).toFixed(2) +
            '°'
          }
        />
        {tip.element}
      </Mafs>
    </FrameMafs>
  )
}
export default PolarCoordinates
