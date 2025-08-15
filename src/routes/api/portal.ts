import { createServerFileRoute } from '@tanstack/react-start/server'
import { CustomerPortal } from "@polar-sh/tanstack-start"
import { supabase } from '../../lib/supabase'

export const ServerRoute = createServerFileRoute('/api/portal').methods({
  GET: CustomerPortal({
    server: "sandbox",
    accessToken: process.env.POLAR_ACCESS_TOKEN!,
    getCustomerId: async (request: Request) => {
      const url = new URL(request.url)
      const userId = url.searchParams.get('userId')
      
      if (!userId) {
        console.error('No userId provided to portal route')
        return ''
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('polar_customer_id')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('Error fetching polar customer ID:', error)
        return ''
      }
      
      return data?.polar_customer_id || ''
    },
    server: 'sandbox'
  }),
})