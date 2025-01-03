export function calculateSteps(start: number, goal: number): number[] {
  const steps: number[] = [start]
  let current = start

  while (current < goal) {
    current *= 2
    if (current > goal) {
      steps.push(goal)
    } else {
      steps.push(current)
    }
  }

  return steps
}

