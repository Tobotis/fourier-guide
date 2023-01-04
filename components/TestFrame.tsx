import * as React from 'react'
import FrameMafs from './FrameMafs'
import { NonSVGWrapper, NonSVG } from '../mafs/display/NonSVGElements'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Vector2,
  Vector,
} from '../mafs'

interface TestFrameProps {}

const TestFrame: React.FC<TestFrameProps> = () => {
  return (
    <FrameMafs>
      <Mafs>
        <CartesianCoordinates></CartesianCoordinates>
        <FunctionGraph.OfX y={(x) => x}></FunctionGraph.OfX>
        <NonSVGWrapper>
          <NonSVG.MafsImage
            source="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YyaLWAN7jljhIg2q_SoMwgHaJ4%26pid%3DApi&f=1&ipt=59d6a174562fc555c7a8c23bed6fcd7b7d3edf9c575837028427e58b4a8b672a&ipo=images"
            x={2}
            y={2}
            alt="Saturn"
            width={1}
            height={1}
            opacity={0.5}
            align="bl"
          />
          <NonSVG.MathText text="x^2=x^3+5" x={0} y={0} />
        </NonSVGWrapper>
      </Mafs>
    </FrameMafs>
  )
}

export default TestFrame
