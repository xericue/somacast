'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Heart, Shield, Sparkles } from 'lucide-react'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Your private mental wellness companion</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-balance text-foreground">
          Find Calm in 10 Seconds
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Speak your mind. Our AI analyzes your voice to detect stress, overwhelm, and emotional patterns — then guides you to immediate relief.
        </p>

        <Button
          size="lg"
          onClick={onStart}
          className="h-16 px-12 text-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg"
        >
          Start Your Journey
        </Button>

        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          100% private - no data stored, analyzed locally
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-colors">
          <Brain className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Voice Analysis</h3>
          <p className="text-muted-foreground leading-relaxed">
            Advanced AI detects stress markers in your voice pitch, tone, and pacing to understand your emotional state.
          </p>
        </Card>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-accent/10 hover:border-accent/30 transition-colors">
          <Heart className="w-12 h-12 text-accent mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Personalized Support</h3>
          <p className="text-muted-foreground leading-relaxed">
            Get tailored therapy games and breathing exercises based on your specific emotional needs.
          </p>
        </Card>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-secondary/10 hover:border-secondary/30 transition-colors">
          <Shield className="w-12 h-12 text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Safe Space</h3>
          <p className="text-muted-foreground leading-relaxed">
            Your voice never leaves your device. All analysis happens privately with no data collection.
          </p>
        </Card>
      </div>

      {/* Social Proof */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
        <p className="text-2xl font-semibold text-foreground mb-4">
          "This helped me recognize stress before it became a crisis."
        </p>
        <p className="text-muted-foreground">
          — Sarah, using the app for 3 weeks
        </p>
      </Card>
    </div>
  )
}
