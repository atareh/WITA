"use client"
import { useState, useEffect } from "react"

export function useCryptoData() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/crypto")
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}