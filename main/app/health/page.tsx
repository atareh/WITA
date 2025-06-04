"use client"

import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

export default function HealthPage() {
  const [status, setStatus] = useState({ supabase: "loading", api: "loading" })

  useEffect(() => {
    async function check() {
      // 1. Supabase connectivity check
      let supabaseOk = "fail"
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        const { error } = await supabase.from("tokens").select("id").limit(1)
        supabaseOk = error ? "fail" : "ok"
      } catch {
        supabaseOk = "fail"
      }

      // 2. Internal API check
      let apiOk = "fail"
      try {
        const res = await fetch("/api/admin/tokens?adminSecret=test")
        apiOk = res.ok ? "ok" : "fail"
      } catch {
        apiOk = "fail"
      }

      setStatus({ supabase: supabaseOk, api: apiOk })
    }
    check()
  }, [])

  if (status.supabase === "loading" || status.api === "loading") {
    return <p>Checking system health…</p>
  }

  const overall = status.supabase === "ok" && status.api === "ok" ? "ok" : "fail"

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Health Check: {overall.toUpperCase()}</h1>
      <p>Supabase: {status.supabase}</p>
      <p>Admin Tokens API: {status.api}</p>
    </div>
  )
}