import * as React from 'react'
import {
  Mafs,
  Point,
  Coordinates,
  Vector,
  Text,
  Theme,
  useMovablePoint,
  Circle,
  vec
} from 'mafs'

export default function ComplexPlaneRotation() {
  const tip = useMovablePoint([-2, 1], {
    color: Theme.indigo,
    constrain: (point) => {
      const angle = Math.PI / 2 - Math.atan2(...point)
      const snap = Math.PI / 2
      const roundedAngle = Math.round(angle / snap) * snap
      return vec.rotate([-2, 1], roundedAngle + Math.PI)
    },
  })
  const calcAttachment = (point: any) => {
    if (point[1] > 0) {
      return 'n'
    } else {
      return 's'
    }
  }
  return (
      <Mafs pan={false} viewBox={{ x: [-3, 3], y: [-3, 3] }}>
        <Coordinates.Cartesian
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
          attachDistance={40}
          size={20}
        >
          {tip.x.toFixed(0) +
            (tip.y > 0 ? '+' : '-') +
            Math.abs(tip.y).toFixed(0) +
            'i'}
        </Text>
        {tip.element}
      </Mafs>
  )
}
