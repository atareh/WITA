"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"
import { getStatusIcon, getStatusBadge, formatTime, formatDuration } from "@/utils/cron-utils"

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

interface CronLogItemProps {
  log: CronLog
  isExpanded: boolean
  onToggleExpand: (id: number) => void
}

export default function CronLogItem({ log, isExpanded, onToggleExpand }: CronLogItemProps) {
  return (
    <div className="border border-[#2d5a4f] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {getStatusIcon(log.status)}
          <div>
            <div className="font-medium">{log.execution_id}</div>
            <div className="text-sm text-[#868d8f]">{formatTime(log.started_at)}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(log.status)}{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(log.id)}
            className="text-[#868d8f] hover:text-white"
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-2 text-xs text-[#868d8f]">
        <span>{formatDuration(log.duration_ms)}</span>
        <span className="text-[#20a67d]">Success: {log.success_count}</span>
        <span className="text-[#ed7188]">Errors: {log.error_count}</span>
        {log.completed_at && <span>Completed: {formatTime(log.completed_at)}</span>}
      </div>
      {log.error_message && (
        <div className="mt-2 p-2 bg-[#ed7188]/10 border border-[#ed7188] rounded text-sm">
          <span className="text-[#ed7188]">Error:</span> {log.error_message}
        </div>
      )}
      {isExpanded && log.results && (
        <div className="mt-4 space-y-2">
          {log.results.progress && (
            <div>
              <h4 className="font-medium mb-2">Progress Log:</h4>
              <div className="bg-[#2d5a4f] rounded p-3 text-xs space-y-1 max-h-40 overflow-y-auto">
                {log.results.progress.map((entry, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-[#868d8f]">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                    <span>{entry.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {log.results.details && (
            <div>
              <h4 className="font-medium mb-2">Details:</h4>
              <div className="bg-[#2d5a4f] rounded p-3 text-sm space-y-1">
                {log.results.details.map((item, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm text-[#868d8f] mb-1">{item.message || "No additional info"}</p>
                    {item.last_updated && (
                      <p className="text-xs text-[#868d8f]">
                        Last updated: {formatTime(item.last_updated)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}