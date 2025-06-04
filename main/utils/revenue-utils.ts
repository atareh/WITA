export interface RevenueData {
  data: Array<{
    day: string
    revenue: number
    annualized_revenue: number
  }>
  source: string
  error?: string
}

export const formatRevenue = (revenue: number): string => {
  if (revenue >= 1e6) return `$${(revenue / 1e6).toFixed(2)}M`
  if (revenue >= 1e3) return `$${(revenue / 1e3).toFixed(2)}K`
  return `$${revenue.toFixed(2)}`
}

export interface TestResult {
  success: boolean
  message: string
  timestamp: string
  result?: any
  error?: string
}