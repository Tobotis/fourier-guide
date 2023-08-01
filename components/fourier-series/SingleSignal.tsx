import * as React from 'react'
import { Mafs, Plot, Coordinates, Text, Line } from 'mafs'
const SingleSignal: React.FC = () => {
  return  (<Mafs
          height={200}
          viewBox={{x:[-2,2],y:[-5,5]}}
          pan={false}
        >
          <Coordinates.Cartesian
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />
          <Plot.OfX
            y={(x) =>
              x < 1 && x > -1
                ? -1 * (x + 1) * (Math.pow(x, 2) + 1) * (x - 1)
                : 0
            }
          />
          <Line.Segment point1={[1, -10]} point2={[1, 10]} style="dashed" />
          <Line.Segment point1={[-1, -10]} point2={[-1, 10]} style="dashed" />
          <Text x={-2} y={1} attach="s" attachDistance={40}>
            a
          </Text>
          <Text x={2} y={1} attach="s" attachDistance={40}>
            b
          </Text>
        </Mafs>
  )
}
export default SingleSignal
