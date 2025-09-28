'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Clock, Shield, Star } from 'lucide-react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-cyan-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Skip the Lines,
            <br />
            <span className="text-cyan-200">Arrive in Style</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get VIP Fast Track access at 500+ airports worldwide. 
            Book premium airport services in just 3 taps.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by airport code (e.g., LHR, DXB, JFK)..."
                className="block w-full pl-12 pr-32 py-4 text-lg border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-cyan-300 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <span className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center">
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 text-white">
              <Clock className="h-6 w-6 text-cyan-200" />
              <div className="text-left">
                <div className="text-2xl font-bold">30-120 min</div>
                <div className="text-primary-200 text-sm">Time Saved</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Shield className="h-6 w-6 text-cyan-200" />
              <div className="text-left">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-primary-200 text-sm">Airports</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Star className="h-6 w-6 text-cyan-200" />
              <div className="text-left">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-primary-200 text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="btn-primary bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4">
              Browse Services
            </Link>
            <Link href="/auth/signup" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              Get Started Free
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-primary-500/30">
            <p className="text-primary-200 text-sm mb-4">Trusted by business travelers at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white font-semibold">LHR</div>
              <div className="text-white font-semibold">DXB</div>
              <div className="text-white font-semibold">JFK</div>
              <div className="text-white font-semibold">LAX</div>
              <div className="text-white font-semibold">CDG</div>
              <div className="text-white font-semibold">SIN</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
        </svg>
      </div>
    </section>
  )
}
