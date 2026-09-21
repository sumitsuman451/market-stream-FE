import { formatChange, formatPrice, getQuoteMetrics } from '../../lib/marketFormat'
import type { Quote } from '../../types/market'

export function QuoteCard({ quote }: { quote: Quote }) {
  const { change, percentChange, direction } = getQuoteMetrics(quote)
  return (
    <article className="quote-card">
      <div className="quote-topline">
        <span className="symbol">{quote.instrumentKey}</span>
        <span className={`direction ${direction}`}>{change === undefined ? 'NEW' : direction === 'positive' ? 'UP' : 'DOWN'}</span>
      </div>
      <div className="price">{formatPrice(quote.averagePrice)}</div>
      <div className={`change ${direction}`}>
        {change === undefined ? 'No prior window' : `${formatChange(change)} (${percentChange?.toFixed(2)}%)`}
      </div>
      <div className="quote-meta">
        <span>{quote.tickCount} ticks</span>
        <span>window ending {new Date(quote.windowEnd).toLocaleTimeString()}</span>
      </div>
    </article>
  )
}