'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, TrendingUp, Sparkles } from 'lucide-react'

interface SubscriptionPromptProps {
  dayNumber: number
  improvementScore: number
  onRestart: () => void
}

export function SubscriptionPrompt({ dayNumber, improvementScore, onRestart }: SubscriptionPromptProps) {
  const features = [
    'Unlimited stress voice scans',
    'Tailored therapy games for every mood',
    'Emotion trend graphs and insights',
    'Advanced journaling prompts',
    'Real-time emotional classification',
    'Priority support'
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Progress Celebration */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
        <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Amazing Progress!
        </h2>
        <p className="text-xl text-muted-foreground mb-2">
          Your calmness score has improved by
        </p>
        <p className="text-5xl font-bold text-primary mb-4">
          {improvementScore}%
        </p>
        <p className="text-muted-foreground">
          in the last {dayNumber} days
        </p>
      </Card>

      {/* Subscription Offer */}
      <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        <div className="text-center space-y-6">
          <Sparkles className="w-12 h-12 text-accent mx-auto" />
          <h3 className="text-2xl font-bold text-foreground">
            Continue Your Progress
          </h3>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Unlock unlimited access to personalized mental wellness tools that adapt to your emotional needs
          </p>

          {/* Pricing */}
          <div className="py-6">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-5xl font-bold text-foreground">£4.99</span>
              <span className="text-xl text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Cancel anytime, no commitment
            </p>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-6">
            <Button
              size="lg"
              className="w-full max-w-md h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              Start Subscription
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={onRestart}
              className="w-full max-w-md h-14 text-lg"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>

      {/* Social Proof */}
      <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-secondary/20 text-center">
        <p className="text-lg font-semibold text-foreground mb-2">
          "I went from daily anxiety attacks to feeling in control in just 2 weeks."
        </p>
        <p className="text-sm text-muted-foreground">
          — Alex, Premium Member
        </p>
      </Card>
    </div>
  )
}
