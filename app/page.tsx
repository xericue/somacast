'use client'

import { useState } from 'react'
import { VoiceRecorder } from '@/components/voice-recorder'
import { AnalysisResults } from '@/components/analysis-results'
import { BreathingAnimation } from '@/components/breathing-animation'
import { ThemeToggle } from '@/components/theme-toggle'
import { PredictiveNotification } from '@/components/predictive-notification'
import { JournalCalendar } from '@/components/journal-calendar'

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<{
    cognitiveLoad: 'LOW' | 'MED' | 'HIGH'
    emotion: string
    action: string
    transcript?: string
  } | null>(null)
  const [showBreathing, setShowBreathing] = useState(false)
  const [showPredictiveNotification, setShowPredictiveNotification] = useState(true)
  const [hasJournaled, setHasJournaled] = useState(false)

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock results - in production, this would call your backend
    const mockResults = {
      cognitiveLoad: 'HIGH' as const,
      emotion: 'Overwhelm / Stress',
      action: 'Box Breathing (4-4-4-4)',
      transcript: 'I have so much to do today and I don\'t know where to start...'
    }
    
    setResults(mockResults)
    setIsAnalyzing(false)
    setHasJournaled(true)
  }

  const handleStartBreathing = () => {
    setShowBreathing(true)
    setHasJournaled(true)
  }

  const handleRestart = () => {
    setResults(null)
    setShowBreathing(false)
  }

  const handlePredictiveGrounding = () => {
    setShowPredictiveNotification(false)
    setShowBreathing(true)
    setHasJournaled(true)
  }

  const handleDismissNotification = () => {
    setShowPredictiveNotification(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <ThemeToggle />
      
      {showPredictiveNotification && (
        <PredictiveNotification
          onStartGrounding={handlePredictiveGrounding}
          onDismiss={handleDismissNotification}
        />
      )}
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">
            Your Safe Space
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Speak for 10 seconds. We'll understand how you're feeling and provide calming support.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{'100% private - no data stored'}</span>
          </div>
        </header>

        {/* Main Content */}
        {showBreathing ? (
          <BreathingAnimation onComplete={handleRestart} />
        ) : (
          <>
            <VoiceRecorder
              isRecording={isRecording}
              isAnalyzing={isAnalyzing}
              onRecordingChange={setIsRecording}
              onRecordingComplete={handleRecordingComplete}
            />

            {results && (
              <AnalysisResults
                results={results}
                onStartBreathing={handleStartBreathing}
                onRestart={handleRestart}
              />
            )}

            {hasJournaled && (
              <div className="mt-8">
                <JournalCalendar />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
