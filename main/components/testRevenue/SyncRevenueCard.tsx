"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { TestResult } from "@/utils/revenue-utils"

interface SyncRevenueCardProps {
  loading: boolean
  result: TestResult | null
  onTrigger: () => Promise<void>
}

export default function SyncRevenueCard({ loading, result, onTrigger }: SyncRevenueCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw />
          Trigger Revenue Sync
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onTrigger} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Trigger Revenue Sync
        </Button>
        {result && (
          <div
            className={`p-4 rounded ${
              result.success ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {result.success ? (
              <div>
                <p className="font-medium mb-2">Success</p>
                <p>{result.message}</p>
              </div>
            ) : (
              <div>
                <p className="font-medium mb-2">Failure</p>
                <p>{result.message}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}