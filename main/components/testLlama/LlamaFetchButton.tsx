"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LlamaFetchButtonProps {
  onClick: () => Promise<void>
  loading: boolean
}

export default function LlamaFetchButton({ onClick, loading }: LlamaFetchButtonProps) {
  return (
    <div className="mb-4">
      <Button
        onClick={onClick}
        disabled={loading}
        className="bg-[#51d2c1] text-black hover:bg-white hover:text-[#51d2c1] transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Fetching...
          </>
        ) : (
          "Fetch Llama Data"
        )}
      </Button>
    </div>
  )
}