"use client"

import { Check, Sparkles, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PlansScreenProps {
  currentPlan: "free" | "pro" | "vip"
  onSelectPlan: (plan: "free" | "pro" | "vip") => void
}

const plans = [
  {
    id: "free" as const,
    name: "Free",
    price: "$0",
    period: "/month",
    icon: Zap,
    features: [
      "3 analyses per day",
      "Basic signals",
      "30s cooldown between requests",
      "Standard processing",
    ],
    highlighted: false,
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "$9.99",
    period: "/month",
    icon: Sparkles,
    features: [
      "20 analyses per day",
      "Faster signals",
      "No cooldown",
      "Priority processing",
      "Detailed analytics",
    ],
    highlighted: true,
  },
  {
    id: "vip" as const,
    name: "VIP",
    price: "$29.99",
    period: "/month",
    icon: Crown,
    features: [
      "Unlimited analyses",
      "Advanced signals",
      "No cooldown",
      "Instant processing",
      "Higher confidence display",
      "Premium support",
    ],
    highlighted: false,
  },
]

export function PlansScreen({ currentPlan, onSelectPlan }: PlansScreenProps) {
  return (
    <div className="px-4 pt-4 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h1>
        <p className="text-muted-foreground">Unlock more analyses and premium features</p>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan, index) => {
          const Icon = plan.icon
          const isCurrent = currentPlan === plan.id
          
          return (
            <div
              key={plan.id}
              className={cn(
                "p-5 rounded-3xl border transition-all duration-300 animate-slide-up",
                plan.highlighted 
                  ? "bg-primary/10 border-primary glow-green" 
                  : "bg-card border-border",
                isCurrent && "ring-2 ring-primary"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Plan Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    plan.highlighted ? "bg-primary/20" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6",
                      plan.highlighted ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                      {plan.highlighted && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          Popular
                        </span>
                      )}
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className={cn(
                      "w-4 h-4 flex-shrink-0",
                      plan.highlighted ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={() => onSelectPlan(plan.id)}
                disabled={isCurrent}
                className={cn(
                  "w-full h-12 rounded-xl font-semibold transition-all",
                  plan.highlighted && !isCurrent
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : isCurrent
                    ? "bg-muted text-muted-foreground cursor-default"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {isCurrent ? "Current Plan" : plan.id === "free" ? "Downgrade" : "Upgrade Now"}
              </Button>
            </div>
          )
        })}
      </div>

      {/* Trust Elements */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Secure payment via Telegram Stars
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  )
}
