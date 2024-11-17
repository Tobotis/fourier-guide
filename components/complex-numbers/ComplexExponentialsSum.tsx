import * as React from 'react'
import {
  Mafs,
  Coordinates,
  Vector,
  useStopwatch,
  Circle,
} from 'mafs'

interface ComplexExponentialsSumProps {
  ak: Array<[number, number, number]> // [Real part, Im part, index] of the coefficients
  omega?: number
  xExtent?: any
  yExtent?: any
  width?: number
  height?: number
  vectorSize?: number
  slow?: number
}

const ComplexExponentialsSum: React.FC<ComplexExponentialsSumProps> = ({
  ak,
  omega = (2 * Math.PI) / 5,
  xExtent = [-5.5, 5.5],
  yExtent = [-3.5, 3.5],
  width,
  height,
  slow = 1,
  vectorSize = 2,
}: ComplexExponentialsSumProps) => {
  function getTailFunctions(curr: number) {
    let tail = (t: number) => {
      let re = 0
      let im = 0
      for (let index = 0; index < ak.length; index++) {
        if (ak[index][2] < curr) {
          re +=
            ak[index][0] * Math.cos(ak[index][2] * t * omega) -
            ak[index][1] * Math.sin(ak[index][2] * t * omega)
          im +=
            ak[index][0] * Math.sin(ak[index][2] * t * omega) +
            ak[index][1] * Math.cos(ak[index][2] * t * omega)
        }
      }
      let result: any = [re, im]
      return result
    }
    return tail
  }

  const { time, start } = useStopwatch()
  React.useEffect(() => start(), [start])
  return (
      <Mafs
        viewBox={{x: xExtent, y:yExtent}}
        width={width}
        height={height}
      >
        <Coordinates.Cartesian
          yAxis={{
            labels: (y) => {
              return y.toString() + 'i'
            },
          }}
        />
        {ak.map((val) => {
          let tail = getTailFunctions(val[2])
          return (
            <>
              <Circle
                key={val[2]*1000} 
                center={tail(time * slow)}
                radius={Math.sqrt(Math.pow(val[0], 2) + Math.pow(val[1], 2))}
                strokeStyle="dashed"
                strokeOpacity={0.3}
                fillOpacity={0}
              />
              <Vector
              key={val[2]}
                tip={[
                  tail(time * slow)[0] +
                    val[0] * Math.cos(val[2] * time * omega) -
                    val[1] * Math.sin(val[2] * time * omega),
                  tail(time * slow)[1] +
                    val[0] * Math.sin(val[2] * time * omega) +
                    val[1] * Math.cos(val[2] * time * omega),
                ]}
                tail={tail(time * slow)}
                weight={vectorSize}
              />
            </>
          )
        })}
      </Mafs>
  )
}
export default ComplexExponentialsSum