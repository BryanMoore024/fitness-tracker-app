'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { format, parseISO, isAfter, isBefore } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

interface WeightLog {
  id: string
  logged_at: string
  weight: number
}

interface DailyLog {
  id: string
  logged_at: string
  calories: number
  protein: number
  carbs: number
  fat: number
  source: string
}

export default function ViewLogsPage() {
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([])
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchLogs = async () => {
      const { data: weights } = await supabase
        .from('weight_logs')
        .select('*')
        .order('logged_at', { ascending: true })

      const { data: daily } = await supabase
        .from('daily_logs')
        .select('*')
        .order('logged_at', { ascending: true })

      setWeightLogs(weights || [])
      setDailyLogs(daily || [])
    }

    fetchLogs()
  }, [])

  const isWithinDateRange = (dateString: string) => {
    const date = new Date(dateString)
    return (
      (!startDate || isAfter(date, new Date(startDate))) &&
      (!endDate || isBefore(date, new Date(endDate)))
    )
  }

  const filteredWeightLogs = weightLogs.filter(log => isWithinDateRange(log.logged_at))
  const filteredDailyLogs = dailyLogs.filter(log => isWithinDateRange(log.logged_at))

  const avgWeight = filteredWeightLogs.length
    ? (
        filteredWeightLogs.reduce((sum, log) => sum + log.weight, 0) /
        filteredWeightLogs.length
      ).toFixed(1)
    : 'N/A'

  const avgCalories = filteredDailyLogs.length
    ? (
        filteredDailyLogs.reduce((sum, log) => sum + log.calories, 0) /
        filteredDailyLogs.length
      ).toFixed(0)
    : 'N/A'

  const lastWeight = filteredWeightLogs[filteredWeightLogs.length - 1]?.weight || 'N/A'
  const lastCalories = filteredDailyLogs[filteredDailyLogs.length - 1]?.calories || 'N/A'

  const weightChartData = filteredWeightLogs.map((log) => ({
    date: format(parseISO(log.logged_at), 'MMM d'),
    weight: log.weight,
  }))

  const calorieChartData = filteredDailyLogs.map((log) => ({
    date: format(parseISO(log.logged_at), 'MMM d'),
    calories: log.calories,
  }))

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📈 Analytics</h1>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold">From:</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">To:</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-2 rounded" />
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">🧠 Summaries</h2>
        <ul className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded">
          <li><strong>Average Weight:</strong> {avgWeight} lbs</li>
          <li><strong>Last Recorded Weight:</strong> {lastWeight} lbs</li>
          <li><strong>Average Calories:</strong> {avgCalories}</li>
          <li><strong>Last Day Calories:</strong> {lastCalories}</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">📊 Weight Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightChartData}>
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">🔥 Daily Calories</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={calorieChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="calories" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  )
} 
