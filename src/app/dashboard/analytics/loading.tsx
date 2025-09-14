import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function Loading() {
  return (
    <main className="px-4 container mx-auto my-6">
      <div className="mt-3">
        <Skeleton className="h-[32px] mb-2 w-60" />
        <Skeleton className="h-[16px] mb-2 w-32" />
        <Skeleton className="h-[260px]" />
      </div>
      <section
        className={cn(
          // to much complex
          'grid mt-12',
          '[&>*]:border-t',
          'md:[&>*]:border-l md:grid-cols-2 md:[&>*]:odd:border-l-0',
          'lg:grid-cols-3 lg:[&>*]:first:border-l-none lg:[&>*]:odd:border-l lg:[&>*]:nth-[3n+1]:border-l-0'
        )}
      >
        <div className="p-4">
          <Skeleton className="h-[300px]" />
        </div>
        <div className="p-4">
          <Skeleton className="h-[300px]" />
        </div>
        <div className="p-4">
          <Skeleton className="h-[300px]" />
        </div>
      </section>
      <section className="grid md:grid-cols-2 border-t max-md:divide-y md:divide-x">
        <div className="p-4">
          <Skeleton className="h-[300px]" />
        </div>
        <div className="p-4">
          <Skeleton className="h-[300px]" />
        </div>
      </section>
    </main>
  )
}
