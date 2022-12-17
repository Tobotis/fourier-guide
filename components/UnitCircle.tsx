import * as React from 'react'
import {
  Mafs,
  Point,
  CartesianCoordinates,
  useStopwatch,
  Vector,
  FunctionGraph,
  Circle,
  Line,
  Theme,
} from '../mafs'
import * as vec from 'vec-la'

export default function UnitCircle() {
  const { time, start } = useStopwatch()

  React.useEffect(() => start(), [start])
  let speed = 1 / 5
  let zoom = 2
  return (
    <Mafs height={400} width={800} xAxisExtent={[-3, 9]} yAxisExtent={[-3, 3]}>
      <CartesianCoordinates
        xAxis={{ labels: false }}
        yAxis={{ labels: false }}
      />

      <Vector
        tip={[
          zoom * Math.cos(time * Math.PI * speed),
          zoom * Math.sin(time * Math.PI * speed),
        ]}
      />
      <Circle center={[0, 0]} radius={zoom} />
      <FunctionGraph.OfX
        y={(x) => (x <= 0 ? 0 : -zoom * Math.sin(x - Math.PI * time * speed))}
      />
      <Line.Segment
        point1={[
          zoom * Math.cos(time * Math.PI * speed),
          zoom * Math.sin(time * Math.PI * speed),
        ]}
        point2={[0, zoom * Math.sin(time * Math.PI * speed)]}
        style="dashed"
      />
      <Line.Segment
        point1={[
          zoom * Math.cos(time * Math.PI * speed),
          zoom * Math.sin(time * Math.PI * speed),
        ]}
        point2={[zoom * Math.cos(time * Math.PI * speed), 0]}
        style="dashed"
      />
      <Point
        x={0}
        y={zoom * Math.sin(time * Math.PI * speed)}
        color={Theme.pink}
      />
      <Point
        y={0}
        x={zoom * Math.cos(time * Math.PI * speed)}
        color={Theme.pink}
      />
    </Mafs>
  )
}
