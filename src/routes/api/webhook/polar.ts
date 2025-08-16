import { createServerFileRoute } from '@tanstack/react-start/server'
import { Webhooks } from "@polar-sh/tanstack-start"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Please add VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment.')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// theres a weird edgecase that if the user refreshes the checkout link then the email / userId does not persist
// and polar has no way to know which user sent the request and how to update it
// right now not really necessary to handle that edge case but leaving this here
// we should make it so that if there is no user email provided then we have to make them sign in to their intent account so we can attach the user to the checkout details in checkout.ts
export const ServerRoute = createServerFileRoute('/api/webhook/polar').methods({
  POST: Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
    
    onSubscriptionCreated: async ({ data }: any) => {
      console.log('Subscription created:', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription created webhook')
        return
      }

      console.log(`Updating user ${userId} with subscription data:`, {
        polar_customer_id: data.customer.id,
        polar_subscription_id: data.id,
        polar_customer_email: data.customer.email,
        subscription_status: 'active',
        current_period_start: data.currentPeriodStart,
        current_period_end: data.currentPeriodEnd,
      })
      
      const { data: updateResult, error } = await supabaseAdmin
        .from('profiles')
        .update({
          polar_customer_id: data.customer.id,
          polar_subscription_id: data.id,
          polar_customer_email: data.customer.email,
          subscription_status: 'active',
          current_period_start: data.currentPeriodStart,
          current_period_end: data.currentPeriodEnd,
        })
        .eq('id', userId)
        .select()
      
      if (error) {
        console.error('Error updating profile on subscription created:', error)
      } else {
        console.log('Successfully updated profile on subscription created:', updateResult)
      }
    },
    
    onSubscriptionActive: async ({ data }: any) => {
      console.log('Subscription active (renewal):', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription active webhook')
        return
      }

      console.log(`Updating user ${userId} subscription status to active`)
      
      const { data: updateResult, error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'active',
          current_period_start: data.currentPeriodStart,
          current_period_end: data.currentPeriodEnd,
        })
        .eq('id', userId)
        .select()
      
      if (error) {
        console.error('Error updating profile on subscription active:', error)
      } else {
        console.log('Successfully updated profile on subscription active:', updateResult)
      }
    },
    
    onSubscriptionCanceled: async ({ data }: any) => {
      console.log('Subscription canceled:', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription canceled webhook')
        return
      }

      console.log(`Updating user ${userId} subscription status to canceled`)
      
      const { data: updateResult, error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'canceled',
        })
        .eq('id', userId)
        .select()
      
      if (error) {
        console.error('Error updating profile on subscription canceled:', error)
      } else {
        console.log('Successfully updated profile on subscription canceled:', updateResult)
      }
    },
    
    onSubscriptionRevoked: async ({ data }: any) => {
      console.log('Subscription revoked (immediate cancellation):', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription revoked webhook')
        return
      }

      console.log(`Updating user ${userId} subscription status to expired`)
      
      const { data: updateResult, error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'expired',
          current_period_end: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
      
      if (error) {
        console.error('Error updating profile on subscription revoked:', error)
      } else {
        console.log('Successfully updated profile on subscription revoked:', updateResult)
      }
    },
    
    onSubscriptionUncanceled: async ({ data }: any) => {
      console.log('Subscription uncanceled:', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription uncanceled webhook')
        return
      }

      console.log(`Updating user ${userId} subscription status to active (uncanceled)`)
      
      const { data: updateResult, error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'active',
        })
        .eq('id', userId)
        .select()
      
      if (error) {
        console.error('Error updating profile on subscription uncanceled:', error)
      } else {
        console.log('Successfully updated profile on subscription uncanceled:', updateResult)
      }
    },
    
    onPayload: async (payload: any) => {
      console.log('Received webhook event:', payload.type)
    }
  }),
})