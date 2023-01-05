import { Callout } from 'nextra-theme-docs'
import * as React from 'react'
import useOnScreen from '../utils/general'

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

  const topRef = React.useRef<HTMLParagraphElement>(null)

  const isTopVisible = useOnScreen(topRef)

  function onExpansionChange() {
    let newState: boolean = !isExpanded

    if (newState === false) {
      if (!isTopVisible) {
        window.scroll({
          top:
            topRef.current!.getBoundingClientRect().top + window.scrollY - 150,
          left: 0,
          behavior: 'auto',
        })
      }
    } else {
      window.scroll({
        top: topRef.current!.getBoundingClientRect().top + window.scrollY - 150,
        left: 0,
        behavior: 'smooth',
      })
    }

    setIsExpanded(newState)
  }

  return (
    <Callout type={type} emoji={emoji}>
      <div className="flex flex-col justify-items-start content-start items-start">
        <p className="font-bold" ref={topRef}>
          {title}
        </p>
        <p>{isExpanded ? children : <></>}</p>
        <div className="text-xs">
          <input
            type="button"
            value={isExpanded ? '▲ Einklappen' : '▼ Ausklappen'}
            onClick={onExpansionChange}
          />
        </div>
      </div>
    </Callout>
  )
}

export default ExpandableCallout
