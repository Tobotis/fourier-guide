import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import { sinSum } from '../utils/math_ext'
import { Integral } from '../utils/mafs_extended/area/integral_display'
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
  fixed_periodendauer: any
}

const WaveCheck: React.FC<props> = ({ children, fixed_periodendauer }) => {
  let [periodendauer, setPeriodendauer] = React.useState(2)

  let [istGesuchterGraphAngezeigt, setIstGesuchterGraphAngezeigt] =
    React.useState(true)

  let [istProduktAngezeigt, setIstProduktAngezeigt] = React.useState(true)

  return (
    <div>
      <>
        <FrameMafs>
          <Mafs
            yAxisExtent={[-1.1, 1.1]}
            xAxisExtent={[
              (-3 * fixed_periodendauer) / 2,
              (3 * fixed_periodendauer) / 2,
            ]}
          >
            <CartesianCoordinates subdivisions={2} />
            {
              <Integral
                y={(x: number) =>
                  Math.sin((x / fixed_periodendauer) * (2 * Math.PI)) *
                  Math.sin((x / periodendauer) * (2 * Math.PI))
                }
                belowColor="red"
                aboveColor="green"
                quality="high"
              ></Integral>
            }
            <>
              <FunctionGraph.OfX
                quality="high"
                y={(x) => Math.sin((x / periodendauer) * (2 * Math.PI))}
                color="cyan"
              ></FunctionGraph.OfX>

              {istGesuchterGraphAngezeigt ? (
                <FunctionGraph.OfX
                  quality="high"
                  y={(x) => Math.sin((x / fixed_periodendauer) * (2 * Math.PI))}
                  color="red"
                ></FunctionGraph.OfX>
              ) : (
                <></>
              )}
              {istProduktAngezeigt ? (
                <FunctionGraph.OfX
                  quality="high"
                  y={(x) =>
                    Math.sin((x / fixed_periodendauer) * (2 * Math.PI)) *
                    Math.sin((x / periodendauer) * (2 * Math.PI))
                  }
                  color="purple"
                ></FunctionGraph.OfX>
              ) : (
                <></>
              )}
            </>
          </Mafs>
        </FrameMafs>
        <div className="flex justify-center">
          <div className="flex">
            <p className="px-2 flex">
              Periodendauer von <p className="text-cyan-400 pl-1">g(t)</p>
            </p>
            <input
              type="range"
              min={0.1}
              max={fixed_periodendauer * 2}
              step={0.01}
              value={periodendauer}
              onChange={(event) => setPeriodendauer(+event.target.value)}
            />
          </div>
          <div className="flex">
            <p className="px-2 text-red-400">f(t) anzeigen</p>
            <input
              type="checkbox"
              checked={istGesuchterGraphAngezeigt}
              onChange={(_) =>
                setIstGesuchterGraphAngezeigt(!istGesuchterGraphAngezeigt)
              }
            />
          </div>
          <div className="flex">
            <p className="px-2 text-purple-600">p(t) anzeigen</p>
            <input
              type="checkbox"
              checked={istProduktAngezeigt}
              onChange={(_) => setIstProduktAngezeigt(!istProduktAngezeigt)}
            />
          </div>
        </div>
      </>
    </div>
  )
}
export default WaveCheck
