'use client'

import { useState } from 'react'
import { MenuSection } from "@/components/ui/menu-section"
import { OrderList } from "@/components/ui/order-list"
import { PaymentGateway } from "@/components/ui/payment-gateway"
import { Button } from "@/components/ui/button"
import { ordersDb } from '@/lib/supabase-config'
import { ErrorBoundary } from '@/components/error-boundary'

interface MenuItem {
  name: string
  price: number
}

interface OrderItem extends MenuItem {
  quantity: number
}

export default function MenuPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [showPayment, setShowPayment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addToOrder = (item: MenuItem) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name)
      if (existingItem) {
        return prevItems.map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromOrder = (index: number) => {
    setOrderItems(prevItems => {
      const newItems = [...prevItems]
      newItems.splice(index, 1)
      return newItems
    })
  }

  const clearOrder = () => {
    setOrderItems([])
    setShowPayment(false)
  }

  const handlePaymentComplete = async (paymentMethod: string) => {
    setIsSubmitting(true)
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    try {
      console.log('Processing payment with method:', paymentMethod)
      console.log('Order items:', orderItems)
      console.log('Total:', total)

      const order = await ordersDb.saveOrder({
        items: orderItems,
        total,
        status: 'paid',
        payment_method: paymentMethod,
      })

      console.log('Order saved successfully:', order)
      alert(`Thank you for your order! Your order ID is: ${order.id}`)
      clearOrder()
      setShowPayment(false)
    } catch (error) {
      console.error('Error creating order:', error)
      alert(error instanceof Error ? error.message : 'There was an error processing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gradient-to-r from-orange-400 to-yellow-300 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            芒果冰沙
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            MANGO SMOOTHIE
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white/90 rounded-xl p-6 space-y-8 backdrop-blur-sm">
              <MenuSection
                title="冰沙类 / SMOOTHIES"
                items={[
                  { name: "单一水果冰沙 / Single Fruit Smoothies", price: 7.50 },
                  { name: "芒果冰沙 / Mango Smoothie", price: 7.50 },
                  { name: "草莓冰沙 / Strawberry Smoothie", price: 7.50 },
                  { name: "百香果冰沙 / Passion Fruit Smoothie", price: 7.50 },
                  { name: "椰子冰沙 / Coconut Smoothie", price: 7.50 },
                  { name: "蓝莓冰沙 / Blueberry Smoothie", price: 7.50 },
                ]}
                onAddToOrder={addToOrder}
              />

              <MenuSection
                title="冰沙添加选项 / SMOOTHIE ADD-ONS"
                items={[
                  { name: "珍珠 (Tapioca Pearls)", price: 1.50 },
                  { name: "果冻 (Fruit Jelly)", price: 1.50 },
                  { name: "椰果 (Nata de Coco)", price: 1.50 },
                  { name: "芋圆 (Taro Balls)", price: 2.00 },
                  { name: "酸奶 (Yogurt)", price: 2.00 },
                  { name: "奶油顶 (Whipped Cream)", price: 1.50 },
                ]}
                onAddToOrder={addToOrder}
              />

              <MenuSection
                title="混合水果冰沙 / MIXED FRUIT SMOOTHIES"
                items={[
                  { name: "草莓芒果冰沙 / Strawberry Mango Smoothie", price: 10.00 },
                  { name: "百香果芒果冰沙 / Passion Fruit Mango Smoothie", price: 10.00 },
                  { name: "椰子芒果冰沙 / Coconut Mango Smoothie", price: 10.00 },
                  { name: "蓝莓芒果冰沙 / Blueberry Mango Smoothie", price: 10.00 },
                  { name: "热带混合冰沙 (芒果+香蕉+椰子) / Tropical Mixed Smoothie", price: 10.00 },
                ]}
                onAddToOrder={addToOrder}
              />

              <MenuSection
                title="炸类食品 / FRIED FOODS"
                items={[
                  { name: "炸鸡排 / Fried Chicken Cutlet", price: 10.00 },
                  { name: "炸薯条 / French Fries", price: 6.00 },
                  { name: "炸鱿鱼圈 / Fried Calamari", price: 12.00 },
                  { name: "炸甜薯球 / Fried Sweet Potato Balls", price: 8.00 },
                  { name: "炸洋葱圈 / Onion Rings", price: 8.00 },
                ]}
                onAddToOrder={addToOrder}
              />

              <MenuSection
                title="套餐组合 / COMBO MEALS"
                highlighted={true}
                items={[
                  { name: "芒果冰沙+炸鸡排套餐 / Mango Smoothie + Fried Chicken Cutlet Combo", price: 15.00 },
                  { name: "草莓芒果冰沙+炸薯条套餐 / Strawberry Mango Smoothie + French Fries Combo", price: 15.00 },
                  { name: "椰子芒果冰沙+炸鱿鱼圈套餐 / Coconut Mango Smoothie + Fried Calamari Combo", price: 18.00 },
                  { name: "百香果芒果冰沙+炸甜薯球套餐 / Passion Fruit Mango + Fried Sweet Potato Balls Combo", price: 18.00 },
                  { name: "蓝莓芒果冰沙+炸洋葱圈套餐 / Blueberry Mango Smoothie + Onion Rings Combo", price: 18.00 },
                ]}
                onAddToOrder={addToOrder}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-4 space-y-4">
              <OrderList
                items={orderItems}
                onRemoveItem={removeFromOrder}
                onClearOrder={clearOrder}
              />
              {orderItems.length > 0 && !showPayment && (
                <Button
                  onClick={() => setShowPayment(true)}
                  className="w-full"
                >
                  Proceed to Payment
                </Button>
              )}
              {showPayment && (
                <PaymentGateway
                  total={total}
                  onPaymentComplete={handlePaymentComplete}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  )
}

