"use client"

import React, { useState } from "react"
import DebugAuth from "@/components/debug-auth"
import TestActionCard from "@/components/test/TestActionCard"
import ResultCard, { TestResult } from "@/components/test/ResultCard"
import { Play, DollarSign, RefreshCw, Loader2 } from "lucide-react"

export default function TestPage() {
  const [duneLoading, setDuneLoading] = useState(false)
  const [duneResult, setDuneResult] = useState<TestResult | null>(null)

  const [duneExecutionLoading, setDuneExecutionLoading] = useState(false)
  const [duneExecutionResult, setDuneExecutionResult] = useState<TestResult | null>(null)

  const [cmcLoading, setCmcLoading] = useState(false)
  const [cmcResult, setCmcResult] = useState<TestResult | null>(null)

  const [revenueLoading, setRevenueLoading] = useState(false)
  const [revenueResult, setRevenueResult] = useState<TestResult | null>(null)

  const [transferLoading, setTransferLoading] = useState(false)
  const [transferResult, setTransferResult] = useState<TestResult | null>(null)

  const [flowLoading, setFlowLoading] = useState(false)
  const [flowResult, setFlowResult] = useState<TestResult | null>(null)

  const [memesLoading, setMemesLoading] = useState(false)
  const [memesResult, setMemesResult] = useState<TestResult | null>(null)

  const [memesMetricsLoading, setMemesMetricsLoading] = useState(false)
  const [memesMetricsResult, setMemesMetricsResult] = useState<TestResult | null>(null)

  const [tokenRefreshLoading, setTokenRefreshLoading] = useState(false)
  const [tokenRefreshResult, setTokenRefreshResult] = useState<TestResult | null>(null)

  // Handler functions
  const testDuneSync = async () => {
    setDuneLoading(true)
    setDuneResult(null)
    try {
      const response = await fetch("/api/dune-sync", { method: "POST" })
      const result = await response.json()
      setDuneResult({
        success: response.ok,
        message: result.message || (response.ok ? "Dune sync completed" : "Dune sync failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setDuneResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setDuneLoading(false)
    }
  }

  const testHyperEVMSync = async () => {
    setDuneExecutionLoading(true)
    setDuneExecutionResult(null)
    try {
      const response = await fetch("/api/cron/dune-execution", { method: "POST" })
      const result = await response.json()
      setDuneExecutionResult({
        success: response.ok,
        message: result.message || (response.ok ? "HyperEVM sync completed" : "HyperEVM sync failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setDuneExecutionResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setDuneExecutionLoading(false)
    }
  }

  const testCmcSync = async () => {
    setCmcLoading(true)
    setCmcResult(null)
    try {
      const response = await fetch("/api/cron/cmc-sync", { method: "POST" })
      const result = await response.json()
      setCmcResult({
        success: response.ok,
        message: result.message || (response.ok ? "CMC sync completed" : "CMC sync failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setCmcResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setCmcLoading(false)
    }
  }

  const testRevenueSync = async () => {
    setRevenueLoading(true)
    setRevenueResult(null)
    try {
      const response = await fetch("/api/cron/revenue-sync", { method: "POST" })
      const result = await response.json()
      setRevenueResult({
        success: response.ok,
        message: result.message || (response.ok ? "Revenue sync completed" : "Revenue sync failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setRevenueResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setRevenueLoading(false)
    }
  }

  const testTransferSync = async () => {
    setTransferLoading(true)
    setTransferResult(null)
    try {
      const response = await fetch("/api/cron/transfer-sync", { method: "POST" })
      const result = await response.json()
      setTransferResult({
        success: response.ok,
        message: result.message || (response.ok ? "Transfer sync completed" : "Transfer sync failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setTransferResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setTransferLoading(false)
    }
  }

  const testFlowSync = async () => {
    setFlowLoading(true)
    setFlowResult(null)
    try {
      const response = await fetch("/api/cron/flow-sync", { method: "POST" })
      const result = await response.json()
      setFlowResult({
        success: response.ok,
        message: result.message || (response.ok ? "Flow sync completed" : "Flow sync failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setFlowResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setFlowLoading(false)
    }
  }

  const testMemesSync = async () => {
    setMemesLoading(true)
    setMemesResult(null)
    try {
      const response = await fetch("/api/cron/memes-refresh", { method: "POST" })
      const result = await response.json()
      setMemesResult({
        success: response.ok,
        message: result.message || (response.ok ? "Memes refresh completed" : "Memes refresh failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setMemesResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setMemesLoading(false)
    }
  }

  const testMemesMetricsSync = async () => {
    setMemesMetricsLoading(true)
    setMemesMetricsResult(null)
    try {
      const response = await fetch("/api/cron/memes-metrics-sync", { method: "POST" })
      const result = await response.json()
      setMemesMetricsResult({
        success: response.ok,
        message: result.message || (response.ok ? "Memes metrics completed" : "Memes metrics failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setMemesMetricsResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setMemesMetricsLoading(false)
    }
  }

  const testTokenRefresh = async () => {
    setTokenRefreshLoading(true)
    setTokenRefreshResult(null)
    try {
      const response = await fetch("/api/cron/token-refresh", { method: "POST" })
      const result = await response.json()
      setTokenRefreshResult({
        success: response.ok,
        message: result.message || (response.ok ? "Token refresh completed" : "Token refresh failed"),
        timestamp: new Date().toISOString(),
        result: result,
        error: result.error,
      })
    } catch (error) {
      setTokenRefreshResult({
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setTokenRefreshLoading(false)
    }
  }

  return (
    <DebugAuth title="Test Page">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Test Page</h1>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <TestActionCard
            title="Hyperliquid Stats Sync"
            description="Sync HYPE data from Dune query 5184581."
            icon={<Play className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testDuneSync}
            loading={duneLoading}
            buttonContent={
              <>
                <Play className="mr-2 h-4 w-4" />
                Sync Hyperliquid Data
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing Hyperliquid...
              </>
            }
          />

          <TestActionCard
            title="HyperEVM Sync"
            description="Sync HYPE data into HyperEVM."
            icon={<Play className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testHyperEVMSync}
            loading={duneExecutionLoading}
            buttonContent={
              <>
                <Play className="mr-2 h-4 w-4" />
                Sync HyperEVM Data
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing HyperEVM...
              </>
            }
          />

          <TestActionCard
            title="CMC Sync"
            description="Sync HYPE price data from CoinMarketCap API."
            icon={<DollarSign className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testCmcSync}
            loading={cmcLoading}
            buttonContent={
              <>
                <Play className="mr-2 h-4 w-4" />
                Sync CMC Data
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing CMC...
              </>
            }
          />

          <TestActionCard
            title="Revenue Sync"
            description="Test Revenue data pipeline manually."
            icon={<DollarSign className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testRevenueSync}
            loading={revenueLoading}
            buttonContent={
              <>
                <Play className="mr-2 h-4 w-4" />
                Test Revenue Sync
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Revenue Sync...
              </>
            }
          />

          <TestActionCard
            title="Transfer Topic Sync"
            description="Test the transfer topic cron job manually."
            icon={<RefreshCw className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testTransferSync}
            loading={transferLoading}
            buttonContent={
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Transfer Topic
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Transfer Topic...
              </>
            }
          />

          <TestActionCard
            title="Flow Test"
            description="Test flow data sync (Dune ↔ Supabase) manually."
            icon={<RefreshCw className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testFlowSync}
            loading={flowLoading}
            buttonContent={
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Flow Data
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Flow Data...
              </>
            }
          />

          <TestActionCard
            title="HyperEVM Memes Test"
            description="Test the 5-minute HyperEVM memes refresh cron job manually."
            icon={<RefreshCw className="h-5 w-5 text-[#51d2c1]" />}
            onClick={testMemesSync}
            loading={memesLoading}
            buttonContent={
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Memes Refresh
              </>
            }
            loadingContent={
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Memes Refresh...
              </>
            }
          />
        </div>

        {/* Result Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <ResultCard
            title="Hyperliquid Stats Sync Results"
            result={duneResult}
            icon={<Play className="h-5 w-5 text-[#51d2c1]" />}
          />
          <ResultCard
            title="HyperEVM Sync Results"
            result={duneExecutionResult}
            icon={<Play className="h-5 w-5 text-[#51d2c1]" />}
          />
          <ResultCard
            title="CMC Sync Results"
            result={cmcResult}
            icon={<DollarSign className="h-5 w-5 text-[#51d2c1]" />}
          />
          <ResultCard
            title="Revenue Sync Results"
            result={revenueResult}
            icon={<DollarSign className="h-5 w-5 text-[#51d2c1]" />}
          />
          <ResultCard
            title="Transfer Topic Sync Results"
            result={transferResult}
            icon={<RefreshCw className="h-5 w-5 text-[#51d2c1]" />}
          />
          <ResultCard
            title="Flow Sync Results"
            result={flowResult}
            icon={<RefreshCw className="h-5 w-5 text-[#51d2c1]" />}
          />
          <ResultCard
            title="HyperEVM Memes Test Results"
            result={memesResult}
            icon={<RefreshCw className="h-5 w-5 text-[#51d2c1]" />}
          />
        </div>
      </div>
    </DebugAuth>
  )
}