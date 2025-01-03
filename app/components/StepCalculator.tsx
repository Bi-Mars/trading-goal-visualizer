import { useState } from 'react'
import Vault from './Vault'
import ProgressBar from './ProgressBar'

interface StepCalculatorProps {
  steps: number[]
}

export default function StepCalculator({ steps }: StepCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleStepComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Trading Steps</h2>
      <ProgressBar totalSteps={steps.length} currentStep={currentStep} />
      <Vault
        startAmount={steps[currentStep]}
        goalAmount={steps[currentStep + 1]}
        onComplete={handleStepComplete}
      />
    </div>
  )
}

