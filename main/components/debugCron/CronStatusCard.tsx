"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle } from "lucide-react"

interface CronResult {
  status: number
  ok: boolean
  data?: any
  error?: string
  timestamp: string
}

interface CronStatusCardProps {
  result: CronResult | null
}

export default function CronStatusCard({ result }: CronStatusCardProps) {
  if (!result) return null

  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl mb-6">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-white">
          <Clock /> Cron Run Status
        </CardTitle>
        <Badge
          variant={result.ok ? "default" : "destructive"}
          className={result.ok ? "bg-[#20a67d] text-black" : "bg-[#ed7188] text-white"}
        >
          {result.ok ? "OK" : "Error"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-[#868d8f]">
        <p>HTTP Status: {result.status}</p>
        {result.data && (
          <details className="text-sm">
            <summary className="text-[#51d2c1] cursor-pointer hover:text-white">View Response Data</summary>
            <pre className="mt-2 p-3 bg-[#2d5a4f] rounded text-xs overflow-auto text-white">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        )}
        {result.error && (
          <p className="flex items-center gap-2 text-[#ed7188]">
            <AlertCircle />
            {result.error}
          </p>
        )}
        <p className="text-sm">Timestamp: {new Date(result.timestamp).toLocaleString()}</p>
      </CardContent>
    </Card>
  )
}