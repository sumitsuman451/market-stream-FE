import type { Quote } from '../types/market'

export type QuoteMetrics = {
  change?: number
  percentChange?: number
  direction: 'positive' | 'negative' | ''
}

const priceFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function getQuoteMetrics(quote: Quote): QuoteMetrics {
  const { previousPrice } = quote
  const change = previousPrice === undefined ? undefined : quote.averagePrice - previousPrice
  const percentChange = change === undefined || previousPrice === undefined || previousPrice === 0
    ? undefined
    : (change / previousPrice) * 100

  return { change, percentChange, direction: change === undefined ? '' : change >= 0 ? 'positive' : 'negative' }
}

export function formatPrice(price: number) {
  return priceFormatter.format(price)
}

export function formatChange(value?: number, suffix = '') {
  return value === undefined ? '--' : `${value >= 0 ? '+' : ''}${value.toFixed(2)}${suffix}`
}