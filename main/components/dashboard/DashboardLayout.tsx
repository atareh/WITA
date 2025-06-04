"use client"

import React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: 'url("/images/back_lines.svg") 0% 0% / cover no-repeat #062723',
      }}
    >
      <header className="border-b border-[#2d5a4f] p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <img src="/images/blob_green.gif" alt="HyperScreener Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold">
              <span className="font-teodor font-normal">Hyper</span>
              <span className="font-teodor italic font-light">Screener</span>
            </h1>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}