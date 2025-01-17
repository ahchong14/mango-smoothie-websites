'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { saveOrder } from '@/lib/orders'

interface PaymentGatewayProps {
  total: number
  items: any[]
  onClose: () => void
  onSuccess: () => void
}

export function PaymentGateway({ total, items, onClose, onSuccess }: PaymentGatewayProps) {
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    setProcessing(true)
    try {
      await saveOrder({
        items: items,
        total: total,
        status: 'paid',
        payment_method: 'card'
      })
      onSuccess()
    } catch (error) {
      console.error('Payment failed:', error)
      // 处理错误
    }
    setProcessing(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-center text-lg">
            Total Amount: <span className="font-bold">RM {total.toFixed(2)}</span>
          </p>
          <Button
            onClick={handlePayment}
            className="w-full"
            disabled={processing}
          >
            {processing ? <Spinner /> : 'Pay Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

