"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface TestCronButtonProps {
  onClick: () => Promise<void>
  loading: boolean
}

export default function TestCronButton({ onClick, loading }: TestCronButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className="bg-[#51d2c1] text-black hover:bg-white hover:text-[#51d2c1] transition-colors"
    >
      <Play className="mr-2 h-4 w-4" />
      {loading ? "Testing..." : "Run Cron Now"}
    </Button>
  )
}