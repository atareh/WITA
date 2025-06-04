"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface LlamaMetadata {
  daysWithData: number
  lastUpdated: string
}

interface LlamaMetadataCardProps {
  metadata: LlamaMetadata
}

export default function LlamaMetadataCard({ metadata }: LlamaMetadataCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Fetch Metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Protocols Fetched</p>
            <p className="text-white">{metadata.daysWithData}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-white">{new Date(metadata.lastUpdated).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}