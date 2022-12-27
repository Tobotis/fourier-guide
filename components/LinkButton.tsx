import * as React from 'react'
import Link from 'next/link'

/*
USAGE:

<LinkButton
  href={'../trigonometric-identities/1-sine-angle-sum'}
  text={'Sinus-Winkelsummen-Identität'}
/>

*/

type LinkButtonProps = {
  href: string
  text: string
}

const LinkButton = ({ href, text }: LinkButtonProps) => {
  return (
    <div className="container pt-5 px-5 mx-0 min-w-full flex flex-col items-center">
      <Link href={href}>
        <a className="p-4  hover:text-gray-900 dark:hover:text-neutral-50 rounded-lg border-2 border-gray-400 bg-transparent no-underline shadow-sm shadow-gray-100 transition-all duration-200 dark:border-neutral-800 dark:shadow-none hover:border-gray-300 hover:bg-slate-50 hover:shadow-md hover:shadow-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:shadow-none active:shadow-sm active:shadow-gray-200">
          {text}
        </a>
      </Link>
    </div>
  )
}
export default LinkButton
