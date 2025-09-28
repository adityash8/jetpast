import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Client-side Supabase client
export const createSupabaseClient = () => {
  return createClientComponentClient()
}

// Server-side Supabase client
export const createSupabaseServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

// Admin client for server-side operations
export const createSupabaseAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Types for our database
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'guest' | 'user' | 'agent' | 'admin'
          preferences: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'guest' | 'user' | 'agent' | 'admin'
          preferences?: Record<string, any>
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'guest' | 'user' | 'agent' | 'admin'
          preferences?: Record<string, any>
        }
      }
      airports: {
        Row: {
          id: string
          code: string
          name: string
          city: string
          country: string
          timezone: string | null
          coordinates: string | null
          has_fast_track: boolean
          has_vip_lounge: boolean
          has_meet_greet: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          city: string
          country: string
          timezone?: string | null
          coordinates?: string | null
          has_fast_track?: boolean
          has_vip_lounge?: boolean
          has_meet_greet?: boolean
        }
        Update: {
          id?: string
          code?: string
          name?: string
          city?: string
          country?: string
          timezone?: string | null
          coordinates?: string | null
          has_fast_track?: boolean
          has_vip_lounge?: boolean
          has_meet_greet?: boolean
        }
      }
      providers: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          website_url: string | null
          logo_url: string | null
          contact_email: string | null
          contact_phone: string | null
          api_endpoint: string | null
          affiliate_rate: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          website_url?: string | null
          logo_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          api_endpoint?: string | null
          affiliate_rate?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          website_url?: string | null
          logo_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          api_endpoint?: string | null
          affiliate_rate?: number
          is_active?: boolean
        }
      }
      services: {
        Row: {
          id: string
          provider_id: string
          airport_id: string
          name: string
          description: string | null
          service_type: 'fast_track' | 'vip_lounge' | 'meet_greet' | 'baggage_assistance' | 'concierge'
          base_price: number
          currency: string
          duration_minutes: number | null
          inclusions: any[]
          exclusions: any[]
          requirements: Record<string, any>
          availability_rules: Record<string, any>
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          airport_id: string
          name: string
          description?: string | null
          service_type: 'fast_track' | 'vip_lounge' | 'meet_greet' | 'baggage_assistance' | 'concierge'
          base_price: number
          currency?: string
          duration_minutes?: number | null
          inclusions?: any[]
          exclusions?: any[]
          requirements?: Record<string, any>
          availability_rules?: Record<string, any>
          is_active?: boolean
        }
        Update: {
          id?: string
          provider_id?: string
          airport_id?: string
          name?: string
          description?: string | null
          service_type?: 'fast_track' | 'vip_lounge' | 'meet_greet' | 'baggage_assistance' | 'concierge'
          base_price?: number
          currency?: string
          duration_minutes?: number | null
          inclusions?: any[]
          exclusions?: any[]
          requirements?: Record<string, any>
          availability_rules?: Record<string, any>
          is_active?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          service_id: string
          booking_reference: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded'
          flight_number: string | null
          airline: string | null
          departure_date: string | null
          arrival_date: string | null
          passenger_class: string | null
          passenger_name: string
          passenger_email: string
          passenger_phone: string | null
          passenger_count: number
          base_price: number
          commission: number
          total_price: number
          currency: string
          stripe_payment_intent_id: string | null
          payment_status: string
          provider_booking_id: string | null
          provider_confirmation: string | null
          wallet_pass_id: string | null
          notes: string | null
          metadata: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_id: string
          booking_reference: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded'
          flight_number?: string | null
          airline?: string | null
          departure_date?: string | null
          arrival_date?: string | null
          passenger_class?: string | null
          passenger_name: string
          passenger_email: string
          passenger_phone?: string | null
          passenger_count?: number
          base_price: number
          commission?: number
          total_price: number
          currency?: string
          stripe_payment_intent_id?: string | null
          payment_status?: string
          provider_booking_id?: string | null
          provider_confirmation?: string | null
          wallet_pass_id?: string | null
          notes?: string | null
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          user_id?: string
          service_id?: string
          booking_reference?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded'
          flight_number?: string | null
          airline?: string | null
          departure_date?: string | null
          arrival_date?: string | null
          passenger_class?: string | null
          passenger_name?: string
          passenger_email?: string
          passenger_phone?: string | null
          passenger_count?: number
          base_price?: number
          commission?: number
          total_price?: number
          currency?: string
          stripe_payment_intent_id?: string | null
          payment_status?: string
          provider_booking_id?: string | null
          provider_confirmation?: string | null
          wallet_pass_id?: string | null
          notes?: string | null
          metadata?: Record<string, any>
        }
      }
    }
  }
}
