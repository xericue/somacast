'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface BreathingAnimationProps {
  onComplete: () => void
}

export function BreathingAnimation({ onComplete }: BreathingAnimationProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale')
  const [count, setCount] = useState(4)
  const [cycles, setCycles] = useState(0)
  const totalCycles = 5

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhase((currentPhase) => {
            if (currentPhase === 'inhale') return 'hold1'
            if (currentPhase === 'hold1') return 'exhale'
            if (currentPhase === 'exhale') return 'hold2'
            // Complete cycle
            setCycles((c) => c + 1)
            return 'inhale'
          })
          return 4
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const phaseText = {
    inhale: 'Breathe In',
    hold1: 'Hold',
    exhale: 'Breathe Out',
    hold2: 'Hold'
  }

  const phaseColor = {
    inhale: 'from-accent to-primary',
    hold1: 'from-primary to-secondary',
    exhale: 'from-secondary to-accent',
    hold2: 'from-accent to-primary'
  }

  if (cycles >= totalCycles) {
    return (
      <Card className="p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-primary" />
          </motion.div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Well Done!</h2>
            <p className="text-muted-foreground max-w-md">
              {'You\'ve completed the breathing exercise. Notice how you feel now compared to before.'}
            </p>
          </div>

          <Button
            size="lg"
            onClick={onComplete}
            className="mt-4 h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90"
          >
            Return to Home
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Progress */}
          <div className="text-sm text-muted-foreground">
            Cycle {cycles + 1} of {totalCycles}
          </div>

          {/* Breathing Circle */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Outer glow */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${phaseColor[phase]} blur-2xl opacity-30`}
              animate={{
                scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            />

            {/* Main breathing circle */}
            <motion.div
              className={`absolute rounded-full bg-gradient-to-br ${phaseColor[phase]} flex items-center justify-center shadow-2xl`}
              animate={{
                width: phase === 'inhale' ? '280px' : phase === 'exhale' ? '120px' : '200px',
                height: phase === 'inhale' ? '280px' : phase === 'exhale' ? '120px' : '200px'
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            >
              <div className="text-center">
                <div className="text-7xl font-bold text-white tabular-nums mb-2">
                  {count}
                </div>
                <div className="text-lg text-white/80 font-medium">
                  {phaseText[phase]}
                </div>
              </div>
            </motion.div>

            {/* Guide ring */}
            <div className="absolute w-72 h-72 rounded-full border-2 border-primary/20" />
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2 max-w-md">
            <p className="text-muted-foreground">
              {'Follow the circle\'s rhythm. Inhale as it grows, exhale as it shrinks.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Quick exit */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onComplete}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip Exercise
        </Button>
      </div>
    </div>
  )
}
