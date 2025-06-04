"use client"

import React, { useState, useEffect } from "react"
import DebugAuth from "@/components/debug-auth"
import AdminSecretForm from "@/components/admin/AdminSecretForm"
import AddTokenForm from "@/components/admin/AddTokenForm"
import TokenList from "@/components/admin/TokenList"

interface Token {
  id: string
  contract_address: string
  created_at: string
}

interface AddTokenResult {
  success: boolean
  message: string
  token?: Token
  error?: string
}

export default function TokenAdminPage() {
  const [adminSecret, setAdminSecret] = useState<string>("")
  const [tokens, setTokens] = useState<Token[]>([])
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({})
  const [showAddress, setShowAddress] = useState<Record<string, boolean>>({})

  // Whenever adminSecret is set, fetch the existing tokens from backend
  useEffect(() => {
    if (adminSecret) {
      fetchTokens()
    }
  }, [adminSecret])

  const fetchTokens = async () => {
    try {
      const res = await fetch(`/api/admin/tokens?adminSecret=${adminSecret}`)
      const data = await res.json()
      setTokens(data.tokens)
    } catch (error) {
      console.error("Error fetching tokens:", error)
    }
  }

  const handleAddToken = async (contractAddress: string) => {
    if (!adminSecret) return
    setActionLoading((prev) => ({ ...prev, [contractAddress]: true }))
    try {
      const res = await fetch("/api/admin/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractAddress, adminSecret }),
      })
      const result: AddTokenResult = await res.json()
      if (result.success && result.token) {
        setTokens((prev) => [...prev, result.token])
      } else {
        alert(`Error: ${result.error || "Failed to add token"}`)
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setActionLoading((prev) => ({ ...prev, [contractAddress]: false }))
    }
  }

  const handleRemoveToken = async (contractAddress: string) => {
    if (!adminSecret) return
    setActionLoading((prev) => ({ ...prev, [contractAddress]: true }))
    try {
      const res = await fetch("/api/admin/tokens", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractAddress, adminSecret }),
      })
      const result: AddTokenResult = await res.json()
      if (result.success) {
        setTokens((prev) => prev.filter((t) => t.contract_address !== contractAddress))
      } else {
        alert(`Error: ${result.error || "Failed to remove token"}`)
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setActionLoading((prev) => ({ ...prev, [contractAddress]: false }))
    }
  }

  const handleRefreshToken = async (contractAddress: string) => {
    if (!adminSecret) return
    setActionLoading((prev) => ({ ...prev, [contractAddress]: true }))
    try {
      const res = await fetch("/api/admin/tokens/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractAddress, adminSecret }),
      })
      const result: AddTokenResult = await res.json()
      if (!result.success) {
        alert(`Error: ${result.error || "Failed to refresh token"}`)
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setActionLoading((prev) => ({ ...prev, [contractAddress]: false }))
    }
  }

  const onToggleShow = (contractAddress: string) => {
    setShowAddress((prev) => ({
      ...prev,
      [contractAddress]: !prev[contractAddress],
    }))
  }

  return (
    <DebugAuth title="Token Admin">
      <div
        className="min-h-screen text-white p-6"
        style={{
          background: 'url("/images/back_lines.svg") 0% 0% / cover no-repeat #062723',
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Token Administration</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column: Admin secret + Add Token */}
            <div className="space-y-6">
              <AdminSecretForm adminSecret={adminSecret} setAdminSecret={setAdminSecret} />
              <AddTokenForm
                adminSecret={adminSecret}
                onAddToken={handleAddToken}
                actionLoading={actionLoading}
              />
            </div>

            {/* Right column: List of existing tokens */}
            <TokenList
              tokens={tokens}
              showAddress={showAddress}
              actionLoading={actionLoading}
              onToggleShow={onToggleShow}
              onRefreshToken={handleRefreshToken}
              onRemoveToken={handleRemoveToken}
            />
          </div>
        </div>
      </div>
    </DebugAuth>
  )
}