'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'

interface SearchFiltersProps {
  serviceType: string
  onServiceTypeChange: (type: string) => void
}

export function SearchFilters({ serviceType, onServiceTypeChange }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [duration, setDuration] = useState([0, 120])
  const [rating, setRating] = useState(0)

  const serviceTypes = [
    { value: 'all', label: 'All Services', count: 24 },
    { value: 'fast_track', label: 'Fast Track', count: 8 },
    { value: 'vip_lounge', label: 'VIP Lounge', count: 6 },
    { value: 'meet_greet', label: 'Meet & Greet', count: 5 },
    { value: 'baggage_assistance', label: 'Baggage Assistance', count: 3 },
    { value: 'concierge', label: 'Concierge', count: 2 },
  ]

  const providers = [
    { name: 'Marhaba Services', count: 8 },
    { name: 'Blacklane', count: 6 },
    { name: 'Airssist', count: 5 },
    { name: 'SkyVIP', count: 3 },
    { name: 'HighPass', count: 2 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Service Type */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Service Type</h3>
        <div className="space-y-2">
          {serviceTypes.map((type) => (
            <label key={type.value} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  value={type.value}
                  checked={serviceType === type.value}
                  onChange={(e) => onServiceTypeChange(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{type.label}</span>
              </div>
              <span className="text-xs text-gray-500">({type.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Duration (minutes)</h3>
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={120}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{duration[0]} min</span>
            <span>{duration[1]} min</span>
          </div>
        </div>
      </div>

      {/* Rating & Providers */}
      <div className="space-y-6">
        {/* Rating */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rate) => (
              <label key={rate} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rate}
                  checked={rating === rate}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {rate}+ ⭐ ({rate === 4.5 ? '12' : rate === 4.0 ? '18' : rate === 3.5 ? '8' : '4'})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Providers */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Providers</h3>
          <div className="space-y-2">
            {providers.map((provider) => (
              <label key={provider.name} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{provider.name}</span>
                </div>
                <span className="text-xs text-gray-500">({provider.count})</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
