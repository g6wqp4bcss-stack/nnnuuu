"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { OnboardingScreen } from "@/components/screens/onboarding"
import { HomeScreen } from "@/components/screens/home"
import { HistoryScreen } from "@/components/screens/history"
import { PlansScreen } from "@/components/screens/plans"
import { ProfileScreen } from "@/components/screens/profile"

type TabType = "home" | "history" | "plans" | "profile"
type PlanType = "free" | "pro" | "vip"

const planLimits = {
  free: 3,
  pro: 20,
  vip: Infinity,
}

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [plan, setPlan] = useState<PlanType>("free")
  const [usageCount, setUsageCount] = useState(0)

  const maxUsage = planLimits[plan]

  // Check if user has seen onboarding before
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("poket_onboarding_complete")
    if (hasSeenOnboarding) {
      setShowOnboarding(false)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem("poket_onboarding_complete", "true")
    setShowOnboarding(false)
  }

  const handleAnalysis = () => {
    setUsageCount((prev) => prev + 1)
  }

  const handleSelectPlan = (newPlan: PlanType) => {
    setPlan(newPlan)
    // Reset usage when upgrading
    if (planLimits[newPlan] > planLimits[plan]) {
      setUsageCount(0)
    }
  }

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as TabType)
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pb-24">
        {activeTab === "home" && (
          <HomeScreen
            usageCount={usageCount}
            maxUsage={maxUsage}
            plan={plan}
            onAnalysis={handleAnalysis}
            onUpgrade={() => setActiveTab("plans")}
          />
        )}
        {activeTab === "history" && <HistoryScreen />}
        {activeTab === "plans" && (
          <PlansScreen 
            currentPlan={plan} 
            onSelectPlan={handleSelectPlan} 
          />
        )}
        {activeTab === "profile" && (
          <ProfileScreen
            plan={plan}
            usageCount={usageCount}
            maxUsage={maxUsage}
            onNavigate={handleNavigate}
          />
        )}
      </div>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
