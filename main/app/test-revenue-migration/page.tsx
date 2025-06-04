"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"
import RevenueDataCard from "@/components/testRevenue/RevenueDataCard"
import SyncRevenueCard from "@/components/testRevenue/SyncRevenueCard"
import { formatRevenue, TestResult, RevenueData } from "@/utils/revenue-utils"

// Basic auth check hook
function useAuthCheck() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("debug-token")
    if (token === "your-debug-token") {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
    setIsChecking(false)
  }, [router])

  return { isAuthorized, isChecking }
}

export default function TestRevenueMigrationPage() {
  const { isAuthorized, isChecking } = useAuthCheck()

  const [llamaLoading, setLlamaLoading] = useState(false)
  const [llamaDirectData, setLlamaDirectData] = useState<RevenueData | null>(null)
  const [llamaError, setLlamaError] = useState<string | null>(null)

  const [databaseLoading, setDatabaseLoading] = useState(false)
  const [databaseData, setDatabaseData] = useState<RevenueData | null>(null)
  const [databaseError, setDatabaseError] = useState<string | null>(null)

  const [syncLoading, setSyncLoading] = useState(false)
  const [syncResult, setSyncResult] = useState<TestResult | null>(null)

  // Fetch Llama direct data
  const fetchLlamaDirectData = async () => {
    setLlamaLoading(true)
    setLlamaError(null)
    try {
      const response = await fetch("/api/cron/revenue-llama-direct", { method: "GET" })
      const data = await response.json()
      setLlamaDirectData(data as RevenueData)
    } catch (error) {
      setLlamaError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setLlamaLoading(false)
    }
  }

  // Fetch database data
  const fetchDatabaseData = async () => {
    setDatabaseLoading(true)
    setDatabaseError(null)
    try {
      const response = await fetch("/api/cron/revenue-database", { method: "GET" })
      const data = await response.json()
      setDatabaseData(data as RevenueData)
    } catch (error) {
      setDatabaseError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setDatabaseLoading(false)
    }
  }

  useEffect(() => {
    if (!isChecking && isAuthorized) {
      fetchLlamaDirectData()
      fetchDatabaseData()
    }
  }, [isChecking, isAuthorized])

  const triggerSync = async () => {
    setSyncLoading(true)
    setSyncResult(null)
    try {
      const response = await fetch("/api/cron/revenue-sync", { method: "POST" })
      const result = await response.json()
      setSyncResult({
        success: response.ok,
        message: result.message || (response.ok ? "Revenue sync completed" : "Revenue sync failed"),
        timestamp: new Date().toISOString(),
        result,
        error: result.error,
      })
    } catch (error) {
      setSyncResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setSyncLoading(false)
    }
  }

  if (isChecking || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              {isChecking ? "Authentication Required" : "Access Denied"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              {isChecking
                ? "Checking authorization..."
                : "You do not have access to this page."}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Revenue Migration Test</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueDataCard
          title="Llama API (Direct)"
          data={llamaDirectData}
          loading={llamaLoading}
          error={llamaError}
        />
        <RevenueDataCard
          title="Database"
          data={databaseData}
          loading={databaseLoading}
          error={databaseError}
        />
      </div>
      <div className="mt-6">
        <SyncRevenueCard
          loading={syncLoading}
          result={syncResult}
          onTrigger={triggerSync}
        />
      </div>
    </div>
  )
}