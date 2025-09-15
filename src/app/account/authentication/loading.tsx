import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className="border rounded-md not-first:mt-6">
      <div className="p-4 space-y-3 [&_input]:max-w-md">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-96" />
        <Skeleton className="h-10 w-96 opacity-0" />
      </div>
      <div className="flex justify-between border-t p-4 items-center">
        <Skeleton className="h-5 w-96" />
        <Skeleton className="h-10 w-16" />
      </div>
    </section>
  )
}
