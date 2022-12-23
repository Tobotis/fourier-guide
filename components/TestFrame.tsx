import * as React from 'react'
import FrameMafs from './FrameMafs'
import { sinSum } from '../utils/math_ext'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Vector2,
  Vector,
} from '../mafs'
import { MathText } from '../utils/mafs_extended/MathText'

interface TestFrameProps {}

const TestFrame: React.FC<TestFrameProps> = () => {
  return (
    <FrameMafs>
      <Mafs>
        <CartesianCoordinates></CartesianCoordinates>
        <MathText nonsvg text="x^2" color="white" position={[0, 0]} size={50} />
      </Mafs>
    </FrameMafs>
  )
}

export default TestFrame
