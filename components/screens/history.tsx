"use client"

import { TrendingUp, TrendingDown, CheckCircle2, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface HistoryItem {
  id: string
  asset: string
  direction: "BUY" | "SELL"
  confidence: number
  timeframe: string
  result: "win" | "loss" | "pending"
  timestamp: string
}

const mockHistory: HistoryItem[] = [
  { id: "1", asset: "EUR/USD", direction: "BUY", confidence: 78, timeframe: "5 min", result: "win", timestamp: "2 min ago" },
  { id: "2", asset: "BTC/USD", direction: "SELL", confidence: 72, timeframe: "1 min", result: "loss", timestamp: "15 min ago" },
  { id: "3", asset: "Gold", direction: "BUY", confidence: 85, timeframe: "15 min", result: "win", timestamp: "32 min ago" },
  { id: "4", asset: "ETH/USD", direction: "BUY", confidence: 68, timeframe: "5 min", result: "pending", timestamp: "45 min ago" },
  { id: "5", asset: "GBP/USD", direction: "SELL", confidence: 74, timeframe: "1 min", result: "win", timestamp: "1h ago" },
  { id: "6", asset: "USD/JPY", direction: "BUY", confidence: 81, timeframe: "5 min", result: "win", timestamp: "2h ago" },
  { id: "7", asset: "BTC/USD", direction: "BUY", confidence: 69, timeframe: "15 min", result: "loss", timestamp: "3h ago" },
]

export function HistoryScreen() {
  const wins = mockHistory.filter(h => h.result === "win").length
  const losses = mockHistory.filter(h => h.result === "loss").length
  const winRate = Math.round((wins / (wins + losses)) * 100)

  return (
    <div className="px-4 pt-4 pb-24">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-2xl font-bold text-primary">{wins}</p>
          <p className="text-xs text-muted-foreground">Wins</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-2xl font-bold text-destructive">{losses}</p>
          <p className="text-xs text-muted-foreground">Losses</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-2xl font-bold text-foreground">{winRate}%</p>
          <p className="text-xs text-muted-foreground">Win Rate</p>
        </div>
      </div>

      {/* History Title */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Signals</h2>
        <p className="text-sm text-muted-foreground">Your analysis history</p>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {mockHistory.map((item, index) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-card border border-border animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  item.direction === "BUY" ? "bg-primary/15" : "bg-destructive/15"
                )}>
                  {item.direction === "BUY" 
                    ? <TrendingUp className="w-5 h-5 text-primary" />
                    : <TrendingDown className="w-5 h-5 text-destructive" />
                  }
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.asset}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={item.direction === "BUY" ? "text-primary" : "text-destructive"}>
                      {item.direction}
                    </span>
                    <span>•</span>
                    <span>{item.confidence}%</span>
                    <span>•</span>
                    <span>{item.timeframe}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                  item.result === "win" && "bg-primary/15 text-primary",
                  item.result === "loss" && "bg-destructive/15 text-destructive",
                  item.result === "pending" && "bg-muted text-muted-foreground"
                )}>
                  {item.result === "win" && <CheckCircle2 className="w-3 h-3" />}
                  {item.result === "loss" && <XCircle className="w-3 h-3" />}
                  {item.result === "pending" && <Clock className="w-3 h-3" />}
                  <span className="capitalize">{item.result}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
