import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { routes } from '@/configs/routes'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace(routes.connect.path)
  }, [router])

  return null
}
