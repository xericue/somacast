'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { StressAssessment } from '@/components/stress-assessment'
import { EmailCapture } from '@/components/email-capture'
import { VoiceRecorder } from '@/components/voice-recorder'
import { AnalysisResults } from '@/components/analysis-results'
import { TherapyGame } from '@/components/therapy-game'
import { ThemeToggle } from '@/components/theme-toggle'
import { JournalCalendar } from '@/components/journal-calendar'
import { SubscriptionPrompt } from '@/components/subscription-prompt'

export default function Home() {
  const [flowStep, setFlowStep] = useState<
    'landing' | 'assessment' | 'email' | 'voice' | 'results' | 'therapy' | 'calendar' | 'subscription'
  >('landing')
  const [userEmail, setUserEmail] = useState('')
  const [assessmentScore, setAssessmentScore] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [calmnessScore, setCalmnessScore] = useState(0)
  const [results, setResults] = useState<{
    cognitiveLoad: 'LOW' | 'MED' | 'HIGH'
    emotion: string
    primaryEmotions: string[]
    recommendedGame: string
    transcript?: string
  } | null>(null)
  const [dayNumber, setDayNumber] = useState(1)
  const [hasJournaled, setHasJournaled] = useState(false)

  const handleStartJourney = () => {
    setFlowStep('assessment')
  }

  const handleAssessmentComplete = (score: number) => {
    setAssessmentScore(score)
    setFlowStep('email')
  }

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email)
    setFlowStep('voice')
  }

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const calmnessValue = Math.floor(Math.random() * 40) + 30 // 30-70
    const emotionProfiles = [
      { emotion: 'Overwhelm / Anxiety', load: 'HIGH' as const, game: '5-4-3-2-1 Grounding', emotions: ['overwhelm', 'anxiety', 'stress'] },
      { emotion: 'Agitation / Frustration', load: 'HIGH' as const, game: 'Paced Breathing', emotions: ['agitation', 'frustration', 'irritation'] },
      { emotion: 'Numbness / Dissociation', load: 'MED' as const, game: 'Emotional Label Expansion', emotions: ['numbness', 'disconnection', 'emptiness'] },
      { emotion: 'Anger / Resentment', load: 'HIGH' as const, game: 'Cool-Down Cognitive Reframing', emotions: ['anger', 'resentment', 'bitterness'] },
      { emotion: 'Sadness / Grief', load: 'MED' as const, game: 'Positive Recall Exercise', emotions: ['sadness', 'grief', 'melancholy'] },
    ]
    
    const profile = emotionProfiles[Math.floor(Math.random() * emotionProfiles.length)]
    
    setCalmnessScore(calmnessValue)
    setResults({
      cognitiveLoad: profile.load,
      emotion: profile.emotion,
      primaryEmotions: profile.emotions,
      recommendedGame: profile.game,
      transcript: 'I have so much going on right now and everything feels overwhelming...'
    })
    
    setIsAnalyzing(false)
    setHasJournaled(true)
    setFlowStep('results')
  }

  const handleStartTherapy = () => {
    setFlowStep('therapy')
  }

  const handleTherapyComplete = () => {
    setFlowStep('calendar')
  }

  const handleContinueJourney = () => {
    if (dayNumber >= 5) {
      setFlowStep('subscription')
    } else {
      setDayNumber(dayNumber + 1)
      setFlowStep('voice')
      setResults(null)
      setHasJournaled(false)
    }
  }

  const handleRestart = () => {
    setFlowStep('voice')
    setResults(null)
    setHasJournaled(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {flowStep === 'landing' && (
          <LandingPage onStart={handleStartJourney} />
        )}

        {flowStep === 'assessment' && (
          <StressAssessment onComplete={handleAssessmentComplete} />
        )}

        {flowStep === 'email' && (
          <EmailCapture
            assessmentScore={assessmentScore}
            onSubmit={handleEmailSubmit}
          />
        )}

        {flowStep === 'voice' && (
          <>
            <header className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary mb-4">
                Day {dayNumber} of 5
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">
                {dayNumber === 1 ? "What's been weighing on your mind recently?" : 
                 dayNumber === 2 ? "How are you feeling compared to yesterday?" :
                 dayNumber === 3 ? "What emotions are you noticing today?" :
                 dayNumber === 4 ? "What's one thing that went well today?" :
                 "How has your week been?"}
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Speak freely for 20-30 seconds. We'll analyze your voice to understand your emotional state.
              </p>
            </header>

            <VoiceRecorder
              isAnalyzing={isAnalyzing}
              onRecordingComplete={handleRecordingComplete}
            />
          </>
        )}

        {flowStep === 'results' && results && (
          <AnalysisResults
            results={results}
            calmnessScore={calmnessScore}
            userEmail={userEmail}
            dayNumber={dayNumber}
            onStartTherapy={handleStartTherapy}
            onRestart={handleRestart}
          />
        )}

        {flowStep === 'therapy' && results && (
          <TherapyGame
            gameType={results.recommendedGame}
            emotion={results.emotion}
            onComplete={handleTherapyComplete}
          />
        )}

        {flowStep === 'calendar' && (
          <div className="space-y-8">
            <JournalCalendar />
            <div className="text-center">
              <button
                onClick={handleContinueJourney}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                {dayNumber >= 5 ? 'View Your Progress' : 'Continue Tomorrow'}
              </button>
            </div>
          </div>
        )}

        {flowStep === 'subscription' && (
          <SubscriptionPrompt
            dayNumber={dayNumber}
            improvementScore={16}
            onRestart={() => {
              setFlowStep('landing')
              setDayNumber(1)
              setResults(null)
              setHasJournaled(false)
            }}
          />
        )}
      </div>
    </main>
  )
}
