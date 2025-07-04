import { SiteHeader } from '@/components/site-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Notfound() {
  return (
    <section className="h-screen flex flex-col">
      <SiteHeader />
      <section className="grow flex justify-center items-center">
        <div className="max-w-xl text-center space-y-4">
          <Badge variant="outline" className="gap-1.5">
            <span
              className="size-1.5 rounded-full bg-orange-500"
              aria-hidden="true"
            />
            404
          </Badge>
          <hgroup>
            <h1 className="text-4xl leading-14 text-center font-medium">
              Page not found
            </h1>
            <p className="text-muted-foreground">
              The page you are looking for might have been removed, renamed, or
              is temporarily unavailable.
            </p>
          </hgroup>
          <p className="text-muted-foreground italic">
            But don’t worry — you can go back and try again.
          </p>
          <nav className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/">
                <ArrowLeft />
                Back to Home
              </Link>
            </Button>
          </nav>
        </div>
      </section>
    </section>
  )
}
