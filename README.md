# JetPast - FastTrack VIP Services

🚅 **Skip the lines, arrive in style.** Premium airport services at 500+ airports worldwide.

## Overview

JetPast is a mobile-first platform that aggregates fragmented airport fast track, VIP, and meet & greet services from providers like Airssist, Blacklane, Marhaba, and others. Users can search by airport, airline, and class, view options with transparent pricing, book instantly, and receive confirmations with Apple Wallet integration.

## Features

### ✅ Implemented (MVP)
- **Search & Discovery**: Search services by airport, flight details, and filters
- **Service Details**: Comprehensive service information with inclusions, reviews, and pricing
- **Booking Flow**: Complete booking process with passenger details and payment
- **Authentication**: Email/password and OAuth (Google) sign-in/sign-up
- **Responsive Design**: Mobile-first design optimized for all devices
- **Database Schema**: Complete Supabase schema for users, services, bookings, and reviews

### 🚧 In Progress
- **Stripe Integration**: Payment processing and booking confirmations
- **Apple Wallet**: Pass generation and integration
- **AI Upsell**: Flight delay predictions and service recommendations

### 📋 Planned
- **B2B Dashboard**: Admin panel for travel agents and bulk bookings
- **Mobile App**: React Native app with core features
- **Provider APIs**: Direct integration with service providers
- **Real-time Updates**: Live availability and pricing

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe
- **Deployment**: Vercel
- **UI Components**: Custom components with Lucide React icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jetpast.git
   cd jetpast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   ```bash
   # Run the schema.sql file in your Supabase SQL editor
   cat supabase/schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
jetpast/
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   ├── search/            # Search functionality
│   ├── services/          # Service details and booking
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   └── booking/          # Booking flow components
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts       # Supabase client setup
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Helper functions
├── supabase/             # Database schema and migrations
│   └── schema.sql        # Complete database schema
└── types/                # TypeScript type definitions
```

## Key Features Explained

### 1. Search & Discovery
- **Airport Search**: Search by IATA codes (LHR, DXB, JFK, etc.)
- **Service Filters**: Filter by service type, price range, duration, and rating
- **Real-time Results**: Fast search with loading states and empty states

### 2. Service Details
- **Comprehensive Info**: Detailed service descriptions, inclusions, and requirements
- **Provider Information**: Contact details and service provider information
- **Reviews & Ratings**: Customer reviews and ratings display

### 3. Booking Flow
- **Passenger Details**: Collect passenger information and flight details
- **Price Calculation**: Dynamic pricing based on passenger count
- **Secure Payment**: Stripe integration for secure payment processing

### 4. Authentication
- **Multiple Options**: Email/password and OAuth (Google) authentication
- **User Profiles**: User preferences and booking history
- **Role-based Access**: Different access levels for users and admins

## Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **profiles**: User profiles and preferences
- **airports**: Airport information and available services
- **providers**: Service provider details and affiliate rates
- **services**: Individual services with pricing and details
- **bookings**: Booking records with payment and status information
- **reviews**: Customer reviews and ratings
- **subscriptions**: Premium user subscriptions

## API Integration

### Supabase
- **Authentication**: User management and session handling
- **Database**: PostgreSQL with real-time subscriptions
- **Storage**: File uploads for service images and documents

### Stripe
- **Payments**: Secure payment processing
- **Webhooks**: Handle payment confirmations and failures
- **Subscriptions**: Premium user subscription management

### External APIs (Planned)
- **Aviation APIs**: Flight delay and status information
- **Provider APIs**: Direct integration with service providers
- **Apple Wallet**: Pass generation and updates

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Business Model

- **Affiliate Commissions**: 8-15% commission from service providers
- **Subscription Revenue**: $49/year premium tier with discounts
- **B2B White-label**: Custom solutions for travel agents and airlines
- **AI Upsells**: Premium flight risk predictions and recommendations

## Market Validation

- **Target Market**: Business travelers, digital nomads, frequent flyers
- **Pain Points**: Inconsistent booking UX, hidden availability, long queues
- **Solution**: Standardized discovery and reservations across 500+ airports
- **Revenue Potential**: $1K MRR in 30 days, $10K MRR in 6 months

## Roadmap

### Phase 1: MVP (Current)
- ✅ Core search and booking functionality
- ✅ User authentication and profiles
- ✅ Basic payment integration
- 🚧 Apple Wallet integration
- 🚧 AI flight predictions

### Phase 2: Growth
- 📋 Mobile app development
- 📋 Provider API integrations
- 📋 B2B dashboard
- 📋 Advanced analytics

### Phase 3: Scale
- 📋 International expansion
- 📋 Additional service types
- 📋 Corporate partnerships
- 📋 Advanced AI features

## Support

For support, email support@jetpast.com or join our Discord community.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for travelers who value their time.**
