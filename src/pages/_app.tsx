import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useToast } from '@axieinfinity/matcha'
import { Work_Sans } from 'next/font/google'
import { Providers } from '@/contexts/providers'
import '@/styles/globals.scss'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps }: AppProps & { Component: NextPage & { getLayout?: (page: React.ReactNode) => React.ReactNode } }) {
  const getLayout = Component.getLayout ?? (page => page)

  const { contextHolder } = useToast({
    closable: true,
    maxCount: 1,
  })

  return (
    <div>
      <style jsx global>
        {`
        :root {
          --font-work-sans: ${workSans.style.fontFamily};
        }
      `}
      </style>
      <Providers>
        {getLayout(<Component {...pageProps} />)}
      </Providers>
      {contextHolder}
    </div>
  )
}
