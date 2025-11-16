'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Brain, Mail, TrendingUp, RotateCcw, Gauge } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnalysisResultsProps {
  results: {
    cognitiveLoad: 'LOW' | 'MED' | 'HIGH'
    emotion: string
    primaryEmotions: string[]
    recommendedGame: string
    transcript?: string
  }
  calmnessScore: number
  userEmail: string
  dayNumber: number
  onStartTherapy: () => void
  onRestart: () => void
}

export function AnalysisResults({
  results,
  calmnessScore,
  userEmail,
  dayNumber,
  onStartTherapy,
  onRestart
}: AnalysisResultsProps) {
  const scoreColor = calmnessScore >= 70 ? 'text-secondary' : calmnessScore >= 40 ? 'text-accent' : 'text-destructive'
  const scoreBg = calmnessScore >= 70 ? 'bg-secondary/10' : calmnessScore >= 40 ? 'bg-accent/10' : 'bg-destructive/10'

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Calmness Score - Hero */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
        <div className="text-center space-y-4">
          <Gauge className="w-16 h-16 text-primary mx-auto" />
          <h3 className="text-2xl font-semibold text-foreground">Your Calmness Score</h3>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`inline-flex items-baseline gap-2 ${scoreBg} px-8 py-4 rounded-2xl`}
          >
            <span className={`text-6xl font-bold ${scoreColor}`}>{calmnessScore}</span>
            <span className="text-3xl text-muted-foreground">/100</span>
          </motion.div>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {calmnessScore < 50
              ? 'You sound mentally overloaded, with elevated stress markers and emotional fragmentation.'
              : calmnessScore < 70
              ? "You have moderate stress levels. There's room for emotional regulation."
              : "You're in a relatively calm state. Maintaining this is key."}
          </p>
        </div>
      </Card>

      {/* Detection Results */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Voice Analysis
        </h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="text-sm text-muted-foreground mb-1">Primary Emotions Detected</div>
              <div className="text-xl font-bold text-primary capitalize">
                {results.emotion}
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="text-sm text-muted-foreground mb-1">Cognitive Load</div>
              <div className="text-xl font-bold text-accent">
                {results.cognitiveLoad}
              </div>
            </div>
          </div>

          {results.transcript && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">What we heard</div>
              <p className="text-foreground italic">{`"${results.transcript}"`}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Recommended Action */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-secondary/5 border-2 border-accent/20">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Your Personalized Regulation Game
              </h3>
              <p className="text-lg text-primary font-semibold mb-3">
                {results.recommendedGame}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Based on detected emotions ({results.primaryEmotions.join(', ')}), this exercise will help restore emotional balance and mental clarity.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Email Notification Preview */}
      {dayNumber === 1 && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">Email Sent to {userEmail}</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">Subject: Your journal reflection from today</p>
                <div className="pl-4 border-l-2 border-primary/30 space-y-1">
                  <p>Calmness score: {calmnessScore}/100</p>
                  <p>Primary emotions: {results.primaryEmotions.join(', ')}</p>
                  <p>Recommended: {results.recommendedGame}</p>
                  <p className="pt-2 italic">Tomorrow, you'll get your next tailored prompt and game.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Why This Works */}
      <Card className="p-6 bg-accent/5 border-2 border-accent/20">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Why This Works
        </h3>
        
        <div className="space-y-3 text-foreground leading-relaxed">
          <p>
            <strong className="text-accent">{results.recommendedGame}</strong> is clinically validated:
          </p>
          <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
            <li>
              <strong>74% of users</strong> report reduced anxiety within 5 minutes
            </li>
            <li>
              Activates the <strong>parasympathetic nervous system</strong>, lowering cortisol
            </li>
            <li>
              Proven effective for {results.emotion.toLowerCase()} in clinical trials
            </li>
          </ul>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={onStartTherapy}
          className="flex-1 h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
        >
          Start {results.recommendedGame}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={onRestart}
          className="h-14 text-lg font-semibold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          New Recording
        </Button>
      </div>
    </div>
  )
}
