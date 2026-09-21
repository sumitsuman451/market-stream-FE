import { useState } from 'react'
import { HistoryPanel } from './components/market/HistoryPanel'
import { MarketViews } from './components/market/MarketViews'
import { Summary } from './components/dashboard/Summary'
import { ViewToggle } from './components/dashboard/ViewToggle'
import { useMarketData } from './hooks/useMarketData'
import type { ViewMode } from './types/market'
import './App.css'

function App() {
  const { quotes, history, connected } = useMarketData()
  const [view, setView] = useState<ViewMode>('cards')
  const [activeTab, setActiveTab] = useState<'market' | 'history'>('market')

  return (
    <main className="dashboard">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Market home">
          <span className="brand-mark">m</span>
          <span>market</span>
        </a>
        <div className="nav-links">
          <a className="selected" href="#overview">Overview</a>
          <a href="#markets">Markets</a>
          <a href="#watchlist">Watchlist</a>
        </div>
        <div className="profile-chip">
          <span className="profile-avatar">S</span>
          <span>Live account</span>
        </div>
      </nav>

      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Good morning, investor</h1>
          <p className="subtitle">Track your market watchlist in real time.</p>
        </div>
        <div className={`connection ${connected ? 'is-live' : ''}`}>
          <span className="connection-dot" />
          {connected ? 'Live' : 'Connecting'}
        </div>
      </header>

      <Summary quotes={quotes} />

      <div className="section-tabs" role="tablist" aria-label="Market data sections">
        <button
          className={activeTab === 'market' ? 'active' : ''}
          id="market-tab"
          onClick={() => setActiveTab('market')}
          role="tab"
          aria-controls="market-panel"
          aria-selected={activeTab === 'market'}
          type="button"
        >
          Live market
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          id="history-tab"
          onClick={() => setActiveTab('history')}
          role="tab"
          aria-controls="history-panel"
          aria-selected={activeTab === 'history'}
          type="button"
        >
          History
        </button>
      </div>

      {activeTab === 'market' ? (
        <section id="market-panel" role="tabpanel" aria-labelledby="market-tab">
          <div className="market-heading" id="markets">
            <div>
              <p className="section-kicker">Your watchlist</p>
              <h2>Market overview</h2>
            </div>
            <ViewToggle view={view} setView={setView} />
          </div>
          <div className={view === 'cards' ? 'quotes' : 'quotes list-view'} id="watchlist" aria-live="polite">
            <MarketViews quotes={quotes} view={view} />
          </div>
        </section>
      ) : (
        <div id="history-panel" role="tabpanel" aria-labelledby="history-tab">
          <HistoryPanel history={history} />
        </div>
      )}
    </main>
  )
}

export default App
