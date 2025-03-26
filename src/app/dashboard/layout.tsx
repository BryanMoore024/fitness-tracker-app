'use client'

import NavBar from '@/components/NavBar'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/login')
    }
  }, [router])

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <NavBar />
      {children}
    </main>
  )
}
