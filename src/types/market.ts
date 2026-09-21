export type AveragePrice = {
  instrumentKey: string
  averagePrice: number
  tickCount: number
  windowStart: number
  windowEnd: number
}

export type Quote = AveragePrice & { previousPrice?: number }
export type StoredAverage = AveragePrice & { id: number; createdAt: string }
export type ViewMode = 'cards' | 'list'