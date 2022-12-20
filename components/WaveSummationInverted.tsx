import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
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

type props = {
  children: any
  fixedCoordinates: Vector2[]
}

const WaveSummationInverted: React.FC<props> = ({
  children,
  fixedCoordinates,
}) => {
  const [numPoints, setNumPoints] = React.useState(3)

  let [coordinates, setCoordinates] = React.useState<Vector2[]>([])

  for (let i = 0; i < numPoints; i++) {
    if (i >= coordinates.length) {
      coordinates.push([Math.random() * 4 - 2, Math.random() * 4 - 2])
    }
  }
  coordinates = coordinates.slice(0, numPoints)

  return (
    <div>
      <>
        <FrameMafs>
          <Mafs
            yAxisExtent={[
              -1.1 *
                fixedCoordinates.reduce(
                  (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                  0
                ),
              1.1 *
                fixedCoordinates.reduce(
                  (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                  0
                ),
            ]}
            xAxisExtent={[
              -5 *
                Math.max(
                  ...fixedCoordinates.map((value) => Math.abs(value[0]))
                ),
              5 *
                Math.max(
                  ...fixedCoordinates.map((value) => Math.abs(value[0]))
                ),
            ]}
          >
            <CartesianCoordinates subdivisions={2} />
            {coordinates.map(function (coordinate, i) {
              return (
                <>
                  <FunctionGraph.OfX
                    quality="high"
                    y={(x) =>
                      coordinate[1] *
                      Math.sin(((x / coordinate[0]) * Math.PI) / 2)
                    }
                  ></FunctionGraph.OfX>
                  <MovablePoint
                    point={coordinate}
                    onMove={(newPos) => {
                      let copy = coordinates
                      copy[i] = newPos
                      setCoordinates(copy)
                    }}
                  />
                </>
              )
            })}
          </Mafs>
        </FrameMafs>
        <div className="">
          Anzahl Wellen:{' '}
          <input
            type="range"
            min={1}
            max={10}
            value={numPoints}
            onChange={(event) => setNumPoints(+event.target.value)}
          />
        </div>
      </>
      <FrameMafs>
        <Mafs
          pan={false}
          yAxisExtent={[
            -1.1 *
              fixedCoordinates.reduce(
                (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                0
              ),
            1.1 *
              fixedCoordinates.reduce(
                (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                0
              ),
          ]}
          xAxisExtent={[
            -5 *
              Math.max(...fixedCoordinates.map((value) => Math.abs(value[0]))),
            5 *
              Math.max(...fixedCoordinates.map((value) => Math.abs(value[0]))),
          ]}
        >
          <CartesianCoordinates subdivisions={2} />
          <FunctionGraph.OfX
            quality="high"
            y={(x) => sinSum(x, coordinates)}
          ></FunctionGraph.OfX>
          <FunctionGraph.OfX
            quality="high"
            y={(x) => sinSum(x, fixedCoordinates)}
            color="red"
          ></FunctionGraph.OfX>
        </Mafs>
      </FrameMafs>
    </div>
  )
}
export default WaveSummationInverted
