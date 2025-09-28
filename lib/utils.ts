import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}m`
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateBookingReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'JP'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function calculateTimeSaved(serviceType: string): string {
  switch (serviceType) {
    case 'fast_track':
      return '30-60 min'
    case 'vip_lounge':
      return '45-90 min'
    case 'meet_greet':
      return '60-120 min'
    case 'baggage_assistance':
      return '15-30 min'
    case 'concierge':
      return '30-60 min'
    default:
      return '30-90 min'
  }
}

export function getServiceTypeLabel(serviceType: string): string {
  switch (serviceType) {
    case 'fast_track':
      return 'Fast Track'
    case 'vip_lounge':
      return 'VIP Lounge'
    case 'meet_greet':
      return 'Meet & Greet'
    case 'baggage_assistance':
      return 'Baggage Assistance'
    case 'concierge':
      return 'Concierge'
    default:
      return 'Service'
  }
}

export function getServiceTypeColor(serviceType: string): string {
  switch (serviceType) {
    case 'fast_track':
      return 'bg-blue-100 text-blue-800'
    case 'vip_lounge':
      return 'bg-purple-100 text-purple-800'
    case 'meet_greet':
      return 'bg-green-100 text-green-800'
    case 'baggage_assistance':
      return 'bg-yellow-100 text-yellow-800'
    case 'concierge':
      return 'bg-pink-100 text-pink-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
