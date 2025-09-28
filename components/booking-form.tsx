'use client'

import { useState } from 'react'
import { useAuth } from './providers'
import { useRouter } from 'next/navigation'
import { Calendar, Users, User, Mail, Phone, CreditCard, Shield, Clock } from 'lucide-react'
import { formatPrice, formatDuration, generateBookingReference } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Service {
  id: string
  name: string
  provider: string
  price: number
  currency: string
  duration: number
  serviceType: string
  available: boolean
}

interface BookingFormProps {
  service: Service
}

export function BookingForm({ service }: BookingFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    passengers: 1,
    passengerName: '',
    passengerEmail: user?.email || '',
    passengerPhone: '',
    flightNumber: '',
    airline: '',
    specialRequests: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please sign in to book services')
      router.push('/auth/signin')
      return
    }

    setLoading(true)

    try {
      // Generate booking reference
      const bookingReference = generateBookingReference()
      
      // Calculate total price
      const totalPrice = service.price * formData.passengers
      
      // Create booking in database
      const bookingData = {
        service_id: service.id,
        booking_reference: bookingReference,
        passenger_name: formData.passengerName,
        passenger_email: formData.passengerEmail,
        passenger_phone: formData.passengerPhone,
        passenger_count: formData.passengers,
        flight_number: formData.flightNumber,
        airline: formData.airline,
        service_date: formData.date,
        service_time: formData.time,
        base_price: service.price,
        total_price: totalPrice,
        currency: service.currency,
        special_requests: formData.specialRequests,
        status: 'pending'
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Booking created successfully!')
      router.push(`/booking/${bookingReference}`)
      
    } catch (error) {
      toast.error('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = service.price * formData.passengers

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(service.price, service.currency)}
          </span>
          <span className="text-sm text-gray-500">per person</span>
        </div>
        <p className="text-gray-600">
          {formatDuration(service.duration)} • {service.provider}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Passengers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
              className="input-field pl-10"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Passenger Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                value={formData.passengerName}
                onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                className="input-field pl-10"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={formData.passengerEmail}
                onChange={(e) => setFormData({ ...formData, passengerEmail: e.target.value })}
                className="input-field pl-10"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.passengerPhone}
                onChange={(e) => setFormData({ ...formData, passengerPhone: e.target.value })}
                className="input-field pl-10"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Flight Details (Optional)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flight Number
              </label>
              <input
                type="text"
                value={formData.flightNumber}
                onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                className="input-field"
                placeholder="BA123"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Airline
              </label>
              <input
                type="text"
                value={formData.airline}
                onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                className="input-field"
                placeholder="British Airways"
              />
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            rows={3}
            className="input-field"
            placeholder="Any special requirements or requests..."
          />
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              {service.name} × {formData.passengers} {formData.passengers === 1 ? 'person' : 'people'}
            </span>
            <span className="font-medium">
              {formatPrice(totalPrice, service.currency)}
            </span>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary-600">
              {formatPrice(totalPrice, service.currency)}
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Secure Booking</p>
            <p>Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !service.available}
          className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Book Now - {formatPrice(totalPrice, service.currency)}</span>
            </>
          )}
        </button>

        {!service.available && (
          <p className="text-sm text-red-600 text-center">
            This service is currently unavailable for the selected date.
          </p>
        )}
      </form>
    </div>
  )
}
