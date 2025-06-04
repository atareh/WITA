"use client"

import React, { useState } from "react"
import DebugAuth from "@/components/debug-auth"
import MigrationActionCard from "@/components/testMigration/MigrationActionCard"
import MigrationResultCard, { MigrationResult } from "@/components/testMigration/MigrationResultCard"
import { DatabaseIcon, ArrowRightIcon, ArrowLeftIcon, Loader2 } from "lucide-react"

export default function TestMigrationPage() {
  const [action1Loading, setAction1Loading] = useState(false)
  const [action1Result, setAction1Result] = useState<MigrationResult | null>(null)

  const [action2Loading, setAction2Loading] = useState(false)
  const [action2Result, setAction2Result] = useState<MigrationResult | null>(null)

  const runMigrationA = async () => {
    setAction1Loading(true)
    setAction1Result(null)
    try {
      const response = await fetch("/api/migrate/data-a", { method: "POST" })
      const data = await response.json()
      setAction1Result({
        success: response.ok,
        message: data.message || (response.ok ? "Migration A completed" : "Migration A failed"),
        timestamp: new Date().toISOString(),
        details: data,
        error: data.error,
      })
    } catch (error) {
      setAction1Result({
        success: false,
        message: "Network error during Migration A",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setAction1Loading(false)
    }
  }

  const runMigrationB = async () => {
    setAction2Loading(true)
    setAction2Result(null)
    try {
      const response = await fetch("/api/migrate/data-b", { method: "POST" })
      const data = await response.json()
      setAction2Result({
        success: response.ok,
        message: data.message || (response.ok ? "Migration B completed" : "Migration B failed"),
        timestamp: new Date().toISOString(),
        details: data,
        error: data.error,
      })
    } catch (error) {
      setAction2Result({
        success: false,
        message: "Network error during Migration B",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setAction2Loading(false)
    }
  }

  return (
    <DebugAuth title="Test Migration">
      <div className="min-h-screen text-white p-6" style={{ background: 'url("/images/back_lines.svg") 0% 0% / cover no-repeat #062723' }}>
        <div className="container mx-auto max-w-4xl space-y-8">
          <h1 className="text-3xl font-bold">Test Migration Page</h1>
          {/* Migration A */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MigrationActionCard
              title="Run Migration A"
              description="Migrate dataset A to the new schema"
              icon={<DatabaseIcon />}
              onClick={runMigrationA}
              loading={action1Loading}
              buttonContent="Run A"
              loadingContent={<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Running...</>}
            />
            <MigrationResultCard title="Result A" result={action1Result} icon={<ArrowRightIcon />} />
          </div>
          {/* Migration B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MigrationActionCard
              title="Run Migration B"
              description="Migrate dataset B to the new schema"
              icon={<DatabaseIcon />}
              onClick={runMigrationB}
              loading={action2Loading}
              buttonContent="Run B"
              loadingContent={<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Running...</>}
            />
            <MigrationResultCard title="Result B" result={action2Result} icon={<ArrowLeftIcon />} />
          </div>
        </div>
      </div>
    </DebugAuth>
  )
}