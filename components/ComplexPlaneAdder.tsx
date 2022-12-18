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
} from '../mafs'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'

export default function ComplexPlaneAdder() {
  const tip1 = useMovablePoint([-2, 1], { color: Theme.blue })
  const tip2 = useMovablePoint([1, 2], { color: Theme.orange })
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
        <Vector tip={tip1.point} />
        <Text
          x={tip1.x}
          y={tip1.y}
          attach={calcAttachment(tip1.point)}
          attachDistance={20}
          size={20}
        >
          {tip1.x.toFixed(2) +
            (tip1.y > 0 ? '+' : '-') +
            Math.abs(tip1.y).toFixed(2) +
            'i'}
        </Text>
        <Vector tip={tip2.point} />
        <Text
          x={tip2.x}
          y={tip2.y}
          attach={calcAttachment(tip2.point)}
          attachDistance={20}
          size={20}
        >
          {tip2.x.toFixed(2) +
            (tip2.y > 0 ? '+' : '-') +
            Math.abs(tip2.y).toFixed(2) +
            'i'}
        </Text>
        <Vector tip={[tip1.x + tip2.x, tip1.y + tip2.y]} />
        <Text
          x={tip1.x + tip2.x}
          y={tip1.y + tip2.y}
          attach={calcAttachment([tip1.x + tip2.x, tip1.y + tip2.y])}
          attachDistance={20}
          size={20}
        >
          {(tip1.x + tip2.x).toFixed(2) +
            (tip2.y + tip1.y > 0 ? '+' : '-') +
            Math.abs(tip2.y + tip1.y).toFixed(2) +
            'i'}
        </Text>
        <Polygon
          points={[
            [tip1.x + tip2.x, tip1.y + tip2.y],
            tip1.point,
            [0, 0],
            tip2.point,
          ]}
          strokeStyle="dashed"
        />
        {tip1.element}
        {tip2.element}
      </Mafs>
    </FrameMafs>
  )
}
