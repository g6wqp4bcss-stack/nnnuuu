"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Clock, AlertCircle, Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HomeScreenProps {
  usageCount: number
  maxUsage: number
  plan: "free" | "pro" | "vip"
  onAnalysis: () => void
  onUpgrade: () => void
}

const assets = [
  { id: "eurusd", name: "EUR/USD", icon: "€/$" },
  { id: "btcusd", name: "BTC/USD", icon: "₿/$" },
  { id: "gold", name: "Gold", icon: "Au" },
  { id: "gbpusd", name: "GBP/USD", icon: "£/$" },
  { id: "ethusd", name: "ETH/USD", icon: "Ξ/$" },
  { id: "usdjpy", name: "USD/JPY", icon: "$/¥" },
]

interface AnalysisResult {
  direction: "BUY" | "SELL"
  confidence: number
  timeframe: string
  asset: string
}

export function HomeScreen({ usageCount, maxUsage, plan, onAnalysis, onUpgrade }: HomeScreenProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [cooldown, setCooldown] = useState(0)
  
  const isLimitReached = usageCount >= maxUsage && plan === "free"
  const remainingAnalyses = maxUsage - usageCount

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [cooldown])

  const handleAnalysis = () => {
    if (!selectedAsset || isLimitReached || cooldown > 0) return
    
    setIsAnalyzing(true)
    setResult(null)
    
    // Simulate AI analysis
    setTimeout(() => {
      const directions: ("BUY" | "SELL")[] = ["BUY", "SELL"]
      const timeframes = ["1 min", "5 min", "15 min"]
      const asset = assets.find(a => a.id === selectedAsset)
      
      setResult({
        direction: directions[Math.floor(Math.random() * 2)],
        confidence: Math.floor(Math.random() * 25) + 65,
        timeframe: timeframes[Math.floor(Math.random() * 3)],
        asset: asset?.name || "",
      })
      setIsAnalyzing(false)
      onAnalysis()
      
      // Set cooldown for free plan
      if (plan === "free") {
        setCooldown(30)
      }
    }, 2000)
  }

  const resetAnalysis = () => {
    setResult(null)
    setSelectedAsset(null)
  }

  return (
    <div className="px-4 pt-4 pb-24">
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Daily Analyses</p>
          <p className="text-2xl font-bold text-foreground">
            {usageCount}<span className="text-muted-foreground">/{maxUsage === Infinity ? "∞" : maxUsage}</span>
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30">
          <span className="text-sm font-medium text-primary capitalize">{plan} Plan</span>
        </div>
      </div>

      {/* Limit Reached Warning */}
      {isLimitReached && (
        <div className="mb-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 animate-fade-in">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-foreground mb-1">Daily Limit Reached</p>
              <p className="text-sm text-muted-foreground mb-3">Upgrade your plan to continue analyzing.</p>
              <Button 
                onClick={onUpgrade}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className={cn(
          "mb-6 p-6 rounded-3xl border animate-slide-up",
          result.direction === "BUY" 
            ? "bg-primary/10 border-primary/30 glow-green" 
            : "bg-destructive/10 border-destructive/30 glow-red"
        )}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{result.asset}</span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{result.timeframe}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center",
              result.direction === "BUY" ? "bg-primary/20" : "bg-destructive/20"
            )}>
              {result.direction === "BUY" 
                ? <TrendingUp className="w-7 h-7 text-primary" />
                : <TrendingDown className="w-7 h-7 text-destructive" />
              }
            </div>
            <div>
              <p className={cn(
                "text-3xl font-bold",
                result.direction === "BUY" ? "text-primary" : "text-destructive"
              )}>
                {result.direction}
              </p>
              <p className="text-sm text-muted-foreground">Signal Direction</p>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Confidence</span>
              <span className={cn(
                "text-lg font-bold",
                result.direction === "BUY" ? "text-primary" : "text-destructive"
              )}>{result.confidence}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  result.direction === "BUY" ? "bg-primary" : "bg-destructive"
                )}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-background/50">
            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              AI-based analysis, not financial advice. Trade responsibly.
            </p>
          </div>

          <Button 
            onClick={resetAnalysis}
            variant="outline"
            className="w-full mt-4 h-11 rounded-xl"
          >
            New Analysis
          </Button>
        </div>
      )}

      {/* Analyzing State */}
      {isAnalyzing && (
        <div className="mb-6 p-8 rounded-3xl bg-card border border-border animate-fade-in">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">Analyzing Market...</p>
            <p className="text-sm text-muted-foreground">AI is processing {assets.find(a => a.id === selectedAsset)?.name}</p>
            <div className="flex gap-1 mt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Asset Selection */}
      {!result && !isAnalyzing && (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-1">Select Asset</h2>
            <p className="text-sm text-muted-foreground">Choose a trading pair for analysis</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                disabled={isLimitReached}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200",
                  selectedAsset === asset.id
                    ? "bg-primary/15 border-primary glow-green"
                    : "bg-card border-border hover:border-primary/50",
                  isLimitReached && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="text-2xl font-bold text-primary mb-1">{asset.icon}</div>
                <div className="text-xs text-muted-foreground">{asset.name}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Cooldown Timer */}
      {cooldown > 0 && !isAnalyzing && !result && (
        <div className="mb-4 p-3 rounded-xl bg-muted/50 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Next analysis in <span className="text-primary font-semibold">{cooldown}s</span>
          </span>
        </div>
      )}

      {/* CTA Button */}
      {!result && !isAnalyzing && (
        <Button
          onClick={handleAnalysis}
          disabled={!selectedAsset || isLimitReached || cooldown > 0}
          className={cn(
            "w-full h-16 text-lg font-semibold rounded-2xl transition-all",
            selectedAsset && !isLimitReached && cooldown === 0
              ? "bg-primary text-primary-foreground animate-pulse-glow"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Get Analysis
        </Button>
      )}

      {/* Remaining Counter */}
      {!isLimitReached && remainingAnalyses > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          {remainingAnalyses} {remainingAnalyses === 1 ? "analysis" : "analyses"} remaining today
        </p>
      )}
    </div>
  )
}
