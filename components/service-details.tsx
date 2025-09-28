'use client'

import { Star, Clock, Users, Check, X, Shield, MapPin, Phone, Mail } from 'lucide-react'
import { formatPrice, formatDuration, getServiceTypeLabel, getServiceTypeColor } from '@/lib/utils'

interface Service {
  id: string
  name: string
  provider: string
  description: string
  price: number
  currency: string
  duration: number
  rating: number
  reviews: number
  inclusions: string[]
  exclusions: string[]
  requirements: string[]
  serviceType: string
  available: boolean
  airport: string
  airportName: string
  images: string[]
}

interface ServiceDetailsProps {
  service: Service
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getServiceTypeColor(service.serviceType)}`}>
            {getServiceTypeLabel(service.serviceType)}
          </span>
          {!service.available && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Limited Availability
            </span>
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {service.name}
        </h1>
        
        <p className="text-lg text-gray-600 mb-4">
          by {service.provider} at {service.airportName}
        </p>

        {/* Rating and Duration */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-semibold text-gray-900">
                {service.rating}
              </span>
            </div>
            <span className="text-gray-600">
              ({service.reviews} reviews)
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{formatDuration(service.duration)}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">About this service</h2>
        <p className="text-gray-700 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* What's Included */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What's included</h2>
        <div className="space-y-3">
          {service.inclusions.map((inclusion, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{inclusion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What's Not Included */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What's not included</h2>
        <div className="space-y-3">
          {service.exclusions.map((exclusion, index) => (
            <div key={index} className="flex items-start space-x-3">
              <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{exclusion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
        <div className="space-y-3">
          {service.requirements.map((requirement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Provider Contact */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Provider</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">{service.airportName}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">support@{service.provider.toLowerCase().replace(/\s+/g, '')}.com</span>
          </div>
        </div>
      </div>

      {/* Reviews Preview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {[
            {
              name: 'Alex Chen',
              rating: 5,
              comment: 'Excellent service! Saved me 45 minutes at security. The staff was very professional and helpful.',
              date: '2 days ago'
            },
            {
              name: 'Sarah Johnson',
              rating: 5,
              comment: 'Worth every penny. The fast track lane was completely empty and the process was seamless.',
              date: '1 week ago'
            },
            {
              name: 'Michael Rodriguez',
              rating: 4,
              comment: 'Good service overall. The only issue was finding the meeting point, but staff helped quickly.',
              date: '2 weeks ago'
            }
          ].map((review, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
