"use client"

import React from "react"
import { useDuneData } from "@/hooks/use-dune-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeroMetrics() {
  const { data, loading, error } = useDuneData()

  if (loading) return <p>Loading hero metrics...</p>
  if (error || !data) return <p>Error loading hero metrics</p>

  // Assuming data has fields for hero metrics
  return (
    <Card className="mb-6 bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardHeader>
        <CardTitle>Hero Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Volume: {data.volume}</p>
        <p>Open Interest: {data.openInterest}</p>
        <p>Volatility: {data.volatility}</p>
      </CardContent>
    </Card>
  )
}