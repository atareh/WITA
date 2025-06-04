"use client"

import React from "react"
import HomeHeader from "@/components/home/HomeHeader"
import HomeFooter from "@/components/home/HomeFooter"
import TopMetrics from "@/components/top-metrics"
import HeroMetrics from "@/components/hero-metrics"
import HyperEVMTokenList from "@/components/hyperevm-token-list"

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="p-6">
        <TopMetrics />
        <HeroMetrics />
        <HyperEVMTokenList />
      </main>
      <HomeFooter />
    </>
  )
}