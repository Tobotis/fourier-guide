import * as React from 'react'
import { Mafs, FunctionGraph, CartesianCoordinates, Text } from '../mafs'
import FrameText from './FrameText'
const PeriodicSignal: React.FC = () => {
  return (
    <FrameText
      display={
        <Mafs
          height={200}
          yAxisExtent={[-1, 3]}
          xAxisExtent={[-5, 5]}
          width={400}
          pan={false}
        >
          <CartesianCoordinates
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />
          <FunctionGraph.OfX
            y={(x) =>
              x <= -3 && x >= -5
                ? -1 * (x + 5) * (Math.pow(x + 4, 2) + 1) * (x + 3)
                : 0
            }
          />
          <FunctionGraph.OfX
            y={(x) =>
              x <= -1 && x >= -3
                ? -1 * (x + 3) * (Math.pow(x + 2, 2) + 1) * (x + 1)
                : 0
            }
          />
          <FunctionGraph.OfX
            y={(x) =>
              x <= 1 && x >= -1
                ? -1 * (x + 1) * (Math.pow(x, 2) + 1) * (x - 1)
                : 0
            }
          />
          <FunctionGraph.OfX
            y={(x) =>
              x <= 3 && x >= 1
                ? -1 * (x - 1) * (Math.pow(x - 2, 2) + 1) * (x - 3)
                : 0
            }
          />
          <FunctionGraph.OfX
            y={(x) =>
              x <= 5 && x >= 3
                ? -1 * (x - 3) * (Math.pow(x - 4, 2) + 1) * (x - 5)
                : 0
            }
          />
        </Mafs>
      }
      text="Das Signal wurde somit künstlich erweitert. Diese Technik wird auch Periodisierung genannt. Obwohl man sich nur für einen bestimmten Abschnitt interessiert, lassen sich nun mathematische Werkzeuge für perdiodisches Verhalten anwenden."
    />
  )
}
export default PeriodicSignal
