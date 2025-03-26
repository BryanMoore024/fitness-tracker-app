
export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">🏋️ Dashboard</h1>
      <p className="mb-6">Welcome to your private fitness tracker.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/dashboard/log-weight"
          className="block bg-blue-500 text-white text-center p-4 rounded shadow hover:bg-blue-600"
        >
          ➕ Log Weight
        </a>

        <a
          href="/dashboard/log-workout"
          className="block bg-green-500 text-white text-center p-4 rounded shadow hover:bg-green-600"
        >
          🏋️ Log Workout
        </a>

        <a
          href="/dashboard/view-logs"
          className="block bg-purple-500 text-white text-center p-4 rounded shadow hover:bg-purple-600"
        >
          📊 View Logs
        </a>
      </div>
    </>
  )
}
