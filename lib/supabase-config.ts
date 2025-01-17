import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xfiuweihwjxcmvnvschh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaXV3ZWlod2p4Y212bnZzY2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzIzNDEsImV4cCI6MjA1MjQ0ODM0MX0.42O6U0g52duEkOIDcbW80JuzVlgjaufXf8lhipbmjB0'

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

