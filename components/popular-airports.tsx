import Link from 'next/link'
import { MapPin, Clock, Users } from 'lucide-react'

const airports = [
  {
    code: 'LHR',
    name: 'London Heathrow',
    city: 'London, UK',
    services: ['Fast Track', 'VIP Lounge', 'Meet & Greet'],
    avgPrice: 45,
    timeSaved: '60-90 min',
    image: '/images/airports/lhr.jpg'
  },
  {
    code: 'DXB',
    name: 'Dubai International',
    city: 'Dubai, UAE',
    services: ['Fast Track', 'VIP Lounge', 'Meet & Greet'],
    avgPrice: 35,
    timeSaved: '45-75 min',
    image: '/images/airports/dxb.jpg'
  },
  {
    code: 'JFK',
    name: 'JFK International',
    city: 'New York, USA',
    services: ['Fast Track', 'VIP Lounge', 'Meet & Greet'],
    avgPrice: 55,
    timeSaved: '75-120 min',
    image: '/images/airports/jfk.jpg'
  },
  {
    code: 'LAX',
    name: 'Los Angeles International',
    city: 'Los Angeles, USA',
    services: ['Fast Track', 'VIP Lounge', 'Meet & Greet'],
    avgPrice: 50,
    timeSaved: '60-90 min',
    image: '/images/airports/lax.jpg'
  },
  {
    code: 'CDG',
    name: 'Charles de Gaulle',
    city: 'Paris, France',
    services: ['Fast Track', 'VIP Lounge', 'Meet & Greet'],
    avgPrice: 40,
    timeSaved: '45-75 min',
    image: '/images/airports/cdg.jpg'
  },
  {
    code: 'SIN',
    name: 'Singapore Changi',
    city: 'Singapore',
    services: ['Fast Track', 'VIP Lounge', 'Meet & Greet'],
    avgPrice: 30,
    timeSaved: '30-60 min',
    image: '/images/airports/sin.jpg'
  },
]

export function PopularAirports() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Airport Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fast track and VIP services at the world's busiest airports. 
            Save time and travel in comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {airports.map((airport) => (
            <Link
              key={airport.code}
              href={`/airports/${airport.code.toLowerCase()}`}
              className="group block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-200"
            >
              {/* Airport Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{airport.code}</div>
                  <div className="text-sm text-primary-500">{airport.name}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {airport.name}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{airport.city}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      ${airport.avgPrice}
                    </div>
                    <div className="text-xs text-gray-500">avg price</div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {airport.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Save {airport.timeSaved}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Available</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-primary-600 font-medium group-hover:text-primary-700">
                    View Services →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/airports"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>View All Airports</span>
            <MapPin className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
