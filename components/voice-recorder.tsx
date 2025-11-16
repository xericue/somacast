'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mic, Square, Loader2 } from 'lucide-react'

interface VoiceRecorderProps {
  isAnalyzing: boolean
  onRecordingComplete: (audioBlob: Blob) => void
}

export function VoiceRecorder({
  isAnalyzing,
  onRecordingComplete
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [audioLevel, setAudioLevel] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording()
            return 10
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setTimeLeft(10)
    }

    return () => clearInterval(interval)
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Set up audio visualization
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      analyserRef.current.fftSize = 256
      
      visualizeAudio()
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        onRecordingComplete(audioBlob)
        stream.getTracks().forEach(track => track.stop())
        
        if (audioContextRef.current) {
          audioContextRef.current.close()
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please grant permission.')
    }
  }

  const visualizeAudio = () => {
    if (!analyserRef.current) return
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    
    const update = () => {
      if (!analyserRef.current) return
      
      analyserRef.current.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      setAudioLevel(average / 255)
      
      animationFrameRef.current = requestAnimationFrame(update)
    }
    
    update()
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  if (isAnalyzing) {
    return (
      <Card className="p-12 mb-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Analyzing Your Voice</h3>
            <p className="text-muted-foreground">
              Processing emotional intensity and cognitive markers...
            </p>
          </div>
          {/* Animated wave */}
          <div className="flex items-center justify-center gap-1 h-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.random() * 30}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-12 mb-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Record Button */}
        <div className="relative">
          <Button
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-32 h-32 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl ${
              isRecording
                ? 'bg-destructive hover:bg-destructive/90 scale-110'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isRecording ? (
              <Square className="w-12 h-12" />
            ) : (
              <Mic className="w-12 h-12" />
            )}
          </Button>
          
          {/* Pulse animation when recording */}
          {isRecording && (
            <>
              <div 
                className="absolute inset-0 rounded-full bg-destructive/30 animate-ping"
                style={{ animationDuration: '1.5s' }}
              />
              <div 
                className="absolute inset-0 rounded-full bg-destructive/20"
                style={{ 
                  transform: `scale(${1 + audioLevel * 0.5})`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          {isRecording ? (
            <>
              <div className="text-5xl font-bold text-destructive tabular-nums">
                {timeLeft}s
              </div>
              <p className="text-muted-foreground">Recording... Click to stop early</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-foreground">
                Ready to Begin
              </h2>
              <p className="text-muted-foreground max-w-md">
                Click the microphone to record 10 seconds of your voice. Speak naturally about how you're feeling.
              </p>
            </>
          )}
        </div>

        {/* Waveform visualization */}
        {isRecording && (
          <div className="flex items-end justify-center gap-1 h-16 w-full max-w-xs">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/60 rounded-t-full transition-all duration-100"
                style={{
                  height: `${10 + audioLevel * 50 + Math.sin(Date.now() / 200 + i) * 20}%`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
