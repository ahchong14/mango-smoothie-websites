'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, Smartphone, QrCode } from 'lucide-react'

interface PaymentGatewayProps {
  total: number
  onPaymentComplete: (paymentMethod: string) => Promise<void>
  isSubmitting: boolean
}

export function PaymentGateway({ total, onPaymentComplete, isSubmitting }: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method')
      return
    }

    try {
      setError(null)
      if (paymentMethod === 'card') {
        if (!cardNumber || !expiryDate || !cvv) {
          setError('Please fill in all card details')
          return
        }
      }

      await onPaymentComplete(paymentMethod)
    } catch (error) {
      console.error('Payment error:', error)
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Payment</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <RadioGroup onValueChange={setPaymentMethod} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="tng" id="tng" />
          <Label htmlFor="tng" className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4" />
            <span>Touch 'n Go eWallet</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="duitnow" id="duitnow" />
          <Label htmlFor="duitnow" className="flex items-center space-x-2">
            <QrCode className="h-4 w-4" />
            <span>DuitNow QR</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Credit/Debit Card</span>
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod === 'card' && (
        <div className="mt-4 space-y-2">
          <Input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <Input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <Button
        onClick={handlePayment}
        className="w-full mt-4"
        disabled={isSubmitting || !paymentMethod || (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv))}
      >
        {isSubmitting ? 'Processing...' : `Pay RM ${total.toFixed(2)}`}
      </Button>
    </div>
  )
}

