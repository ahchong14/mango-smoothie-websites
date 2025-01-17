import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface OrderItem {
  name: string
  price: number
}

interface OrderListProps {
  items: OrderItem[]
  onCheckout: () => void
  onRemove: (index: number) => void
}

export function OrderList({ items, onCheckout, onRemove }: OrderListProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-green-400 text-white rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl font-bold">Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your order is empty</p>
        ) : (
          <>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm md:text-base">{item.name}</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-sm md:text-base mr-2">
                      RM {item.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => onRemove(index)}
                      size="sm"
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">RM {total.toFixed(2)}</span>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full mt-4"
                variant="default"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

