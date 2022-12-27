import * as React from 'react'
import { Mafs, FunctionGraph, Text, Polygon } from '../mafs'
import { Angle } from '../utils/mafs_extended/Angle'
import FrameMafs from './FrameMafs'
const TrigDef: React.FC = () => {
  return (
    <FrameMafs>
      <Mafs
        pan={false}
        height={200}
        xAxisExtent={[-0.5, 3.5]}
        yAxisExtent={[-0.5, 1.2]}
      >
        <Angle
          position={[0, 0]}
          start_angle={0}
          end_angle={0.46}
          radius={1}
          label={'φ'}
        />
        <Polygon
          points={[
            [0, 0],
            [2, 0],
            [2, 1],
          ]}
          fillOpacity={0}
        />
        <Text x={2.1} y={0.5} attach={'e'}>
          Gegenkathete
        </Text>
        <Text x={1} y={-0.1} attach={'s'}>
          Ankathete
        </Text>
        <Text x={1.1} y={0.7} attach={'w'}>
          Hypotenuse
        </Text>
      </Mafs>
    </FrameMafs>
  )
}
export default TrigDef
