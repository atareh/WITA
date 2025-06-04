"use client"

import React, { useState } from "react"
import DebugAuth from "@/components/debug-auth"
import TestCronButton from "@/components/debugCron/TestCronButton"
import CronStatusCard from "@/components/debugCron/CronStatusCard"
import TroubleshootingTips from "@/components/debugCron/TroubleshootingTips"

export default function DebugCronPage() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testCronEndpoint = async () => {
    setTesting(true)
    setResult(null)

    try {
      const response = await fetch("/api/cron/daily-dune-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      setResult({
        status: response.status,
        ok: response.ok,
        data,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setResult({
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <DebugAuth title="Debug Cron">
      <div
        className="min-h-screen text-white p-6"
        style={{
          background: 'url("/images/back_lines.svg") 0% 0% / cover no-repeat #062723',
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Debug Cron Job</h1>
          <div className="mb-6">
            <TestCronButton onClick={testCronEndpoint} loading={testing} />
          </div>
          <CronStatusCard result={result} />
          <TroubleshootingTips />
        </div>
      </div>
    </DebugAuth>
}