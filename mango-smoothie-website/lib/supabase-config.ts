import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export const ordersDb = {
  async saveOrder(orderData: {
    items: Array<{
      name: string
      price: number
      quantity: number
    }>
    total: number
    status: string
    payment_method: string
  }) {
    try {
      // Log the attempt
      console.log('Attempting to save order:', orderData)

      // Insert with explicit error handling
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          items: orderData.items,
          total: orderData.total,
          status: orderData.status,
          payment_method: orderData.payment_method
        }])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw new Error(`Failed to save order: ${error.message}`)
      }

      if (!data) {
        throw new Error('No data returned from database')
      }

      console.log('Order saved successfully:', data)
      return data
    } catch (error) {
      console.error('Order save error:', error)
      throw error instanceof Error ? error : new Error('Failed to save order')
    }
  },

  async getOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        throw new Error(`Failed to fetch orders: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Order fetch error:', error)
      throw error instanceof Error ? error : new Error('Failed to fetch orders')
    }
  }
}

