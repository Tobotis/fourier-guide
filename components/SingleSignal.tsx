import * as React from 'react'
import { Mafs, FunctionGraph, CartesianCoordinates } from '../mafs'
import FrameText from './FrameText'
const SingleSignal: React.FC = () => {
  return (
    <FrameText
      display={
        <Mafs
          height={200}
          yAxisExtent={[-1, 3]}
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
        </Mafs>
      }
      text="Es lässt sich zum Beispiel dieses Signal betrachten. Es handelt sich hierbei um ein einzelnes Signal, welches somit nur endliche Zeit existiert. Man kann jedoch ein periodische erzwingen, indem man das einzelne Signal einfach wiederholt."
    />
  )
}
export default SingleSignal
