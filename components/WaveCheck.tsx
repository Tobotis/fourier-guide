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
import { NonSVG, NonSVGWrapper } from '../mafs/display/NonSVGElements'

type props = {
  children: any
  fixed_periodendauer: any
  leftBound?: number
  rightBound?: number
}

const WaveCheck: React.FC<props> = ({
  children,
  fixed_periodendauer,
  leftBound = -Infinity,
  rightBound = Infinity,
}) => {
  let [periodendauer, setPeriodendauer] = React.useState(2)

  let [istFlächeAngezeigt, setIstFlächeAngezeigt] = React.useState(true)

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
            {istFlächeAngezeigt ? (
              <Integral.ToZero
                y={(x: number) =>
                  Math.sin((x / fixed_periodendauer) * (2 * Math.PI)) *
                  Math.sin((x / periodendauer) * (2 * Math.PI))
                }
                belowColor="red"
                aboveColor="green"
                quality="high"
                leftBound={leftBound}
                rightBound={rightBound}
              ></Integral.ToZero>
            ) : (
              <></>
            )}
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
            <NonSVGWrapper>
              <NonSVG.MathText
                text={
                  isClose.Relative(periodendauer, 4, 0.03)
                    ? 'A \\to \\infty'
                    : 'A \\approx 0'
                }
                x={0}
                y={0.75}
                size={25}
              />
            </NonSVGWrapper>
          </Mafs>
        </FrameMafs>
        <div className="flex justify-center">
          <div className="flex align-middle">
            <p className="px-2 flex text-center">
              Periodendauer von <p className="text-cyan-400 pl-1">g(t)</p>
            </p>
            <input
              type="range"
              className="align-middle"
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
          <div className="flex">
            <p className="px-2 ">Fläche anzeigen</p>
            <input
              type="checkbox"
              checked={istFlächeAngezeigt}
              onChange={(_) => setIstFlächeAngezeigt(!istFlächeAngezeigt)}
            />
          </div>
        </div>
      </>
    </div>
  )
}
export default WaveCheck
