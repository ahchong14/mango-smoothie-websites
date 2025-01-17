import { NextResponse } from 'next/server'
import { ordersDb } from '@/lib/supabase-config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, total, payment_method } = body

    const order = await ordersDb.saveOrder({
      items,
      total,
      status: 'paid',
      payment_method,
    })

    return NextResponse.json({ orderId: order.id }, { status: 201 })
  } catch (error) {
    console.error('Failed to create order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

