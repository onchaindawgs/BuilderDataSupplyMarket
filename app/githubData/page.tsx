'use client'
import React, { useState } from 'react'
import { fetchGithubLanguages } from '@/utils/fetchGithubLanguages'

const Page = () => {
  const [username, setUsername] = useState('')
  const [data, setData] = useState<{ [key: string]: number } | null>(null)
  const [loading, setLoading] = useState(false)

    const fetchTopLanguages = async () => {
    try {
      const languages = await fetchGithubLanguages(username)
      setData(languages)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-12">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="px-3 py-2 border rounded"
        />
        <button
          onClick={fetchTopLanguages}
          disabled={loading || !username}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? 'Loading...' : 'Fetch Languages'}
        </button>
      </div>

      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Top Languages:</h2>
          <ul className="space-y-2">
            {Object.entries(data).map(([lang, percentage]) => (
              <li key={lang}>
                {lang}: {percentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Page
