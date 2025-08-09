import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase'

export interface WaitlistResponse {
  success: boolean
  error?: string
}

function validateEmail(e: string) {
  const email = e.trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) throw new Error('Please enter a valid email address')
  return email
}

export const addToWaitlist = createServerFn({ method: 'POST' })
  .validator((data: unknown): { email: string } => {
    // Accept FormData (from <form action=...>), plain string, or { email }
    if (data instanceof FormData) {
      const v = data.get('email')
      if (!v) throw new Error('Please enter a valid email address')
      return { email: validateEmail(typeof v === 'string' ? v : v.toString()) }
    }

    if (typeof data === 'string') {
      return { email: validateEmail(data) }
    }

    if (data && typeof data === 'object' && 'email' in (data as any)) {
      const v = (data as any).email
      if (typeof v !== 'string') throw new Error('Please enter a valid email address')
      return { email: validateEmail(v) }
    }

    throw new Error('Please enter a valid email address')
  })
  .handler(async ({ data: { email } }) => {
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .limit(1)

    if (checkError) {
      throw new Error('Something went wrong. Please try again.')
    }
    if (existing && existing.length > 0) {
      return { success: false, error: "You're already on the waitlist!" } as WaitlistResponse
    }

    const { error } = await supabase.from('waitlist').insert([{ email }])
    if (error) {
      throw new Error('Something went wrong. Please try again.')
    }

    return { success: true } as WaitlistResponse
  })
