import { QuoteCard } from './QuoteCard'
import { QuoteTable } from './QuoteTable'
import type { Quote, ViewMode } from '../../types/market'

export function MarketViews({ quotes, view }: { quotes: Quote[]; view: ViewMode }) {
  if (quotes.length === 0) return <div className="empty-state">Waiting for the first market update...</div>
  return view === 'list' ? <QuoteTable quotes={quotes} /> : quotes.map((quote) => <QuoteCard key={quote.instrumentKey} quote={quote} />)
}