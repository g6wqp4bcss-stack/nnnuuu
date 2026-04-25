"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Zap, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("Trader")

  useEffect(() => {
    // Simulate Telegram WebApp user data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setUserName("Alex")
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 safe-top safe-bottom">
      {/* Logo and Branding */}
      <div className="animate-fade-in flex flex-col items-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 glow-green">
          <TrendingUp className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Poket</h1>
        <p className="text-muted-foreground text-center text-lg">Smart Trading Insights</p>
      </div>

      {/* Features */}
      <div className="w-full max-w-sm space-y-4 mb-12 animate-slide-up">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">AI-Powered Analysis</p>
            <p className="text-sm text-muted-foreground">Get instant trading insights</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Risk Management</p>
            <p className="text-sm text-muted-foreground">Confidence levels for every signal</p>
          </div>
        </div>
      </div>

      {/* User Welcome */}
      {!isLoading && (
        <div className="animate-fade-in text-center mb-8">
          <p className="text-muted-foreground">Welcome back,</p>
          <p className="text-xl font-semibold text-foreground">{userName}</p>
        </div>
      )}

      {/* Trust Element */}
      <p className="text-sm text-muted-foreground mb-6 animate-fade-in">
        Trusted by <span className="text-primary font-semibold">10,000+</span> traders
      </p>

      {/* CTA Button */}
      <Button
        onClick={onComplete}
        disabled={isLoading}
        className="w-full max-w-sm h-14 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow transition-all"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Start Trading</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </Button>
    </div>
  )
}
