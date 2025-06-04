"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { formatCurrency, formatNumber, formatDate } from "@/utils/format-utils"

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

interface DashboardTableProps {
  data: DuneResult[]
}

export default function DashboardTable({ data }: DashboardTableProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">DeFi Analytics Dashboard</h2>
      <p className="text-[#868d8f] mb-6">Real-time insights from Dune Analytics</p>

      {/* Data Table */}
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#161f23]">
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-right">TVL</th>
                  <th className="p-4 text-right">Wallets</th>
                  <th className="p-4 text-right">Deposits</th>
                  <th className="p-4 text-right">Withdrawals</th>
                  <th className="p-4 text-right">Net Flow</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b border-[#17262a]">
                    <td className="p-4">{formatDate(item.block_day)}</td>
                    <td className="p-4 text-right">
                      <div className="font-medium text-white">{formatCurrency(item.tvl)}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Users className="h-3 w-3 text-[#51d2c1]" />
                        <span className="text-white">{formatNumber(item.address_count)}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant="outline" className="text-[#20a67d] border-[#20a67d] bg-[#20a67d]/10">
                        +{formatCurrency(item.deposit)}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant="outline" className="text-[#ed7188] border-[#ed7188] bg-[#ed7188]/10">
                        {formatCurrency(item.withdraw)}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Badge
                        variant="outline"
                        className={
                          item.netflow >= 0
                            ? "text-[#20a67d] border-[#20a67d] bg-[#20a67d]/10"
                            : "text-[#ed7188] border-[#ed7188] bg-[#ed7188]/10"
                        }
                      >
                        {item.netflow >= 0 ? "+" : ""}
                        {formatCurrency(item.netflow)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}