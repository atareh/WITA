"use client"

import React, { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import DashboardSummary from "@/components/dashboard/DashboardSummary"
import DashboardTable from "@/components/dashboard/DashboardTable"

interface DuneResult {
  id: number
  execution_id: string
  query_id: number
  block_day: string
  address_count: number
  deposit: number
  withdraw: number
  netflow: number
  total_wallets: number
  tvl: number
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const [data, setData] = useState<DuneResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDuneData()
  }, [])

  const fetchDuneData = async () => {
    try {
      const response = await fetch("/api/dune-data")
      if (!response.ok) throw new Error("Failed to fetch data")
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const latestData = data.length > 0 ? data[data.length - 1] : null
  const totalTVL = latestData?.tvl || 0
  const totalAddresses = latestData?.address_count || 0
  const netFlow = latestData?.netflow || 0
  const totalDeposits = data.reduce((sum, item) => sum + (item.deposit || 0), 0)
  const totalWithdrawals = data.reduce((sum, item) => sum + Math.abs(item.withdraw || 0), 0)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading dashboard...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <main className="container mx-auto px-4 py-8 space-y-10">
        <DashboardSummary
          totalTVL={totalTVL}
          totalAddresses={totalAddresses}
          netFlow={netFlow}
          totalDeposits={totalDeposits}
          totalWithdrawals={totalWithdrawals}
        />
        <DashboardTable data={data} />
      </main>
    </DashboardLayout>
  )
}