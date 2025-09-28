'use client'

import Link from 'next/link'
import { Star, Clock, Users, Check, ArrowRight } from 'lucide-react'
import { formatPrice, formatDuration, getServiceTypeLabel, getServiceTypeColor } from '@/lib/utils'

interface Service {
  id: string
  name: string
  provider: string
  price: number
  currency: string
  duration: number
  rating: number
  reviews: number
  inclusions: string[]
  serviceType: string
  available: boolean
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(service.serviceType)}`}>
                {getServiceTypeLabel(service.serviceType)}
              </span>
              {!service.available && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Limited Availability
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">
              by {service.provider}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {formatPrice(service.price, service.currency)}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {service.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({service.reviews} reviews)
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>Duration: {formatDuration(service.duration)}</span>
        </div>

        {/* Inclusions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">What's included:</h4>
          <div className="space-y-1">
            {service.inclusions.slice(0, 3).map((inclusion, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                <span>{inclusion}</span>
              </div>
            ))}
            {service.inclusions.length > 3 && (
              <div className="text-sm text-gray-500">
                +{service.inclusions.length - 3} more inclusions
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>Up to 8 passengers</span>
          </div>
          <Link
            href={`/services/${service.id}`}
            className="btn-primary flex items-center space-x-2 text-sm px-4 py-2"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
