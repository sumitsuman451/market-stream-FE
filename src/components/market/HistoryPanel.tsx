import { formatPrice } from '../../lib/marketFormat'
import type { StoredAverage } from '../../types/market'

export function HistoryPanel({ history }: { history: StoredAverage[] }) {
  return (
    <section className="history-section" aria-labelledby="history-title">
      <div className="history-heading"><div><p className="section-kicker">From MySQL</p><h2 id="history-title">Recent activity</h2></div><span className="history-caption">Last 12 stored windows</span></div>
      {history.length === 0 ? <div className="history-empty">Stored market activity will appear here.</div> : <div className="history-list">
        {history.map((average) => <div className="history-row" key={average.id}><span className="history-symbol">{average.instrumentKey}</span><span className="history-price">{formatPrice(average.averagePrice)}</span><span>{average.tickCount} ticks</span><time dateTime={average.createdAt}>{new Date(average.windowEnd).toLocaleTimeString()}</time></div>)}
      </div>}
    </section>
  )
}