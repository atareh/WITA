"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface MigrationResult {
  success: boolean
  message: string
  timestamp: string
  details?: any
  error?: string
}

interface MigrationResultCardProps {
  title: string
  result: MigrationResult | null
  icon: React.ReactNode
}

export default function MigrationResultCard({ title, result, icon }: MigrationResultCardProps) {
  if (!result) return null

  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge
            variant={result.success ? "default" : "destructive"}
            className={result.success ? "bg-[#20a67d] text-black" : "bg-[#ed7188] text-white"}
          >
            {result.success ? "Success" : "Failure"}
          </Badge>
          <span className="text-[#868d8f] text-sm">{new Date(result.timestamp).toLocaleString()}</span>
        </div>
        <p className="text-[#868d8f] text-sm">{result.message}</p>
        {result.details && (
          <details className="text-sm">
            <summary className="text-[#51d2c1] cursor-pointer hover:text-white">View Details</summary>
            <pre className="mt-2 p-3 bg-[#2d5a4f] rounded text-xs overflow-auto text-white">
              {JSON.stringify(result.details, null, 2)}
            </pre>
          </details>
        )}
        {result.error && (
          <p className="text-[#ed7188] text-sm">Error: {result.error}</p>
        )}
      </CardContent>
    </Card>
  )
}