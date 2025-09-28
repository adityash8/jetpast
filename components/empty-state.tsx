import Link from 'next/link'
import { Search, MapPin, Plane } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
  icon?: 'search' | 'location' | 'plane'
}

export function EmptyState({ title, description, action, icon = 'search' }: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case 'location':
        return <MapPin className="w-12 h-12 text-gray-400" />
      case 'plane':
        return <Plane className="w-12 h-12 text-gray-400" />
      default:
        return <Search className="w-12 h-12 text-gray-400" />
    }
  }

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <span>{action.label}</span>
        </Link>
      )}
    </div>
  )
}
