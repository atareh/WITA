"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface AdminSecretFormProps {
  adminSecret: string
  setAdminSecret: (value: string) => void
}

export default function AdminSecretForm({ adminSecret, setAdminSecret }: AdminSecretFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="admin-secret">Admin Secret</Label>
        <div className="relative">
          <Input
            type="password"
            id="admin-secret"
            placeholder="Enter Admin Secret"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}