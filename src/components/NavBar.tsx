'use client'

import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4 justify-center mb-6">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/log-weight">Log Weight</Link>
      <Link href="/dashboard/log-workout">Log Workout</Link>
      <Link href="/dashboard/view-logs">View Logs</Link>
    </nav>
  )
}