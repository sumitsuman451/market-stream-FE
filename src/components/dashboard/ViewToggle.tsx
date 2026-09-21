import type { Dispatch, SetStateAction } from 'react'
import type { ViewMode } from '../../types/market'

export function ViewToggle({ view, setView }: { view: ViewMode; setView: Dispatch<SetStateAction<ViewMode>> }) {
  return (
    <div className="view-toolbar">
      <span className="view-label">View</span>
      <div className="view-toggle" role="group" aria-label="Market view">
        {(['cards', 'list'] as const).map((mode) => (
          <button className={view === mode ? 'active' : ''} key={mode} onClick={() => setView(mode)} type="button">
            {mode === 'cards' ? 'Cards' : 'List'}
          </button>
        ))}
      </div>
    </div>
  )
}