"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useCryptoData } from "@/hooks/use-crypto-data"
import { formatCurrency, abbreviateNumber } from "@/utils/format-utils"

export default function TopMetrics() {
  const { data: cryptoData, loading, error } = useCryptoData()

  if (loading) return <p>Loading metrics...</p>
  if (error || !cryptoData) return <p>Error loading metrics</p>

  return (
    <Card className="mb-6 bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardContent className="grid grid-cols-3 text-center">
        <div>
          <p className="text-sm text-[#868d8f]">Market Cap</p>
          <p className="font-bold">{formatCurrency(cryptoData.marketCap)}</p>
        </div>
        <div>
          <p className="text-sm text-[#868d8f]">Price</p>
          <p className="font-bold">{formatCurrency(cryptoData.price)}</p>
        </div>
        <div>
          <p className="text-sm text-[#868d8f]">Volume (24h)</p>
          <p className="font-bold">{abbreviateNumber(cryptoData.volume24h)}</p>
        </div>
      </CardContent>
    </Card>
  )
}