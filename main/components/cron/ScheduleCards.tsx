"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { getStatusBadge, formatTime } from "@/utils/cron-utils"

interface ScheduleCardsProps {
  cronSummary: any
}

export default function ScheduleCards({ cronSummary }: ScheduleCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#51d2c1]" />
            Dune Sync (6am & 6pm ET)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#868d8f]">Last Run</p>
              <p className="text-lg">{cronSummary.last_run ? formatTime(cronSummary.last_run) : "Never"}</p>
            </div>
            <div>
              <p className="text-sm text-[#868d8f]">Next Scheduled</p>
              <p className="text-lg">{formatTime(cronSummary.next_scheduled)}</p>
            </div>
            <div className="text-sm">
              <span className="text-[#20a67d]">{cronSummary.daily_sync.successful || 0}</span> successful,
              <span className="text-[#ed7188] ml-1">{cronSummary.daily_sync.failed || 0}</span> failed
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#51d2c1]" />
            CMC Sync (every hour)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#868d8f]">Last Run</p>
              <p className="text-lg">{cronSummary.last_run ? formatTime(cronSummary.last_run) : "Never"}</p>
            </div>
            <div>
              <p className="text-sm text-[#868d8f]">Next Scheduled</p>
              <p className="text-lg">{formatTime(cronSummary.next_scheduled)}</p>
            </div>
            <div className="text-sm">
              <span className="text-[#20a67d]">{cronSummary.cmc_sync.successful || 0}</span> successful,
              <span className="text-[#ed7188] ml-1">{cronSummary.cmc_sync.failed || 0}</span> failed
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}