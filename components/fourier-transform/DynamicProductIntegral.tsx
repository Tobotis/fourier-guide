import * as React from 'react'
import FrameMafs from '../FrameMafs'
import * as vec from 'vec-la'
import { sinSum, isClose } from '../../utils/math_ext'
import { Integral } from '../../utils/mafs_extended/Integral'
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

interface DynamicProductIntegralProps {
  minX?: number
  maxX: number
  waveCoordinates: Vector2[]
  lowerBound: number
  upperBound: number
  step?: number
  showValues?: boolean
}

const DynamicProductIntegral: React.FC<DynamicProductIntegralProps> = ({
  minX = 0,
  maxX = 10,
  waveCoordinates,
  lowerBound,
  upperBound,
  step = 0.1,
  showValues = true,
}) => {
  let saved_values = new Map<number, number>()

  function calculateIntegral(periode: number) {
    let sum: number = 0
    for (let i = lowerBound; (i += step); i < upperBound) {
      sum +=
        sinSum(i, waveCoordinates) *
        Math.sin(((i / periode) * Math.PI) / 2) *
        step
    }
    saved_values.set(periode, sum)
    return sum
  }

  const getLines = React.useMemo(() => {
    let lines: Array<React.ReactNode> = []
    waveCoordinates.forEach((elem: Vector2) => {
      lines.push(
        <FunctionGraph.Parametric
          xy={(t: number) => [elem[0], t]}
          t={[-100, 100]}
          color="purple"
          weight={3}
          style="dashed"
        />
      )
    })
    return <>{lines.map((elem: React.ReactNode) => elem)}</>
  }, [waveCoordinates])

  return (
    <FrameMafs>
      <Mafs xAxisExtent={[minX, maxX]} yAxisExtent={[-1, 25]}>
        <CartesianCoordinates />

        <FunctionGraph.OfX quality="medium" y={(x) => calculateIntegral(x)} />
        {showValues ? <>{getLines}</> : <></>}
      </Mafs>
    </FrameMafs>
  )
}

export default DynamicProductIntegral
