import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Vector2,
  Vector,
} from '../mafs'

const WaveSummation: React.FC = () => {
  const [numPoints, setNumPoints] = React.useState(3)

  let [coordinates, setCoordinates] = React.useState<Vector2[]>([])

  for (let i = 0; i < numPoints; i++) {
    if (i >= coordinates.length) {
      coordinates.push([Math.random() * 4 - 2, Math.random() * 4 - 2])
    }
  }
  coordinates = coordinates.slice(0, numPoints)

  let sinSum = (x: number, coordinates: Vector2[]) => {
    let sum = 0
    for (let i = 0; i < coordinates.length; i++) {
      let value =
        coordinates[i][1] * Math.sin(((x / coordinates[i][0]) * Math.PI) / 2)
      sum += value
    }
    return sum
  }

  return (
    <div>
      <>
        <FrameMafs
          component={
            <Mafs>
              <CartesianCoordinates subdivisions={2} />
              {coordinates.map(function (coordinate, i) {
                return (
                  <>
                    <FunctionGraph.OfX
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
          }
        ></FrameMafs>
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
      <FrameMafs
        component={
          <>
            <Mafs
              yAxisExtent={[
                -1 *
                  coordinates.reduce(
                    (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                    0
                  ),
                coordinates.reduce(
                  (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                  0
                ),
              ]}
              xAxisExtent={[
                -5 *
                  Math.max(...coordinates.map((value) => Math.abs(value[0]))),
                5 * Math.max(...coordinates.map((value) => Math.abs(value[0]))),
              ]}
            >
              <CartesianCoordinates subdivisions={2} />
              <FunctionGraph.OfX
                y={(x) => sinSum(x, coordinates)}
              ></FunctionGraph.OfX>
            </Mafs>
          </>
        }
      />
    </div>
  )
}
export default WaveSummation
