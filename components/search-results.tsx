'use client'

import { ServiceCard } from './service-card'
import { EmptyState } from './empty-state'
import { LoadingSpinner } from './loading-spinner'

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

interface SearchResultsProps {
  services: Service[]
  loading: boolean
  searchData: {
    airport: string
    flightNumber: string
    date: string
    passengers: number
    serviceType: string
  }
}

export function SearchResults({ services, loading, searchData }: SearchResultsProps) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (services.length === 0 && searchData.airport) {
    return (
      <EmptyState
        title="No services found"
        description={`We couldn't find any services for ${searchData.airport}. Try searching for a different airport or adjust your filters.`}
        action={{
          label: 'Browse all airports',
          href: '/airports'
        }}
      />
    )
  }

  if (services.length === 0) {
    return (
      <EmptyState
        title="Search for airport services"
        description="Enter an airport code to find available fast track, VIP lounge, and meet & greet services."
        action={{
          label: 'Popular airports',
          href: '/airports'
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {services.length} service{services.length !== 1 ? 's' : ''} found
          </h2>
          <p className="text-gray-600">
            {searchData.airport && `at ${searchData.airport}`}
            {searchData.date && ` • ${new Date(searchData.date).toLocaleDateString()}`}
            {searchData.passengers > 1 && ` • ${searchData.passengers} passengers`}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="input-field text-sm">
            <option value="relevance">Sort by relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="duration">Shortest Duration</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Load More */}
      {services.length >= 6 && (
        <div className="text-center pt-8">
          <button className="btn-secondary">
            Load More Services
          </button>
        </div>
      )}
    </div>
  )
}
