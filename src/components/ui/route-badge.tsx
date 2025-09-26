import { cn } from '@/lib/utils'

interface RouteBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  className?: string
}

const methodColors = {
  GET: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  POST: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  PATCH:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

export function RouteBadge({ method, className }: RouteBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 text-xs font-medium',
        methodColors[method],
        className
      )}
    >
      {method}
    </span>
  )
}
