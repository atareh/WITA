"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"

interface AddTokenFormProps {
  adminSecret: string
  onAddToken: (contractAddress: string) => Promise<void>
  actionLoading: Record<string, boolean>
}

export default function AddTokenForm({ adminSecret, onAddToken, actionLoading }: AddTokenFormProps) {
  const [newContractAddress, setNewContractAddress] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="contract-address">Token Contract Address</Label>
        <div className="relative">
          <Input
            type="text"
            id="contract-address"
            placeholder="Enter contract address"
            value={newContractAddress}
            onChange={(e) => setNewContractAddress(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            onAddToken(newContractAddress)
            setNewContractAddress("")
          }}
          disabled={!adminSecret || !newContractAddress || actionLoading[newContractAddress]}
          className="w-full"
        >
          {actionLoading[newContractAddress] ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Add Token
        </Button>
      </div>
    </div>
  )
}