import * as React from 'react'
import { Mafs, Plot, Coordinates, } from 'mafs'
const PeriodicSignal: React.FC = () => {
  return (

        <Mafs
          viewBox={{x:[-3,3],y:[-5,5]}}
          pan={false}
        >
          <Coordinates.Cartesian
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />
          <Plot.OfX
            y={(x) =>
              x <= -3 && x >= -5
                ? -1 * (x + 5) * (Math.pow(x + 4, 2) + 1) * (x + 3)
                : 0
            }
          />
          <Plot.OfX
            y={(x) =>
              x <= -1 && x >= -3
                ? -1 * (x + 3) * (Math.pow(x + 2, 2) + 1) * (x + 1)
                : 0
            }
          />
          <Plot.OfX
            y={(x) =>
              x <= 1 && x >= -1
                ? -1 * (x + 1) * (Math.pow(x, 2) + 1) * (x - 1)
                : 0
            }
          />
          <Plot.OfX
            y={(x) =>
              x <= 3 && x >= 1
                ? -1 * (x - 1) * (Math.pow(x - 2, 2) + 1) * (x - 3)
                : 0
            }
          />
          <Plot.OfX
            y={(x) =>
              x <= 5 && x >= 3
                ? -1 * (x - 3) * (Math.pow(x - 4, 2) + 1) * (x - 5)
                : 0
            }
          />
        </Mafs>
  )
}
export default PeriodicSignal
