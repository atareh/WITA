"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getStatusIcon, getStatusBadge, formatTime } from "@/utils/cron-utils"

interface DataStatus {
  table: string
  status: string
  message?: string
  last_updated?: string
}

interface DataStatusCardProps {
  dataStatus: DataStatus[]
}

export default function DataStatusCard({ dataStatus }: DataStatusCardProps) {
  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl mb-6">
      <CardHeader>
        <CardTitle>Data Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataStatus.map((item, index) => (
            <div key={index} className="border border-[#2d5a4f] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium">{item.table}</span>
                </div>
                {getStatusBadge(item.status)}
              </div>
              <p className="text-sm text-[#868d8f] mb-1">{item.message || "No additional info"}</p>
              {item.last_updated && (
                <p className="text-xs text-[#868d8f]">Last updated: {formatTime(item.last_updated)}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}