"use client"

import React, { useState } from "react"
import LlamaFetchButton from "@/components/testLlama/LlamaFetchButton"
import LlamaStatusCard from "@/components/testLlama/LlamaStatusCard"
import LlamaMetadataCard from "@/components/testLlama/LlamaMetadataCard"
import LlamaDataList from "@/components/testLlama/LlamaDataList"
import LlamaRawResponseCard from "@/components/testLlama/LlamaRawResponseCard"

interface LlamaTestData {
  success: boolean
  data?: Array<{
    day: string
    totalDailyTvl: number
    protocols: Array<{ name: string; dailyTvl: number }>
  }>
  metadata?: {
    daysWithData: number
    lastUpdated: string
  }
  error?: string
}

export default function TestLlamaPage() {
  const [data, setData] = useState<LlamaTestData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const response = await fetch("/api/cron/llama-fetch", { method: "POST" })
      const json = await response.json()
      setData(json)
      if (!response.ok) {
        setError(json.error || "Unknown error fetching Llama data")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <LlamaFetchButton onClick={fetchData} loading={loading} />
      <LlamaStatusCard dataSuccess={data?.success} loading={loading} error={error} />
      {data?.metadata && <LlamaMetadataCard metadata={data.metadata} />}
      {data?.data && <LlamaDataList data={data.data} />}
      {data && <LlamaRawResponseCard rawData={data} />}
    </div>
  )
}