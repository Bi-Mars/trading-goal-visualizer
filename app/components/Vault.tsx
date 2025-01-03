import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TradeEntry from './TradeEntry'

interface VaultProps {
  startAmount: number
  goalAmount: number
  onComplete: () => void
}

interface Trade {
  amount: number
  stockName: string
  lesson: string
}

export default function Vault({ startAmount, goalAmount, onComplete }: VaultProps) {
  const [currentAmount, setCurrentAmount] = useState(startAmount)
  const [trades, setTrades] = useState<Trade[]>([])
  const [newTrade, setNewTrade] = useState<Trade>({ amount: 0, stockName: '', lesson: '' })

  const handleAddTrade = () => {
    if (newTrade.amount && newTrade.stockName) {
      setTrades([...trades, newTrade])
      setCurrentAmount(currentAmount + newTrade.amount)
      setNewTrade({ amount: 0, stockName: '', lesson: '' })

      if (currentAmount + newTrade.amount >= goalAmount) {
        onComplete()
      }
    }
  }

  const progress = ((currentAmount - startAmount) / (goalAmount - startAmount)) * 100

  // Calculate gross profits and losses
  const profitTrades = trades.filter(trade => trade.amount > 0)
  const lossTrades = trades.filter(trade => trade.amount < 0)
  
  // Calculate net trades by combining profits and losses
  const netTrades = trades.reduce((acc, trade) => {
    const existingTrade = acc.find(t => t.stockName === trade.stockName)
    if (existingTrade) {
      existingTrade.amount += trade.amount
      existingTrade.lesson += `\n${trade.lesson}`
    } else {
      acc.push({ ...trade })
    }
    return acc
  }, [] as Trade[])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Step Goal: ${startAmount.toLocaleString()} → ${goalAmount.toLocaleString()}</span>
          <span className="text-lg">
            Progress: ${currentAmount.toLocaleString()} ({Math.min(100, Math.max(0, progress)).toFixed(1)}%)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="tradeAmount">Trade Amount ($)</Label>
            <Input
              id="tradeAmount"
              type="number"
              value={newTrade.amount || ''}
              onChange={(e) => setNewTrade({ ...newTrade, amount: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="stockName">Stock Name</Label>
            <Input
              id="stockName"
              value={newTrade.stockName}
              onChange={(e) => setNewTrade({ ...newTrade, stockName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="lesson">Lesson Learned</Label>
            <Input
              id="lesson"
              value={newTrade.lesson}
              onChange={(e) => setNewTrade({ ...newTrade, lesson: e.target.value })}
            />
          </div>
        </div>
        <Button onClick={handleAddTrade} className="w-full mb-6">Add Trade</Button>
        
        <Tabs defaultValue="gross" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="gross">Gross Profit/Loss</TabsTrigger>
            <TabsTrigger value="net">Net Profit/Loss</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gross" className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-center min-h-[300px] bg-muted/30 rounded-lg p-6 bubble-container">
              {profitTrades.map((trade, index) => (
                <TradeEntry key={`profit-${index}`} trade={trade} vaultRange={goalAmount - startAmount} />
              ))}
              {lossTrades.map((trade, index) => (
                <TradeEntry key={`loss-${index}`} trade={trade} vaultRange={goalAmount - startAmount} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="net" className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-center min-h-[300px] bg-muted/30 rounded-lg p-6 bubble-container">
              {netTrades.map((trade, index) => (
                <TradeEntry key={`net-${index}`} trade={trade} vaultRange={goalAmount - startAmount} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

