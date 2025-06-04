"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TokenListItem from "./TokenListItem"

interface Token {
  id: string
  contract_address: string
  created_at: string
}

interface TokenListProps {
  tokens: Token[]
  showAddress: Record<string, boolean>
  actionLoading: Record<string, boolean>
  onToggleShow: (contractAddress: string) => void
  onRefreshToken: (contractAddress: string) => Promise<void>
  onRemoveToken: (contractAddress: string) => Promise<void>
}

export default function TokenList({
  tokens,
  showAddress,
  actionLoading,
  onToggleShow,
  onRefreshToken,
  onRemoveToken,
}: TokenListProps) {
  return (
    <Card className="bg-[#0f1a1f] border-[#2d5a4f] rounded-2xl">
      <CardHeader>
        <CardTitle>Existing Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        {tokens.length === 0 ? (
          <p className="text-[#868d8f]">No tokens added yet.</p>
        ) : (
          <div className="space-y-2">
            {tokens.map((token) => (
              <TokenListItem
                key={token.id}
                token={token}
                showAddress={showAddress}
                actionLoading={actionLoading}
                onToggleShow={onToggleShow}
                onRefreshToken={onRefreshToken}
                onRemoveToken={onRemoveToken}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}