'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StepCalculator from './components/StepCalculator'
import { calculateSteps } from './utils/calculations'

export default function TradingGoalVisualizer() {
  const [startingCapital, setStartingCapital] = useState('')
  const [finalGoal, setFinalGoal] = useState('')
  const [steps, setSteps] = useState<number[]>([])

  const handleCalculate = () => {
    const start = parseFloat(startingCapital)
    const goal = parseFloat(finalGoal)
    if (start && goal && start < goal) {
      setSteps(calculateSteps(start, goal))
    } else {
      alert('Please enter valid starting capital and final goal.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trading Goal Visualizer</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="startingCapital">Starting Capital ($)</Label>
          <Input
            id="startingCapital"
            type="number"
            value={startingCapital}
            onChange={(e) => setStartingCapital(e.target.value)}
            placeholder="e.g., 1000"
          />
        </div>
        <div>
          <Label htmlFor="finalGoal">Final Goal ($)</Label>
          <Input
            id="finalGoal"
            type="number"
            value={finalGoal}
            onChange={(e) => setFinalGoal(e.target.value)}
            placeholder="e.g., 1000000"
          />
        </div>
      </div>
      <Button onClick={handleCalculate}>Calculate Steps</Button>
      {steps.length > 0 && <StepCalculator steps={steps} />}
    </div>
  )
}

