"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProtocolData {
  name: string
  dailyTvl: number
}

interface DayData {
  day: string
  totalDailyTvl: number
  protocols: ProtocolData[]
}

interface LlamaDataListProps {
  data: DayData[]
}

export default function LlamaDataList({ data }: LlamaDataListProps) {
  return (
    <div className="space-y-4 mb-4">
      {data.map((dayData, index) => (
        <Card key={dayData.day}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{dayData.day}</span>
              <Badge variant={index === 0 ? "default" : "secondary"}>
                {index === 0 ? "Latest" : `${index} day${index === 1 ? "" : "s"} ago`}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Total TVL</p>
              <p className="text-white">{dayData.totalDailyTvl.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              {dayData.protocols.map((protocol) => (
                <div key={protocol.name} className="flex justify-between">
                  <span className="text-white">{protocol.name}</span>
                  <span className="text-white">{protocol.dailyTvl.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}