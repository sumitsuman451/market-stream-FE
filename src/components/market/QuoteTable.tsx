import { formatChange, formatPrice, getQuoteMetrics } from '../../lib/marketFormat'
import type { Quote } from '../../types/market'

export function QuoteTable({ quotes }: { quotes: Quote[] }) {
  return (
    <div className="table-wrap">
      <table className="quote-table">
        <thead><tr><th>Instrument</th><th>Latest average</th><th>Change</th><th>Percent</th><th>Ticks</th><th>Window ending</th></tr></thead>
        <tbody>
          {quotes.map((quote) => {
            const { change, percentChange, direction } = getQuoteMetrics(quote)
            return <tr key={quote.instrumentKey}><th scope="row">{quote.instrumentKey}</th><td className="table-price">{formatPrice(quote.averagePrice)}</td><td className={direction}>{formatChange(change)}</td><td className={direction}>{formatChange(percentChange, '%')}</td><td>{quote.tickCount}</td><td>{new Date(quote.windowEnd).toLocaleTimeString()}</td></tr>
          })}
        </tbody>
      </table>
    </div>
  )
}