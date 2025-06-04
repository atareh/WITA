"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface LlamaRawResponseCardProps {
  rawData: any
}

export default function LlamaRawResponseCard({ rawData }: LlamaRawResponseCardProps) {
  if (!rawData) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>Raw Response (for debugging)</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}