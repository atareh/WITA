"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface CronHeaderProps {
  loading: boolean
  onRefresh: () => void
}

export default function CronHeader({ loading, onRefresh }: CronHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Cron Status</h1>
      <Button onClick={onRefresh} disabled={loading}>
        {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
        Refresh
      </Button>
    </div>
  )
}