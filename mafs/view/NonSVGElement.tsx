import { MathText } from '../../utils/mafs_extended/MathText'


export interface NonSVGProps {
  children: Array<React.ReactNode> | React.ReactNode
  x: number
  y: number
  nonsvg: boolean
}

export const NonSVG: React.FC<NonSVGProps> = ({ children, x, y }) => {
  return <>{children}</>
}


export const NonSVGElements = {
  MathText,
}
