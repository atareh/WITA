"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Eye, EyeOff, XCircle } from "lucide-react"

interface Token {
  id: string
  contract_address: string
  created_at: string
}

interface TokenListItemProps {
  token: Token
  showAddress: Record<string, boolean>
  actionLoading: Record<string, boolean>
  onToggleShow: (contractAddress: string) => void
  onRefreshToken: (contractAddress: string) => Promise<void>
  onRemoveToken: (contractAddress: string) => Promise<void>
}

export default function TokenListItem({
  token,
  showAddress,
  actionLoading,
  onToggleShow,
  onRefreshToken,
  onRemoveToken,
}: TokenListItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4 border-b border-[#2d5a4f] py-4 px-2">
      <div className="flex-1">
        <Badge variant="secondary" className="mb-2">
          {showAddress[token.contract_address]
            ? token.contract_address
            : `${token.contract_address.slice(0, 6)}...${token.contract_address.slice(-4)}`}
        </Badge>
        <p className="text-[#868d8f] text-xs font-mono">
          Added: {new Date(token.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button size="icon" onClick={() => onToggleShow(token.contract_address)}>
          {showAddress[token.contract_address] ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          size="icon"
          onClick={() => onRefreshToken(token.contract_address)}
          disabled={actionLoading[token.contract_address]}
        >
          {actionLoading[token.contract_address] ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw />
          )}
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onRemoveToken(token.contract_address)}
          disabled={actionLoading[token.contract_address]}
        >
          {actionLoading[token.contract_address] ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <XCircle />
          )}
        </Button>
      </div>
    </div>
  )
}