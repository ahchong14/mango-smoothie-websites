import { supabase } from './supabase-config'

export async function saveOrder(orderData: {
  items: any[],
  total: number,
  status: string,
  payment_method: string
}) {
  try {
    console.log('Attempting to save order:', orderData)
    
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()

    if (error) {
      console.error('Supabase error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      throw error
    }

    console.log('Order saved successfully:', data)
    return data
  } catch (error) {
    console.error('Failed to save order:', error)
    throw error
  }
} 