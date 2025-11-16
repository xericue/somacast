'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, X, Calendar } from 'lucide-react'

interface PredictiveNotificationProps {
  onStartGrounding: () => void
  onDismiss: () => void
}

export function PredictiveNotification({ onStartGrounding, onDismiss }: PredictiveNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show notification after 2 seconds (simulating time-based prediction)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  const handleAccept = () => {
    setIsVisible(false)
    onStartGrounding()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="max-w-md w-full p-6 bg-card border-2 border-primary shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/20">
              <AlertCircle className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Pattern Detected</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Based on your patterns, you tend to feel more stressed around this time. Your tone usually shifts about 30 minutes before you consciously notice.
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>You've journaled 12 times this month, with Tuesday evenings showing higher stress levels.</span>
          </div>

          <p className="text-foreground font-medium">
            Would you like to practice grounding before it hits?
          </p>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Yes, Let's Practice
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="flex-1"
            >
              Not Right Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
