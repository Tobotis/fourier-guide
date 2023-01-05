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
  Theme,
  Line,
} from '../mafs'

import { NonSVG, NonSVGWrapper } from '../mafs/display/NonSVGElements'
import { NonSVGElement } from '../mafs/view/NonSVGElement'

interface ProductIntegralProps {
  minX?: number
  maxX: number
  omegaA: number
  amplitudeA: number
  lowerBound: number
  upperBound: number
  linePos?: number
  reInteg: (x: number, omega: number) => number
  imInteg: (x: number, omega: number) => number
}

const ProductIntegral: React.FC<ProductIntegralProps> = ({
  minX = 0,
  maxX,
  omegaA,
  amplitudeA,
  lowerBound,
  upperBound,
  linePos = 0,
  reInteg,
  imInteg,
}) => {
  function integralValue(
    omegaF: number,
    omegaExp: number,
    amplitudeF: number,
    lowerBound: number,
    upperBound: number
  ): number {
    let reInt = reInteg(upperBound, omegaExp) - reInteg(lowerBound, omegaExp)
    let imInt = imInteg(upperBound, omegaExp) - imInteg(lowerBound, omegaExp)

    return Math.sqrt(Math.pow(reInt, 2) + Math.pow(imInt, 2))
  }
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
              2 * Math.PI * x,
              amplitudeA,
              lowerBound,
              upperBound
            )
          }
        />
        <Line.Segment
          point1={[linePos, 0]}
          point2={[linePos, (upperBound - lowerBound) / 2 + 2]}
          color={Theme.blue}
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
