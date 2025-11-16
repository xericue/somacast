'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

interface StressAssessmentProps {
  onComplete: (score: number) => void
}

export function StressAssessment({ onComplete }: StressAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const questions = [
    {
      question: "In the past week, how often have you felt overwhelmed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      question: "How difficult has it been to manage your emotions lately?",
      options: ["Very Easy", "Somewhat Easy", "Neutral", "Somewhat Hard", "Very Hard"]
    },
    {
      question: "How would you rate your current stress level?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"]
    }
  ]

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0)
      onComplete(totalScore)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h2 className="text-3xl font-bold text-foreground text-balance">
          {currentQ.question}
        </h2>
      </div>

      <div className="space-y-3">
        {currentQ.options.map((option, index) => (
          <Card
            key={index}
            className="p-6 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all border-2 border-border"
            onClick={() => handleAnswer(index)}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg text-foreground">{option}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 justify-center pt-4">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-12 rounded-full transition-colors ${
              index <= currentQuestion ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
