"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, DollarSign, ArrowUpDown } from "lucide-react"
import { formatCurrency, formatNumber } from "@/utils/format-utils"

interface DashboardSummaryProps {
  totalTVL: number
  totalAddresses: number
  netFlow: number
  totalDeposits: number
  totalWithdrawals: number
}

export default function DashboardSummary({
  totalTVL,
  totalAddresses,
  netFlow,
  totalDeposits,
  totalWithdrawals,
}: DashboardSummaryProps) {
  return (
    <section>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Wallets */}
        <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#868d8f]">Total Addresses</CardTitle>
            <Users className="h-4 w-4 text-[#51d2c1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-teodor">{formatNumber(totalAddresses)}</div>
            <p className="text-xs text-[#868d8f]">Unique addresses</p>
          </CardContent>
        </Card>

        {/* Total TVL */}
        <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#868d8f]">Total TVL</CardTitle>
            <DollarSign className="h-4 w-4 text-[#51d2c1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-teodor">{formatCurrency(totalTVL)}</div>
            <p className="text-xs text-[#868d8f]">TVL (USD)</p>
          </CardContent>
        </Card>

        {/* Net Flow */}
        <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#868d8f]">Net Flow</CardTitle>
            {netFlow >= 0 ? (
              <TrendingUp className="h-4 w-4 text-[#20a67d]" />
            ) : (
              <TrendingDown className="h-4 w-4 text-[#ed7188]" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={\`text-2xl font-bold font-teodor \${
                netFlow >= 0 ? "text-[#20a67d]" : "text-[#ed7188]"
              }\`}
            >
              {formatCurrency(netFlow)}
            </div>
            <p className="text-xs text-[#868d8f]">{netFlow >= 0 ? "Net inflow" : "Net outflow"}</p>
          </CardContent>
        </Card>

        {/* Total Volume */}
        <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#868d8f]">Total Volume</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-[#51d2c1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-teodor">
              {formatCurrency(totalDeposits + totalWithdrawals)}
            </div>
            <p className="text-xs text-[#868d8f]">Deposits + Withdrawals</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}