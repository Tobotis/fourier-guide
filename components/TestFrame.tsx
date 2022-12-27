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
          <NonSVG.MathText text="x^2" x={2} y={2} />
        </NonSVGWrapper>
      </Mafs>
    </FrameMafs>
  )
}

export default TestFrame
