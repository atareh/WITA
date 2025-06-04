"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface MigrationActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => Promise<void>
  loading: boolean
  buttonContent: React.ReactNode
  loadingContent: React.ReactNode
}

export default function MigrationActionCard({
  title,
  description,
  icon,
  onClick,
  loading,
  buttonContent,
  loadingContent,
}: MigrationActionCardProps) {
  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#868d8f] text-sm mb-4">{description}</p>
        <Button
          onClick={onClick}
          disabled={loading}
          className="w-full bg-[#51d2c1] text-black hover:bg-white hover:text-[#51d2c1] transition-colors"
        >
          {loading ? loadingContent : buttonContent}
        </Button>
      </CardContent>
    </Card>
  )
}