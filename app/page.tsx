'use client'

import { useState } from 'react'
import { MenuSection } from '@/components/ui/menu-section'
import { OrderList } from '@/components/ui/order-list'
import { PaymentGateway } from '@/components/ui/payment-gateway'

interface MenuItem {
  name: string
  price: number
  nameEn?: string
}

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([])
  const [showPayment, setShowPayment] = useState(false)

  const smoothies: MenuItem[] = [
    { name: "单一水果冰沙", nameEn: "Single Fruit Smoothies", price: 7.50 },
    { name: "芒果冰沙", nameEn: "Mango Smoothie", price: 7.50 },
    { name: "草莓冰沙", nameEn: "Strawberry Smoothie", price: 7.50 },
    { name: "百香果冰沙", nameEn: "Passion Fruit Smoothie", price: 7.50 },
    { name: "椰子冰沙", nameEn: "Coconut Smoothie", price: 7.50 },
    { name: "蓝莓冰沙", nameEn: "Blueberry Smoothie", price: 7.50 }
  ]

  const addons: MenuItem[] = [
    { name: "珍珠", nameEn: "Tapioca Pearls", price: 1.50 }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-300 to-yellow-300 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center text-white space-y-2">
          <h1 className="text-4xl font-bold">芒果冰沙</h1>
          <h2 className="text-3xl">MANGO SMOOTHIE</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <MenuSection
              title="冰沙类 / SMOOTHIES"
              items={smoothies}
              highlighted={true}
              onAddToOrder={(item) => setSelectedItems([...selectedItems, item])}
            />
            
            <MenuSection
              title="冰沙添加选项 / SMOOTHIE ADD-ONS"
              items={addons}
              highlighted={false}
              onAddToOrder={(item) => setSelectedItems([...selectedItems, item])}
            />
          </div>
          
          <div>
            <OrderList
              items={selectedItems}
              onCheckout={() => setShowPayment(true)}
              onRemove={(index) => {
                const newItems = [...selectedItems]
                newItems.splice(index, 1)
                setSelectedItems(newItems)
              }}
            />
          </div>
        </div>

        {showPayment && (
          <PaymentGateway
            total={selectedItems.reduce((sum, item) => sum + item.price, 0)}
            items={selectedItems}
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false)
              setSelectedItems([])
            }}
          />
        )}
      </div>
    </main>
  )
}

