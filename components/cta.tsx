import Link from 'next/link'
import { ArrowRight, Smartphone, Clock, Shield } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Skip the Lines?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart travelers who save time and travel in comfort. 
            Book your first service today and experience the difference.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-white">
              <Smartphone className="h-6 w-6 text-cyan-200" />
              <span className="font-medium">Book in 3 taps</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Clock className="h-6 w-6 text-cyan-200" />
              <span className="font-medium">Save 30-120 minutes</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Shield className="h-6 w-6 text-cyan-200" />
              <span className="font-medium">500+ airports</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/search" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-colors duration-200"
            >
              Browse Services
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-primary-500/30">
            <p className="text-primary-200 text-sm mb-4">
              Trusted by business travelers at top airports worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="text-white font-semibold text-lg">LHR</div>
              <div className="text-white font-semibold text-lg">DXB</div>
              <div className="text-white font-semibold text-lg">JFK</div>
              <div className="text-white font-semibold text-lg">LAX</div>
              <div className="text-white font-semibold text-lg">CDG</div>
              <div className="text-white font-semibold text-lg">SIN</div>
              <div className="text-white font-semibold text-lg">FRA</div>
              <div className="text-white font-semibold text-lg">HKG</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
