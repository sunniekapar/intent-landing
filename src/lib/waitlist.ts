import { supabase, type WaitlistEntry } from './supabase'

export interface WaitlistResponse {
  success: boolean
  error?: string
  data?: WaitlistEntry
}

/**
 * Add an email to the waitlist
 */
export async function addToWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      }
    }

    // Check if email already exists
    const { data: existingEntries, error: checkError } = await supabase
      .from('waitlist')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .limit(1)

    if (checkError) {
      console.error('Error checking existing email:', checkError)
      return {
        success: false,
        error: 'Something went wrong. Please try again.'
      }
    }

    if (existingEntries && existingEntries.length > 0) {
      return {
        success: false,
        error: "You're already on the waitlist!"
      }
    }

    // Add email to waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase() }])
      .select()
      .single()

    if (error) {
      console.error('Error adding email to waitlist:', error)
      return {
        success: false,
        error: 'Something went wrong. Please try again.'
      }
    }

    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('Unexpected error in addToWaitlist:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.'
    }
  }
}
