import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'CEO, TechStart',
    location: 'San Francisco',
    rating: 5,
    text: 'JetPast saved me 2 hours at DXB last week. The meet & greet service was flawless - from landing to my hotel in 45 minutes. Worth every penny for business travel.',
    avatar: '/images/avatars/alex.jpg',
    airport: 'DXB'
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    location: 'London',
    rating: 5,
    text: 'As a frequent flyer, I\'ve tried many services. JetPast is by far the most reliable and user-friendly. The Apple Wallet integration is genius!',
    avatar: '/images/avatars/sarah.jpg',
    airport: 'LHR'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Digital Nomad',
    location: 'Barcelona',
    rating: 5,
    text: 'The AI flight delay predictions are spot on. It suggested fast track when my flight was delayed, and I still made my connection. Game changer!',
    avatar: '/images/avatars/michael.jpg',
    airport: 'CDG'
  },
  {
    name: 'Emma Thompson',
    role: 'Travel Agent',
    location: 'New York',
    rating: 5,
    text: 'My clients love the transparency and ease of booking. The B2B dashboard makes managing group bookings so much easier. Highly recommend!',
    avatar: '/images/avatars/emma.jpg',
    airport: 'JFK'
  },
  {
    name: 'David Kim',
    role: 'Investment Banker',
    location: 'Singapore',
    rating: 5,
    text: 'Time is money in my business. JetPast consistently delivers on their promise to save time. The VIP lounge access at SIN is exceptional.',
    avatar: '/images/avatars/david.jpg',
    airport: 'SIN'
  },
  {
    name: 'Lisa Wang',
    role: 'Consultant',
    location: 'Hong Kong',
    rating: 5,
    text: 'The booking process is incredibly smooth. Three taps and I\'m done. The real-time updates and reminders keep me stress-free during travel.',
    avatar: '/images/avatars/lisa.jpg',
    airport: 'HKG'
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who save time and travel in comfort 
            with JetPast's premium airport services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="w-6 h-6 text-primary-200" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.location} • {testimonial.airport}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-3">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-primary-700 font-semibold">
              <span className="text-2xl">4.9</span> out of 5 stars
            </div>
          </div>
          <p className="text-gray-600 mt-2">Based on 2,847 reviews from verified customers</p>
        </div>
      </div>
    </section>
  )
}
