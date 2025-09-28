'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookingForm } from '@/components/booking-form'
import { ServiceDetails } from '@/components/service-details'
import { Star, Clock, Users, Check, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatPrice, formatDuration, getServiceTypeLabel, getServiceTypeColor } from '@/lib/utils'

export default function ServicePage() {
  const params = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with actual Supabase query
    const fetchService = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock service data
      const mockService = {
        id: params.id,
        name: 'Fast Track Security',
        provider: 'Marhaba Services',
        description: 'Skip the long security queues with our premium fast track service. Our dedicated staff will guide you through priority lanes, saving you valuable time before your flight.',
        price: 25,
        currency: 'USD',
        duration: 15,
        rating: 4.8,
        reviews: 127,
        inclusions: [
          'Priority security lane access',
          'Dedicated staff assistance',
          'Mobile confirmation and QR code',
          'Real-time updates via SMS',
          '24/7 customer support'
        ],
        exclusions: [
          'Lounge access',
          'Meet & greet service',
          'Baggage assistance'
        ],
        requirements: [
          'Valid boarding pass',
          'Government-issued ID',
          'Arrive 15 minutes before service time'
        ],
        serviceType: 'fast_track',
        available: true,
        airport: 'DXB',
        airportName: 'Dubai International Airport',
        images: ['/images/services/fast-track-1.jpg', '/images/services/fast-track-2.jpg']
      }
      
      setService(mockService)
      setLoading(false)
    }

    fetchService()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h1>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist or has been removed.</p>
            <Link href="/search" className="btn-primary">
              Browse Services
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/search" className="hover:text-gray-900">
            Search
          </Link>
          <span>/</span>
          <Link href={`/airports/${service.airport.toLowerCase()}`} className="hover:text-gray-900">
            {service.airport}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{service.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/search"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to search</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Details */}
          <div className="space-y-6">
            <ServiceDetails service={service} />
          </div>

          {/* Booking Form */}
          <div className="lg:sticky lg:top-8">
            <BookingForm service={service} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
