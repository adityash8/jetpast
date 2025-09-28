export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600">Searching for services...</p>
    </div>
  )
}
