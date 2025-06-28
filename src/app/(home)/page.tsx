import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ShortLinkForm } from './short-link-form'

export default function Page() {
  return (
    <section className="container mx-auto my-4 flex justify-center items-center grow px-3 md:px-0">
      <div className="space-y-8">
        <hgroup className="max-w-2xl mx-auto flex flex-col justify-center items-center text-center">
          <Badge variant="outline" className="gap-1.5">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Service Online
          </Badge>
          <h1 className="text-4xl leading-14 font-medium">
            Build stronger digital connections
          </h1>
          <p className="text-muted-foreground">
            Use our URL shortener, QR codes, and landing pages to engage your
            audience and connect them to the right content. Create, edit, and
            track it all in the Docut Platform.
          </p>
        </hgroup>
        <ShortLinkForm />
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto text-center">
          Want analytics and link history?{' '}
          <Link
            href="/sign-up"
            className="hover:text-foreground transition-colors underline"
          >
            Create free account
          </Link>
        </p>
      </div>
    </section>
  )
}
