import { useEffect, useState } from 'react'
import type { AveragePrice, Quote, StoredAverage } from '../types/market'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

function applyAverages(current: Record<string, Quote>, averages: AveragePrice[]) {
  const updated = { ...current }
  averages.forEach((average) => {
    updated[average.instrumentKey] = {
      ...average,
      previousPrice: current[average.instrumentKey]?.averagePrice,
    }
  })
  return updated
}

export function useMarketData() {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({})
  const [history, setHistory] = useState<StoredAverage[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const source = new EventSource(`${apiBaseUrl}/api/averages/stream`)
    const updateQuotes = (averages: AveragePrice[]) => setQuotes((current) => applyAverages(current, averages))
    const handleSnapshot = (event: MessageEvent<string>) => updateQuotes(JSON.parse(event.data) as AveragePrice[])
    const handleAverage = (event: MessageEvent<string>) => updateQuotes([JSON.parse(event.data) as AveragePrice])

    source.addEventListener('open', () => setConnected(true))
    source.addEventListener('snapshot', handleSnapshot)
    source.addEventListener('average', handleAverage)
    source.addEventListener('error', () => setConnected(false))

    return () => source.close()
  }, [])

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/averages/history?limit=12`)
      .then((response) => {
        if (!response.ok) throw new Error('History request failed')
        return response.json() as Promise<StoredAverage[]>
      })
      .then(setHistory)
      .catch(() => setHistory([]))
  }, [])

  return {
    quotes: Object.values(quotes).sort((a, b) => a.instrumentKey.localeCompare(b.instrumentKey)),
    history,
    connected,
  }
}