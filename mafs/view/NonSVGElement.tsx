import { Alignment } from '../../utils/general'
import { ScaleContextShape } from './ScaleContext'

export interface NonSVGProps {
  children?: Array<React.ReactNode> | React.ReactNode
  x?: number
  y?: number
  nonsvg?: boolean
  width?: number
  height?: number
  getScale?: () => ScaleContextShape
  align?: Alignment
}

export interface NonSVGWrapperProps {
  children: Array<React.ReactNode> | React.ReactNode
}

export const NonSVGElement: React.FC<NonSVGProps> = ({ children, x, y }) => {
  return <>{children}</>
}

export const NonSVGWrapper: React.FC<NonSVGWrapperProps> = ({ children }) => {
  return <>{children}</>
}
