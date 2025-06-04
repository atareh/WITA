"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CronSummary {
  last_run: string
  next_scheduled: string
  daily_sync: { successful: number; failed: number }
  cmc_sync: { successful: number; failed: number }
  failed_runs: number
  total_runs: number
}

interface CronSummaryStatsProps {
  cronSummary: CronSummary
  formatTime: (dateString: string) => string
}

export default function CronSummaryStats({ cronSummary, formatTime }: CronSummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{cronSummary.last_run ? formatTime(cronSummary.last_run) : "Never"}</div>
            <div className="text-sm text-[#868d8f]">Last Run</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{formatTime(cronSummary.next_scheduled)}</div>
            <div className="text-sm text-[#868d8f]">Next Scheduled</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#20a67d]">{cronSummary.daily_sync.successful}</div>
            <div className="text-sm text-[#868d8f]">Daily Sync Success</div>
            <div className="text-2xl font-bold text-[#ed7188]">{cronSummary.daily_sync.failed}</div>
            <div className="text-sm text-[#868d8f]">Daily Sync Failed</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#20a67d]">{cronSummary.cmc_sync.successful}</div>
            <div className="text-sm text-[#868d8f]">CMC Sync Success</div>
            <div className="text-2xl font-bold text-[#ed7188]">{cronSummary.cmc_sync.failed}</div>
            <div className="text-sm text-[#868d8f]">CMC Sync Failed</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ed7188]">{cronSummary.failed_runs}</div>
            <div className="text-sm text-[#868d8f]">Failed Runs</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{cronSummary.total_runs}</div>
            <div className="text-sm text-[#868d8f]">Total Runs</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}