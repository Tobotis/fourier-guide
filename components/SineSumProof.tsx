import * as React from 'react'
import { Mafs, FunctionGraph, Text, Polygon, Theme, Line } from '../mafs'
import { Angle } from '../utils/mafs_extended/Angle'
import FrameMafs from './FrameMafs'
const SineSumProof: React.FC = () => {
  return (
    <FrameMafs>
      <Mafs
        height={400}
        width={800}
        pan={false}
        xAxisExtent={[-0.2, 23.8]}
        yAxisExtent={[-1, 11]}
      >
        <Polygon
          points={[
            [5, 1],
            [9, 9],
            [17, 5],
          ]}
          fillOpacity={0}
          color="red"
        />
        <Angle
          position={[9, 9]}
          start_angle={4.25}
          end_angle={5.8}
          radius={1}
          label={'90°'}
        />
        <Angle
          position={[5, 1]}
          start_angle={0.32}
          end_angle={1.1}
          radius={3}
          label={'α'}
        />
        <Line.Segment point1={[5, 1]} point2={[5, 9]} color="red" />
        <Line.Segment point1={[5, 9]} point2={[9, 9]} color="red" />
        <Line.Segment point1={[9, 9]} point2={[17, 9]} />
        <Line.Segment point1={[5, 1]} point2={[17, 1]} />
        <Line.Segment point1={[17, 1]} point2={[17, 9]} />
        <Angle
          position={[5, 1]}
          start_angle={1.1}
          end_angle={Math.PI / 2}
          radius={3}
          label={'β'}
        />
        <Angle
          position={[17, 5]}
          start_angle={3.45}
          end_angle={(3 * Math.PI) / 2}
          radius={1.5}
          label={'α+β'}
        />
        <Text x={17.4} y={2.8} attach={'e'} size={20}>
          C
        </Text>
        <Text x={11} y={0.5} attach={'s'} size={20}>
          B
        </Text>
        <Text x={4.5} y={4.8} attach={'w'} size={20}>
          A
        </Text>
        <Text x={17.4} y={7.1} attach={'e'} size={20}>
          D
        </Text>
        <Text x={7} y={9.5} attach={'n'} size={20}>
          F
        </Text>
        <Text x={13.3} y={9.5} attach={'n'} size={20}>
          E
        </Text>
        <Text x={11} y={3.5} attach={'n'} size={20}>
          G = 1
        </Text>
        <Text x={7.8} y={5.5} attach={'e'} size={20}>
          I
        </Text>
        <Text x={12} y={6.5} attach={'e'} size={20}>
          H
        </Text>
        <Angle
          position={[17, 1]}
          start_angle={Math.PI / 2}
          end_angle={Math.PI}
          radius={1}
          label={'90°'}
        />
        <Angle
          position={[17, 9]}
          start_angle={Math.PI}
          end_angle={(Math.PI * 3) / 2}
          radius={1}
          label={'90°'}
        />
        <Angle
          position={[5, 9]}
          start_angle={(Math.PI * 3) / 2}
          end_angle={Math.PI * 2}
          radius={1}
          label={'90°'}
        />
        <Angle
          position={[9, 9]}
          start_angle={5.81}
          end_angle={Math.PI * 2}
          radius={3}
          label={'β'}
        />
      </Mafs>
    </FrameMafs>
  )
}
export default SineSumProof
