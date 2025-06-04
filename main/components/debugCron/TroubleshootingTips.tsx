"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TroubleshootingTips() {
  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white">Troubleshooting Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2 text-[#868d8f]">
          <li>Check Vercel Dashboard → Functions → Cron Jobs for execution logs</li>
          <li>Verify CRON_SECRET environment variable is set</li>
          <li>Test the endpoint manually using the button above</li>
          <li>Check if any recent deployments might have affected the cron</li>
          <li>Verify the cron job is enabled in Vercel settings</li>
        </ol>
      </CardContent>
    </Card>
  )
}