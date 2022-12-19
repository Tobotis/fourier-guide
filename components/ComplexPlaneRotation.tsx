import * as React from 'react'
import {
  Mafs,
  Point,
  CartesianCoordinates,
  Vector,
  Text,
  Polygon,
  Theme,
  useMovablePoint,
  Vector2,
  Circle,
} from '../mafs'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import { validateConfig } from 'next/dist/server/config-shared'

export default function ComplexPlaneRotation() {
  const startAngle = Math.atan2(-2, 1)
  const tip = useMovablePoint([-2, 1], {
    color: Theme.blue,
    constrain: (point) => {
      const angle = Math.PI / 2 - Math.atan2(...point)
      const snap = Math.PI / 2
      const roundedAngle = Math.round(angle / snap) * snap
      return vec.rotate([-2, 1], roundedAngle + Math.PI)
    },
  })
  const calcAttachment = (point: Vector2) => {
    if (point[1] > 0) {
      return 'n'
    } else {
      return 's'
    }
  }
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
        <Circle
          center={[0, 0]}
          radius={vec.mag([-2, 1])}
          fillOpacity={0}
          strokeOpacity={0.5}
          strokeStyle="dashed"
        />

        <Point x={-2} y={1} />
        <Point x={1} y={2} />
        <Point x={2} y={-1} />
        <Point x={-1} y={-2} />
        <Vector tip={tip.point} />
        <Text
          x={tip.x}
          y={tip.y}
          attach={calcAttachment(tip.point)}
          attachDistance={20}
          size={20}
        >
          {tip.x.toFixed(0) +
            (tip.y > 0 ? '+' : '-') +
            Math.abs(tip.y).toFixed(0) +
            'i'}
        </Text>
        {tip.element}
      </Mafs>
    </FrameMafs>
  )
}
