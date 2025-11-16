'use client'

import { Card } from '@/components/ui/card'
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface JournalEntry {
  date: string
  cognitiveLoad: 'LOW' | 'MED' | 'HIGH'
  emotion: string
}

// Mock data for the last 30 days
const generateMockData = (): JournalEntry[] => {
  const entries: JournalEntry[] = []
  const loads: ('LOW' | 'MED' | 'HIGH')[] = ['LOW', 'MED', 'HIGH']
  const emotions = ['Calm', 'Anxious', 'Stressed', 'Overwhelmed', 'Peaceful', 'Tense']
  
  const today = new Date()
  const journalDays = [1, 3, 5, 7, 9, 12, 14, 16, 17, 19, 21, 23, 25, 27, 29] // 15 entries
  
  journalDays.forEach(day => {
    const date = new Date(today)
    date.setDate(date.getDate() - day)
    
    // Tuesday evenings tend to be higher stress (as per demo script)
    const isHighStressDay = date.getDay() === 2 // Tuesday
    const load = isHighStressDay 
      ? (Math.random() > 0.3 ? 'HIGH' : 'MED')
      : loads[Math.floor(Math.random() * loads.length)]
    
    entries.push({
      date: date.toISOString().split('T')[0],
      cognitiveLoad: load,
      emotion: emotions[Math.floor(Math.random() * emotions.length)]
    })
  })
  
  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function JournalCalendar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [entries] = useState<JournalEntry[]>(generateMockData())
  
  // Get calendar grid for current month
  const getCalendarDays = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const entry = entries.find(e => e.date === dateStr)
      days.push({ day, entry })
    }
    
    return days
  }

  const getLoadColor = (load: 'LOW' | 'MED' | 'HIGH') => {
    switch (load) {
      case 'LOW':
        return 'bg-secondary'
      case 'MED':
        return 'bg-accent'
      case 'HIGH':
        return 'bg-destructive'
    }
  }

  const calendarDays = getCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Journal History
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({entries.length} entries this month)
          </span>
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
          {/* Calendar Grid */}
          <div className="mb-4">
            <div className="text-center font-semibold text-foreground mb-3">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((item, index) => (
                <div
                  key={index}
                  className="aspect-square flex items-center justify-center relative group"
                >
                  {item ? (
                    <>
                      <div
                        className={`w-full h-full flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          item.entry
                            ? `${getLoadColor(item.entry.cognitiveLoad)} text-white hover:scale-110`
                            : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                        }`}
                      >
                        {item.day}
                      </div>
                      {item.entry && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap border border-border">
                          <div className="font-semibold">{item.entry.emotion}</div>
                          <div className="text-muted-foreground text-xs">{item.entry.cognitiveLoad} load</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary" />
              <span className="text-sm text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent" />
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive" />
              <span className="text-sm text-muted-foreground">High</span>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-foreground mb-3">Pattern Insights</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Tuesday evenings:</strong> Consistently show higher cognitive load (avg. 74/100)
                </span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Friday mornings:</strong> Baseline calm state detected
                </span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Box breathing</strong> reduced your load by 32% on average after sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
