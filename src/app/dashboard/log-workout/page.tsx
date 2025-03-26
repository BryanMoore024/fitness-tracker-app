'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { format, toZonedTime } from 'date-fns-tz'


const easternTimeZone = 'America/New_York'
const nowEastern = format(toZonedTime(new Date(), easternTimeZone), "yyyy-MM-dd'T'HH:mm")


export default function LogWeightPage() {
  const [loggedAt, setLoggedAt] = useState(nowEastern)
  const [weight, setWeight] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const { error } = await supabase.from('weight_logs').insert([
      {
        logged_at: loggedAt,
        weight: parseFloat(weight)
      }
    ])

    if (error) {
      alert('❌ Error saving weight: ' + error.message)
    } else {
      alert('✅ Weight logged!')
      router.push('/dashboard')
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Log Weight</h1>

      <input
        type="datetime-local"
        value={loggedAt}
        onChange={(e) => setLoggedAt(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        placeholder="Weight (lbs)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Log Weight
      </button>
    </main>
  )
}