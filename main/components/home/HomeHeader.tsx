"use client"

import React from "react"
import { useCryptoData } from "@/hooks/use-crypto-data"
import { formatCurrency, abbreviateNumber } from "@/utils/format-utils"

export default function HomeHeader() {
  const { data, loading, error } = useCryptoData()

  if (loading) return <header><p>Loading...</p></header>
  if (error || !data) return <header><p>Error loading data</p></header>

  return (
    <header className="flex items-center justify-between p-6 bg-[#062723]">
      <h1 className="text-2xl text-white">HypeScreener</h1>
      <div className="flex space-x-4">
        <div className="text-white">
          Market Cap: {formatCurrency(data.marketCap)}
        </div>
        <div className="text-white">
          Price: {formatCurrency(data.price)}
        </div>
        <div className="text-white">
          Volume: {abbreviateNumber(data.volume24h)}
        </div>
      </div>
    </header>
  )
}