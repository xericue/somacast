'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail, ArrowRight } from 'lucide-react'

interface EmailCaptureProps {
  assessmentScore: number
  onSubmit: (email: string) => void
}

export function EmailCapture({ assessmentScore, onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSubmit(email)
    }
  }

  const stressLevel = assessmentScore >= 10 ? 'high' : assessmentScore >= 6 ? 'moderate' : 'manageable'
  const stressColor = assessmentScore >= 10 ? 'text-destructive' : assessmentScore >= 6 ? 'text-accent' : 'text-secondary'

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">
          Your Assessment Results
        </h2>
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
          <p className="text-lg text-muted-foreground mb-2">
            Based on your responses, your stress level appears to be:
          </p>
          <p className={`text-3xl font-bold ${stressColor}`}>
            {stressLevel.toUpperCase()}
          </p>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
        <div className="text-center space-y-6">
          <Mail className="w-16 h-16 text-primary mx-auto" />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Get Your Personalized Analysis
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Enter your email to receive your first voice analysis and personalized daily regulation plan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={handleEmailChange}
              className="h-14 text-lg"
              required
            />
            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className="w-full h-14 text-lg font-semibold"
            >
              Continue to Voice Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            We'll send you daily insights and never spam you.
          </p>
        </div>
      </Card>
    </div>
  )
}
