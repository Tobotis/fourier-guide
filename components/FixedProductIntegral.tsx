import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import { sinSum, isClose } from '../utils/math_ext'
import { Integral } from '../utils/mafs_extended/Integral'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Text,
  Vector2,
  Vector,
} from '../mafs'

interface ProductIntegralProps {
  minX?: number
  maxX: number
  omegaA: number
  amplitudeA: number
  amplitudeB: number
  lowerBound: number
  upperBound: number
}

function integralValue(
  omegaA: number,
  omegaB: number,
  amplitudeA: number,
  amplitudeB: number,
  lowerBound: number,
  upperBound: number
): number {
  let sum: number = omegaA + omegaB
  let diff: number = omegaA - omegaB
  let prod: number = amplitudeA * amplitudeB
  const boundValue: (bound: number) => number = (bound: number) => {
    return (
      Math.sin(diff * bound) / (2 * diff) - Math.sin(sum * bound) / (2 * sum)
    )
  }

  return Math.abs(prod * (boundValue(upperBound) - boundValue(lowerBound)))
}

const ProductIntegral: React.FC<ProductIntegralProps> = ({
  minX = 0,
  maxX,
  omegaA,
  amplitudeA,
  amplitudeB,
  lowerBound,
  upperBound,
}) => {
  return (
    <FrameMafs>
      <Mafs
        xAxisExtent={[minX, maxX]}
        yAxisExtent={[-1, (upperBound - lowerBound) / 2 + 1]}
        pan={false}
      >
        <CartesianCoordinates />
        <FunctionGraph.OfX
          quality="high"
          y={(x) =>
            integralValue(
              omegaA,
              x,
              amplitudeA,
              amplitudeB,
              lowerBound,
              upperBound
            )
          }
        />
        {/*<FunctionGraph.OfX
          quality="high"
          color="purple"
          y={(x) => Math.abs(1 / (x - 4))}
        />*/}
      </Mafs>
    </FrameMafs>
  )
}

export default ProductIntegral
