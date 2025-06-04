"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { formatRevenue, RevenueData } from "@/utils/revenue-utils"

interface RevenueDataCardProps {
  title: string
  data: RevenueData | null
  loading: boolean
  error: string | null
}

export default function RevenueDataCard({ title, data, loading, error }: RevenueDataCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 rounded">
            <p className="text-red-600">{error}</p>
          </div>
        ) : data ? (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Latest Day</p>
              <p className="text-lg font-semibold">{data.data?.[0]?.day || "N/A"}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Daily Revenue</p>
              <p className="text-2xl font-bold">{formatRevenue(data.data?.[0]?.revenue || 0)}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Annualized Revenue</p>
              <p className="text-xl font-semibold">{formatRevenue(data.data?.[0]?.annualized_revenue || 0)}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Data Source</p>
              <p className="text-sm font-mono">{data.source || "unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Recent Days</p>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {(data.data || []).slice(0, 7).map((day: any) => (
                  <div key={day.day} className="flex justify-between items-center">
                    <span className="text-sm">{day.day}</span>
                    <span className="text-sm">{formatRevenue(day.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  )
}