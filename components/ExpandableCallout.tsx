import { Callout } from 'nextra-theme-docs'
import * as React from 'react'

interface ExpandableCalloutProps {
  children: JSX.Element
  type: any
  emoji: string | React.ReactElement
  title: string | React.ReactElement
}

const ExpandableCallout = ({
  children,
  type,
  emoji,
  title,
}: ExpandableCalloutProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <Callout type={type} emoji={emoji}>
      <div className="flex flex-col justify-items-start content-start items-start">
        <p className="font-bold">{title}</p>
        <p>{isExpanded ? children : <></>}</p>
        <div className="text-xs">
          <input
            type="button"
            value={isExpanded ? '▲ Einklappen' : '▼ Ausklappen'}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          />
        </div>
      </div>
    </Callout>
  )
}

export default ExpandableCallout
