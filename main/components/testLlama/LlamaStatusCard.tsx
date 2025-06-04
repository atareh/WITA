"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface LlamaStatusCardProps {
  dataSuccess: boolean | undefined
  loading: boolean
  error: string | null
}

export default function LlamaStatusCard({ dataSuccess, loading, error }: LlamaStatusCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Status
          {dataSuccess ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : error ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {dataSuccess && <p className="text-green-500">Successfully fetched data from Llama API</p>}
        {dataSuccess === false && <p className="text-red-500">API returned failure</p>}
      </CardContent>
    </Card>
  )
}