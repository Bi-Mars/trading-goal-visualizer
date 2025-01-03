'use client'

import { useState, useRef, useEffect } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Card } from "@/components/ui/card"

interface TradeEntryProps {
  trade: {
    amount: number
    stockName: string
    lesson: string
  }
  vaultRange: number
}

export default function TradeEntry({ trade, vaultRange }: TradeEntryProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const bubbleRef = useRef<HTMLDivElement>(null)
  const isProfit = trade.amount > 0
  
  // Calculate bubble size
  const minSize = 40
  const maxSize = 200
  const sizePercentage = Math.abs(trade.amount) / vaultRange
  const size = Math.max(minSize, Math.min(maxSize, sizePercentage * 400))

  useEffect(() => {
    const bubble = bubbleRef.current
    if (!bubble) return

    const container = bubble.closest('.bubble-container')
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Calculate distance between mouse and bubble center
      const bubbleRect = bubble.getBoundingClientRect()
      const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2 - rect.left
      const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2 - rect.top
      
      // Calculate movement based on distance (max 20px movement)
      const deltaX = (x - bubbleCenterX) / 10
      const deltaY = (y - bubbleCenterY) / 10
      const moveX = Math.min(Math.max(deltaX, -20), 20)
      const moveY = Math.min(Math.max(deltaY, -20), 20)

      setPosition({ x: moveX, y: moveY })
    }

    const handleMouseLeave = () => {
      // Reset position when mouse leaves container
      setPosition({ x: 0, y: 0 })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          ref={bubbleRef}
          className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out
            ${isProfit ? 'bg-green-500/90' : 'bg-red-500/90'} text-white font-medium
            shadow-lg hover:shadow-xl`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            fontSize: `${Math.max(12, size / 4)}px`,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div className="flex flex-col items-center">
            <span>{trade.stockName}</span>
            <span>{isProfit ? '+' : '-'}${Math.abs(trade.amount).toLocaleString()}</span>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="font-semibold">{trade.stockName}</h4>
            <span className={`font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
              {isProfit ? '+' : '-'}${Math.abs(trade.amount).toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Lesson Learned:</strong>
            <p className="mt-1 whitespace-pre-line">{trade.lesson}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

