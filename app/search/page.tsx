'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchFilters } from '@/components/search-filters'
import { ServiceCard } from '@/components/service-card'
import { SearchResults } from '@/components/search-results'
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchData, setSearchData] = useState({
    airport: searchParams.get('airport') || '',
    flightNumber: searchParams.get('flight') || '',
    date: searchParams.get('date') || '',
    passengers: parseInt(searchParams.get('passengers') || '1'),
    serviceType: searchParams.get('type') || 'all'
  })
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call - replace with actual Supabase query
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data for demonstration
      const mockServices = [
        {
          id: '1',
          name: 'Fast Track Security',
          provider: 'Marhaba Services',
          price: 25,
          currency: 'USD',
          duration: 15,
          rating: 4.8,
          reviews: 127,
          inclusions: ['Priority security lane', 'Dedicated staff assistance', 'Mobile confirmation'],
          serviceType: 'fast_track',
          available: true
        },
        {
          id: '2',
          name: 'VIP Meet & Greet',
          provider: 'Blacklane',
          price: 85,
          currency: 'USD',
          duration: 60,
          rating: 4.9,
          reviews: 89,
          inclusions: ['Personal greeter', 'Porter service', 'Lounge access', 'Fast track immigration'],
          serviceType: 'meet_greet',
          available: true
        },
        {
          id: '3',
          name: 'Premium Lounge Access',
          provider: 'SkyVIP',
          price: 45,
          currency: 'USD',
          duration: 120,
          rating: 4.7,
          reviews: 203,
          inclusions: ['Premium lounge access', 'Complimentary food & drinks', 'WiFi', 'Shower facilities'],
          serviceType: 'vip_lounge',
          available: true
        }
      ]
      
      setServices(mockServices)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchData.airport) {
      handleSearch(new Event('submit') as any)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Airport Services
          </h1>
          <p className="text-gray-600">
            Find and book premium airport services at {searchData.airport || 'your destination'}
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Airport */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Airport
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchData.airport}
                    onChange={(e) => setSearchData({ ...searchData, airport: e.target.value.toUpperCase() })}
                    placeholder="LHR, DXB, JFK..."
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Flight Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight Number
                </label>
                <input
                  type="text"
                  value={searchData.flightNumber}
                  onChange={(e) => setSearchData({ ...searchData, flightNumber: e.target.value.toUpperCase() })}
                  placeholder="BA123, EK456..."
                  className="input-field"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={searchData.passengers}
                    onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                    className="input-field pl-10"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2 px-6"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? 'Searching...' : 'Search Services'}</span>
              </button>
            </div>
          </form>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <SearchFilters
                serviceType={searchData.serviceType}
                onServiceTypeChange={(type) => setSearchData({ ...searchData, serviceType: type })}
              />
            </div>
          )}
        </div>

        {/* Search Results */}
        <SearchResults
          services={services}
          loading={loading}
          searchData={searchData}
        />
      </div>

      <Footer />
    </div>
  )
}
