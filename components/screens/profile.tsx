"use client"

import { User, Crown, Zap, History, Bell, HelpCircle, LogOut, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProfileScreenProps {
  plan: "free" | "pro" | "vip"
  usageCount: number
  maxUsage: number
  onNavigate: (tab: string) => void
}

const menuItems = [
  { id: "history", label: "Analysis History", icon: History },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

export function ProfileScreen({ plan, usageCount, maxUsage, onNavigate }: ProfileScreenProps) {
  const planIcons = {
    free: Zap,
    pro: Sparkles,
    vip: Crown,
  }
  const PlanIcon = planIcons[plan]

  return (
    <div className="px-4 pt-4 pb-24">
      {/* User Card */}
      <div className="p-6 rounded-3xl bg-card border border-border mb-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center glow-green">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Alex Trader</h2>
            <p className="text-sm text-muted-foreground">@alextrader</p>
          </div>
        </div>

        {/* Plan Badge */}
        <div className={cn(
          "flex items-center justify-between p-4 rounded-2xl",
          plan === "vip" ? "bg-amber-500/10 border border-amber-500/30" :
          plan === "pro" ? "bg-primary/10 border border-primary/30" :
          "bg-muted border border-border"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              plan === "vip" ? "bg-amber-500/20" :
              plan === "pro" ? "bg-primary/20" :
              "bg-muted"
            )}>
              <PlanIcon className={cn(
                "w-5 h-5",
                plan === "vip" ? "text-amber-500" :
                plan === "pro" ? "text-primary" :
                "text-muted-foreground"
              )} />
            </div>
            <div>
              <p className="font-semibold text-foreground capitalize">{plan} Plan</p>
              <p className="text-xs text-muted-foreground">
                {plan === "vip" ? "Unlimited access" : `${maxUsage - usageCount} analyses left today`}
              </p>
            </div>
          </div>
          {plan !== "vip" && (
            <Button
              onClick={() => onNavigate("plans")}
              size="sm"
              className="rounded-xl bg-primary text-primary-foreground"
            >
              Upgrade
            </Button>
          )}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="p-5 rounded-2xl bg-card border border-border mb-6 animate-slide-up">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Today&apos;s Usage</h3>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-bold text-foreground">{usageCount}</span>
          <span className="text-muted-foreground mb-1">/ {maxUsage === Infinity ? "∞" : maxUsage}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${maxUsage === Infinity ? 10 : (usageCount / maxUsage) * 100}%` }}
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => item.id === "history" && onNavigate("history")}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:bg-secondary/50 transition-all animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          )
        })}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/15 transition-all">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Log Out</span>
      </button>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Poket v1.0.0
      </p>
    </div>
  )
}
