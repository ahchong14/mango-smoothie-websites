import React from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface OrderListProps {
  items: OrderItem[]
  onRemoveItem: (index: number) => void
  onClearOrder: () => void
}

export function OrderList({ items, onRemoveItem, onClearOrder }: OrderListProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Your Order</h2>
      <ScrollArea className="h-64 mb-4">
        {items.length === 0 ? (
          <p className="text-gray-500">Your order is empty</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="flex items-center">
                  RM {(item.price * item.quantity).toFixed(2)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      <div className="flex justify-between items-center font-bold text-lg">
        <span>Total:</span>
        <span>RM {total.toFixed(2)}</span>
      </div>
      <Button
        onClick={onClearOrder}
        variant="outline"
        className="w-full mt-4"
        disabled={items.length === 0}
      >
        Clear Order
      </Button>
    </div>
  )
}

