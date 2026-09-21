import { getQuoteMetrics } from '../../lib/marketFormat'
import type { Quote } from '../../types/market'

export function Summary({ quotes }: { quotes: Quote[] }) {
  const risingCount = quotes.filter((quote) => getQuoteMetrics(quote).direction === 'positive').length
  const latestWindow = quotes.reduce((latest, quote) => Math.max(latest, quote.windowEnd), 0)
  const items: Array<[string, string | number, string, string]> = [
    ['Tracked instruments', quotes.length || '--', 'Live watchlist', ''],
    ['Moving up', quotes.length ? risingCount : '--', 'Current window', 'summary-positive'],
    ['Last updated', latestWindow ? new Date(latestWindow).toLocaleTimeString() : '--', 'Five-second average', ''],
  ]

  return (
    <section className="summary-grid" id="overview" aria-label="Market summary">
      {items.map(([label, value, note, className]) => (
        <div className="summary-item" key={label}>
          <span className="summary-label">{label}</span>
          <strong className={className}>{value}</strong>
          <span className="summary-note">{note}</span>
        </div>
      ))}
    </section>
  )
}