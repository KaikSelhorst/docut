import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <section className="grow flex justify-center items-center">
      <div className="max-w-xl text-center space-y-4">
        <Badge variant="outline" className="gap-1.5">
          <span
            className="size-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          Email confirmation
        </Badge>
        <hgroup>
          <h1 className="text-4xl leading-14 text-center font-medium">
            Your email has been confirmed
          </h1>
          <p className="text-muted-foreground">
            Your email address has been successfully verified. You can now
            access all features of your account.
          </p>
        </hgroup>
        <p className="text-muted-foreground italic">Thank you!</p>
        <nav className="flex gap-2 justify-center">
          <Button asChild>
            <Link href="/dashboard">
              Goto Dashboard
              <ArrowRight />
            </Link>
          </Button>
        </nav>
      </div>
    </section>
  )
}
