import type { NextPage } from 'next'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="min-w-[300px] bg-red-2"></div>
      <div className="flex grow flex-col">
        {children}
      </div>
    </div>
  )
}

export default Layout
