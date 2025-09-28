-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE service_type AS ENUM ('fast_track', 'vip_lounge', 'meet_greet', 'baggage_assistance', 'concierge');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'refunded');
CREATE TYPE user_role AS ENUM ('guest', 'user', 'agent', 'admin');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'user',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Airports table
CREATE TABLE public.airports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- IATA code (e.g., LHR, DXB, JFK)
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  timezone TEXT,
  coordinates POINT,
  has_fast_track BOOLEAN DEFAULT false,
  has_vip_lounge BOOLEAN DEFAULT false,
  has_meet_greet BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service providers table
CREATE TABLE public.providers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  website_url TEXT,
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  api_endpoint TEXT,
  affiliate_rate DECIMAL(5,2) DEFAULT 0.10, -- 10% default commission
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  service_type service_type NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  duration_minutes INTEGER,
  inclusions JSONB DEFAULT '[]', -- Array of included services
  exclusions JSONB DEFAULT '[]', -- Array of excluded services
  requirements JSONB DEFAULT '{}', -- Special requirements
  availability_rules JSONB DEFAULT '{}', -- When service is available
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  booking_reference TEXT UNIQUE NOT NULL,
  status booking_status DEFAULT 'pending',
  
  -- Flight details
  flight_number TEXT,
  airline TEXT,
  departure_date TIMESTAMP WITH TIME ZONE,
  arrival_date TIMESTAMP WITH TIME ZONE,
  passenger_class TEXT, -- economy, business, first
  
  -- Passenger details
  passenger_name TEXT NOT NULL,
  passenger_email TEXT NOT NULL,
  passenger_phone TEXT,
  passenger_count INTEGER DEFAULT 1,
  
  -- Pricing
  base_price DECIMAL(10,2) NOT NULL,
  commission DECIMAL(10,2) DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  
  -- Payment
  stripe_payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  
  -- Provider integration
  provider_booking_id TEXT, -- External provider's booking reference
  provider_confirmation TEXT,
  
  -- Apple Wallet
  wallet_pass_id TEXT,
  
  -- Metadata
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI predictions table
CREATE TABLE public.flight_predictions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  airport_code TEXT NOT NULL,
  flight_number TEXT,
  airline TEXT,
  predicted_delay_minutes INTEGER,
  queue_time_minutes INTEGER,
  risk_score DECIMAL(3,2), -- 0.00 to 1.00
  confidence DECIMAL(3,2), -- 0.00 to 1.00
  data_source TEXT, -- 'aviation_api', 'scraped', 'historical'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Subscriptions table (for premium users)
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL, -- active, cancelled, past_due, etc.
  plan_name TEXT NOT NULL, -- 'premium', 'business'
  price_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_airports_code ON public.airports(code);
CREATE INDEX idx_services_airport_type ON public.services(airport_id, service_type);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at);
CREATE INDEX idx_reviews_service_id ON public.reviews(service_id);
CREATE INDEX idx_flight_predictions_airport ON public.flight_predictions(airport_code, created_at);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Users can view all reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for own bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE id = booking_id AND user_id = auth.uid()
    )
  );

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_airports_updated_at BEFORE UPDATE ON public.airports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON public.providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.airports (code, name, city, country, timezone, has_fast_track, has_vip_lounge, has_meet_greet) VALUES
('LHR', 'London Heathrow', 'London', 'United Kingdom', 'Europe/London', true, true, true),
('DXB', 'Dubai International', 'Dubai', 'United Arab Emirates', 'Asia/Dubai', true, true, true),
('JFK', 'John F. Kennedy International', 'New York', 'United States', 'America/New_York', true, true, true),
('LAX', 'Los Angeles International', 'Los Angeles', 'United States', 'America/Los_Angeles', true, true, true),
('CDG', 'Charles de Gaulle', 'Paris', 'France', 'Europe/Paris', true, true, true),
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany', 'Europe/Berlin', true, true, true),
('SIN', 'Singapore Changi', 'Singapore', 'Singapore', 'Asia/Singapore', true, true, true),
('HKG', 'Hong Kong International', 'Hong Kong', 'Hong Kong', 'Asia/Hong_Kong', true, true, true),
('NRT', 'Narita International', 'Tokyo', 'Japan', 'Asia/Tokyo', true, true, true),
('SYD', 'Sydney Kingsford Smith', 'Sydney', 'Australia', 'Australia/Sydney', true, true, true);

INSERT INTO public.providers (name, slug, description, website_url, affiliate_rate) VALUES
('Marhaba Services', 'marhaba', 'Premium airport services in Dubai and other major airports', 'https://marhaba.ae', 0.15),
('Blacklane', 'blacklane', 'Global chauffeur and airport services', 'https://blacklane.com', 0.12),
('Airssist', 'airssist', 'Airport assistance and fast track services', 'https://airssist.com', 0.10),
('SkyVIP', 'skyvip', 'VIP airport services and lounge access', 'https://skyvip.com', 0.08),
('HighPass', 'highpass', 'Fast track security and immigration services', 'https://highpass.com', 0.10);

-- Insert sample services
INSERT INTO public.services (provider_id, airport_id, name, description, service_type, base_price, currency, duration_minutes, inclusions) 
SELECT 
  p.id,
  a.id,
  'Fast Track Security',
  'Skip the security queue with our fast track service',
  'fast_track',
  25.00,
  'USD',
  15,
  '["Priority security lane", "Dedicated staff assistance", "Mobile confirmation"]'::jsonb
FROM public.providers p, public.airports a 
WHERE p.slug = 'marhaba' AND a.code = 'DXB';

INSERT INTO public.services (provider_id, airport_id, name, description, service_type, base_price, currency, duration_minutes, inclusions) 
SELECT 
  p.id,
  a.id,
  'VIP Meet & Greet',
  'Personal meet and greet service with porter assistance',
  'meet_greet',
  85.00,
  'USD',
  60,
  '["Personal greeter", "Porter service", "Lounge access", "Fast track immigration"]'::jsonb
FROM public.providers p, public.airports a 
WHERE p.slug = 'blacklane' AND a.code = 'LHR';
