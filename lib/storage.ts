import { supabase } from './supabase'

export interface Order {
  id: string;
  created_at: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: string;
  payment_method: string;
}

export const storage = {
  saveOrder: async (order: Omit<Order, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) throw error
    return data
  },

  getOrders: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

