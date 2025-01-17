import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuItem {
  name: string
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
    <Card className={cn(
      "border-none shadow-lg",
      highlighted && "bg-gradient-to-r from-orange-100 to-yellow-100"
    )}>
      <CardHeader className={cn(
        "bg-yellow-400 text-white rounded-t-lg",
        highlighted && "bg-gradient-to-r from-orange-400 to-yellow-400"
      )}>
        <CardTitle className="text-xl md:text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <span className="text-sm md:text-base">{item.name}</span>
              <div className="flex items-center">
                <span className="font-semibold text-sm md:text-base mr-2">
                  RM {item.price.toFixed(2)}
                </span>
                <Button
                  onClick={() => onAddToOrder(item)}
                  size="sm"
                  variant="outline"
                >
                  Add
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

