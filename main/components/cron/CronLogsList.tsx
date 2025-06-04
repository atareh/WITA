"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import CronLogItem from "./CronLogItem"

interface CronLog {
  id: number
  execution_id: string
  status: string
  started_at: string
  completed_at?: string
  duration_ms?: number
  success_count?: number
  error_count?: number
  error_message?: string
  results?: {
    progress?: { timestamp: string; message: string }[]
    details?: { message?: string; last_updated?: string }[]
  }
}

interface CronLogsListProps {
  cronLogs: CronLog[]
  expandedLogs: Set<number>
  onToggleExpand: (id: number) => void
}

export default function CronLogsList({ cronLogs, expandedLogs, onToggleExpand }: CronLogsListProps) {
  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardHeader>
        <CardTitle>Recent Cron Executions</CardTitle>
      </CardHeader>
      <CardContent>
        {cronLogs.length === 0 ? (
          <p className="text-[#868d8f] text-center py-8">No cron executions found</p>
        ) : (
          <div className="space-y-4">
            {cronLogs.map((log) => (
              <CronLogItem
                key={log.id}
                log={log}
                isExpanded={expandedLogs.has(log.id)}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}