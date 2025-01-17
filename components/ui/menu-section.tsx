import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuItem {
  name: string
  nameEn?: string
  price: number
}

interface MenuSectionProps {
  title: string
  items: MenuItem[]
  highlighted?: boolean
  onAddToOrder: (item: MenuItem) => void
}

export function MenuSection({ title, items, highlighted = false, onAddToOrder }: MenuSectionProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${
      highlighted ? 'border-2 border-yellow-400' : ''
    }`}>
      <div className="bg-yellow-400 px-6 py-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                {item.nameEn && (
                  <p className="text-sm text-gray-500">{item.nameEn}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">
                  RM {item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToOrder(item)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

