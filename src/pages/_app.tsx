import type { AppProps } from 'next/app'
import { Work_Sans } from 'next/font/google'
import '@/styles/globals.scss'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <style jsx global>
        {`
        :root {
          --font-work-sans: ${workSans.style.fontFamily};
        }
      `}
      </style>
      <Component {...pageProps} />
    </div>
  )
}
