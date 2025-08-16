import { createServerFileRoute } from '@tanstack/react-start/server'
import { Webhooks } from "@polar-sh/tanstack-start"
import { supabase } from '../../../lib/supabase'

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
      
      const { error } = await supabase
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
      
      if (error) {
        console.error('Error updating profile on subscription created:', error)
      }
    },
    
    onSubscriptionActive: async ({ data }: any) => {
      console.log('Subscription active (renewal):', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription active webhook')
        return
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
          current_period_start: data.currentPeriodStart,
          current_period_end: data.currentPeriodEnd,
        })
        .eq('id', userId)
      
      if (error) {
        console.error('Error updating profile on subscription active:', error)
      }
    },
    
    onSubscriptionCanceled: async ({ data }: any) => {
      console.log('Subscription canceled:', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription canceled webhook')
        return
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'canceled',
        })
        .eq('id', userId)
      
      if (error) {
        console.error('Error updating profile on subscription canceled:', error)
      }
    },
    
    onSubscriptionRevoked: async ({ data }: any) => {
      console.log('Subscription revoked (immediate cancellation):', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription revoked webhook')
        return
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'expired',
          current_period_end: new Date().toISOString(),
        })
        .eq('id', userId)
      
      if (error) {
        console.error('Error updating profile on subscription revoked:', error)
      }
    },
    
    onSubscriptionUncanceled: async ({ data }: any) => {
      console.log('Subscription uncanceled:', data)
      
      const userId = data.customer?.externalId
      if (!userId) {
        console.error('No externalId in subscription uncanceled webhook')
        return
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
        })
        .eq('id', userId)
      
      if (error) {
        console.error('Error updating profile on subscription uncanceled:', error)
      }
    },
    
    onPayload: async (payload: any) => {
      console.log('Received webhook event:', payload.type)
    }
  }),
})