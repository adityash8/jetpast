import { Clock, Shield, Smartphone, Zap, Users, Star } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Save 30-120 Minutes',
    description: 'Skip long queues at security, immigration, and baggage claim with our fast track services.',
  },
  {
    icon: Shield,
    title: '500+ Airports',
    description: 'Access premium services at major airports worldwide including LHR, DXB, JFK, and more.',
  },
  {
    icon: Smartphone,
    title: 'Book in 3 Taps',
    description: 'Simple mobile-first booking experience with instant confirmations and Apple Wallet integration.',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Real-time availability and instant confirmations. No waiting for email confirmations.',
  },
  {
    icon: Users,
    title: 'Trusted Providers',
    description: 'Partnered with premium service providers like Marhaba, Blacklane, and Airssist.',
  },
  {
    icon: Star,
    title: '4.9★ Rating',
    description: 'Highly rated by business travelers and frequent flyers worldwide.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose JetPast?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make airport travel effortless with premium services, 
            transparent pricing, and seamless booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Airports Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
