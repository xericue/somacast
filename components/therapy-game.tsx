'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Check, Eye, Hand, Ear, Coffee, Heart } from 'lucide-react'

interface TherapyGameProps {
  gameType: string
  emotion: string
  onComplete: () => void
}

export function TherapyGame({ gameType, emotion, onComplete }: TherapyGameProps) {
  const [gameState, setGameState] = useState<'playing' | 'complete'>('playing')

  // Grounding Game (5-4-3-2-1)
  if (gameType.includes('Grounding')) {
    return <GroundingGame onComplete={() => { setGameState('complete'); onComplete(); }} />
  }

  // Paced Breathing
  if (gameType.includes('Breathing')) {
    return <PacedBreathingGame onComplete={() => { setGameState('complete'); onComplete(); }} />
  }

  // Emotional Label Expansion
  if (gameType.includes('Emotional')) {
    return <EmotionalLabelGame onComplete={() => { setGameState('complete'); onComplete(); }} />
  }

  // Cool-Down Cognitive Reframing
  if (gameType.includes('Reframing')) {
    return <CognitiveReframingGame onComplete={() => { setGameState('complete'); onComplete(); }} />
  }

  // Positive Recall
  if (gameType.includes('Positive')) {
    return <PositiveRecallGame onComplete={() => { setGameState('complete'); onComplete(); }} />
  }

  return null
}

// 5-4-3-2-1 Grounding Game
function GroundingGame({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const steps = [
    { count: 5, sense: 'see', icon: Eye, prompt: 'Name 5 things you can see around you' },
    { count: 4, sense: 'touch', icon: Hand, prompt: 'Name 4 things you can touch' },
    { count: 3, sense: 'hear', icon: Ear, prompt: 'Name 3 things you can hear' },
    { count: 2, sense: 'smell', icon: Coffee, prompt: 'Name 2 things you can smell' },
    { count: 1, sense: 'taste', icon: Heart, prompt: 'Name 1 thing you can taste' }
  ]

  const currentStep = steps[step]
  const Icon = currentStep?.icon

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  if (!currentStep) return null

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10"
          >
            <Icon className="w-10 h-10 text-primary" />
          </motion.div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Step {step + 1} of {steps.length}
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {currentStep.prompt}
            </h2>
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            {Array.from({ length: currentStep.count }).map((_, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-lg text-left">
                <span className="text-muted-foreground">{i + 1}. </span>
                <span className="text-foreground">Take a moment to observe...</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleNext}
            className="w-full max-w-md h-14 text-lg font-semibold"
          >
            {step < steps.length - 1 ? 'Next' : 'Complete Exercise'}
          </Button>
        </div>
      </Card>

      <div className="flex gap-2 justify-center">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-12 rounded-full transition-colors ${
              index <= step ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Paced Breathing (4-6 pattern)
function PacedBreathingGame({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale')
  const [count, setCount] = useState(4)
  const [cycles, setCycles] = useState(0)
  const totalCycles = 5

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const target = phase === 'inhale' ? 4 : 6
        if (prev <= 1) {
          if (phase === 'exhale') {
            setCycles((c) => c + 1)
            setPhase('inhale')
            return 4
          } else {
            setPhase('exhale')
            return 6
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [phase])

  if (cycles >= totalCycles) {
    return (
      <Card className="p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-primary" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-foreground">Exercise Complete</h2>
          <p className="text-muted-foreground max-w-md">
            Notice how your body feels more relaxed and your mind clearer.
          </p>

          <Button size="lg" onClick={onComplete} className="mt-4 h-14 px-8">
            Continue
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
      <div className="flex flex-col items-center gap-8">
        <div className="text-sm text-muted-foreground">Cycle {cycles + 1} of {totalCycles}</div>

        <div className="relative w-80 h-80 flex items-center justify-center">
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center"
            animate={{
              width: phase === 'inhale' ? '280px' : '120px',
              height: phase === 'inhale' ? '280px' : '120px'
            }}
            transition={{ duration: phase === 'inhale' ? 4 : 6, ease: 'easeInOut' }}
          >
            <div className="text-center">
              <div className="text-7xl font-bold text-white">{count}</div>
              <div className="text-lg text-white/80">{phase === 'inhale' ? 'Breathe In' : 'Breathe Out'}</div>
            </div>
          </motion.div>
        </div>

        <p className="text-muted-foreground text-center max-w-md">
          Longer exhales activate your calming response
        </p>
      </div>
    </Card>
  )
}

// Placeholder for other games
function EmotionalLabelGame({ onComplete }: { onComplete: () => void }) {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Emotional Label Expansion</h2>
        <p className="text-muted-foreground">Name 3 emotions you might be feeling under the surface</p>
        <div className="space-y-3 max-w-md mx-auto">
          {['Emotion 1', 'Emotion 2', 'Emotion 3'].map((label, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg text-left text-foreground">
              {i + 1}. Reflect on what you're feeling...
            </div>
          ))}
        </div>
        <Button size="lg" onClick={onComplete} className="mt-6">Complete</Button>
      </div>
    </Card>
  )
}

function CognitiveReframingGame({ onComplete }: { onComplete: () => void }) {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Cool-Down Cognitive Reframing</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Take a moment to reframe your angry thoughts into more constructive perspectives
        </p>
        <div className="p-6 bg-muted/50 rounded-lg max-w-md mx-auto text-left space-y-4">
          <p className="text-foreground"><strong>Instead of:</strong> "This always happens to me"</p>
          <p className="text-foreground"><strong>Try:</strong> "This is challenging, but temporary"</p>
        </div>
        <Button size="lg" onClick={onComplete} className="mt-6">Complete</Button>
      </div>
    </Card>
  )
}

function PositiveRecallGame({ onComplete }: { onComplete: () => void }) {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Positive Recall Exercise</h2>
        <p className="text-muted-foreground">List two things that went right today</p>
        <div className="space-y-3 max-w-md mx-auto">
          {['Thing 1', 'Thing 2'].map((label, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg text-left text-foreground">
              {i + 1}. Something positive that happened...
            </div>
          ))}
        </div>
        <Button size="lg" onClick={onComplete} className="mt-6">Complete</Button>
      </div>
    </Card>
  )
}
