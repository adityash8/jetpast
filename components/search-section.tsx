'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react'

export function SearchSection() {
  const [searchData, setSearchData] = useState({
    airport: '',
    flightNumber: '',
    date: '',
    passengers: 1,
    serviceType: 'all'
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to search results with parameters
    const params = new URLSearchParams()
    if (searchData.airport) params.set('airport', searchData.airport)
    if (searchData.flightNumber) params.set('flight', searchData.flightNumber)
    if (searchData.date) params.set('date', searchData.date)
    if (searchData.passengers > 1) params.set('passengers', searchData.passengers.toString())
    if (searchData.serviceType !== 'all') params.set('type', searchData.serviceType)
    
    window.location.href = `/search?${params.toString()}`
  }

  const popularAirports = [
    { code: 'LHR', name: 'London Heathrow', city: 'London' },
    { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
    { code: 'JFK', name: 'JFK International', city: 'New York' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
    { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
    { code: 'SIN', name: 'Singapore Changi', city: 'Singapore' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Airport Service
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search from hundreds of fast track, VIP lounge, and meet & greet services 
            at major airports worldwide.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                  Flight Number (Optional)
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

            {/* Service Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Service Type
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'all', label: 'All Services' },
                  { value: 'fast_track', label: 'Fast Track' },
                  { value: 'vip_lounge', label: 'VIP Lounge' },
                  { value: 'meet_greet', label: 'Meet & Greet' },
                  { value: 'baggage_assistance', label: 'Baggage Assistance' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSearchData({ ...searchData, serviceType: option.value })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      searchData.serviceType === option.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2 px-8 py-3 text-lg"
              >
                <Search className="h-5 w-5" />
                <span>Search Services</span>
              </button>
            </div>
          </form>
        </div>

        {/* Popular Airports */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
            Popular Airports
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularAirports.map(airport => (
              <button
                key={airport.code}
                onClick={() => setSearchData({ ...searchData, airport: airport.code })}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-center"
              >
                <div className="text-lg font-bold text-gray-900">{airport.code}</div>
                <div className="text-sm text-gray-600">{airport.city}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
