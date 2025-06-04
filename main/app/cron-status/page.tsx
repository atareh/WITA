"use client"

import React, { useState, useEffect } from "react"
import DebugAuth from "@/components/debug-auth"
import CronHeader from "@/components/cron/CronHeader"
import CronSummaryStats from "@/components/cron/CronSummaryStats"
import ScheduleCards from "@/components/cron/ScheduleCards"
import DataStatusCard from "@/components/cron/DataStatusCard"
import CronLogsList from "@/components/cron/CronLogsList"

interface CronLog {
  id: number
  execution_id: string
  cron_type: string
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

interface CronSummary {
  last_run: string
  next_scheduled: string
  daily_sync: { successful: number; failed: number }
  cmc_sync: { successful: number; failed: number }
  failed_runs: number
  total_runs: number
}

interface DataStatus {
  table: string
  status: string
  message?: string
  last_updated?: string
}

export default function CronStatusPage() {
  const [loading, setLoading] = useState(true)
  const [cronLogs, setCronLogs] = useState<CronLog[]>([])
  const [cronSummary, setCronSummary] = useState<CronSummary | null>(null)
  const [dataStatus, setDataStatus] = useState<DataStatus[]>([])
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const responses = await Promise.allSettled([
        fetch("/api/cron-logs").then((res) => res.json()),
        fetch("/api/cron-summary").then((res) => res.json()),
        fetch("/api/data-status").then((res) => res.json()),
      ])

      // Cron logs
      if (responses[0].status === "fulfilled") {
        setCronLogs(responses[0].value.cronLogs)
      } else {
        setCronLogs([])
      }

      // Cron summary
      if (responses[1].status === "fulfilled") {
        setCronSummary(responses[1].value.cronSummary)
      }

      // Data status
      if (responses[2].status === "fulfilled") {
        setDataStatus(responses[2].value.dataStatus)
      }
    } catch (error) {
      console.error("Error fetching status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleExpand = (id: number) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <DebugAuth title="Cron Status">
      <div className="min-h-screen text-white p-6" style={{ background: 'url("/images/back_lines.svg") 0% 0% / cover no-repeat #062723' }}>
        <div className="container mx-auto max-w-6xl space-y-6">
          <CronHeader loading={loading} onRefresh={fetchStatus} />
          {!loading && cronSummary && <CronSummaryStats cronSummary={cronSummary} formatTime={(ts) => new Date(ts).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" })} />}
          {!loading && cronSummary && <ScheduleCards cronSummary={cronSummary} />}
          {!loading && <DataStatusCard dataStatus={dataStatus} />}
          {!loading && <CronLogsList cronLogs={cronLogs} expandedLogs={expandedLogs} onToggleExpand={handleToggleExpand} />}
        </div>
      </div>
    </DebugAuth>
  )
}