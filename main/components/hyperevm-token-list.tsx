"use client"

import React from "react"
import { useHyperEVMData } from "@/hooks/use-hyperevm-data"
import { Card, CardContent } from "@/components/ui/card"

export default function HyperEVMTokenList() {
  const { data, loading, error } = useHyperEVMData()

  if (loading) return <p>Loading Hyperevm tokens...</p>
  if (error || !data) return <p>Error loading Hyperevm tokens</p>

  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardContent>
        <ul>
          {data.tokens.map((t: any) => (
            <li key={t.address}>
              {t.symbol}: {t.price}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}