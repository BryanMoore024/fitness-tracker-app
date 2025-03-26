'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { format, toZonedTime } from 'date-fns-tz'

const easternTimeZone = 'America/New_York'
const nowEastern = format(toZonedTime(new Date(), easternTimeZone), "yyyy-MM-dd'T'HH:mm")

export default function LogWorkoutPage() {
  const [loggedAt, setLoggedAt] = useState(nowEastern)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const { error } = await supabase.from('workouts').insert([
      {
        logged_at: loggedAt,
        type,
        description,
      }
    ])
  
    if (error) {
      console.error('❌ Supabase Error:', error)
      alert(`❌ Error saving workout: ${error.message || JSON.stringify(error)}`)
    } else {
      alert('✅ Workout logged!')
      router.push('/dashboard')
    }
  }
  

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Log Workout</h1>

      <input
        type="datetime-local"
        value={loggedAt}
        onChange={(e) => setLoggedAt(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        placeholder="Workout Type (e.g. Cardio, Strength)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-3"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Log Workout
      </button>
    </main>
  )
}
