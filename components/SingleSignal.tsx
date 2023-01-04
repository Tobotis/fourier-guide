import * as React from 'react'
import { Mafs, FunctionGraph, CartesianCoordinates, Text, Line } from '../mafs'
import FrameText from './FrameText'
const SingleSignal: React.FC = () => {
  return (
    <FrameText
      display={
        <Mafs
          height={200}
          yAxisExtent={[-2, 2]}
          xAxisExtent={[-5, 5]}
          width={400}
          pan={false}
        >
          <CartesianCoordinates
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />
          <FunctionGraph.OfX
            y={(x) =>
              x <= 1 && x >= -1
                ? -1 * (x + 1) * (Math.pow(x, 2) + 1) * (x - 1)
                : 0
            }
          />
          <Line.Segment point1={[1, 0]} point2={[1, -1]} style="dashed" />
          <Line.Segment point1={[-1, 0]} point2={[-1, -1]} style="dashed" />
          <Text x={-1} y={0} attach="s" attachDistance={40}>
            a
          </Text>
          <Text x={1} y={0} attach="s" attachDistance={40}>
            b
          </Text>
        </Mafs>
      }
      text="Es handelt sich hierbei um ein einzelnes Signal, welches somit nur in einem Intervall von a bis b definiert sit. Man kann jedoch eine Periodizität erzwingen, indem man das einzelne Signal einfach wiederholt."
    />
  )
}
export default SingleSignal
