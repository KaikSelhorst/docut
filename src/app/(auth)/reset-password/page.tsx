import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Reset Password'
}

export default function Page() {
  return (
    <section className="grow flex justify-center items-center">
      <div className="max-w-xl text-center space-y-4">
        <Badge variant="outline" className="gap-1.5">
          <span
            className="size-1.5 rounded-full bg-orange-500"
            aria-hidden="true"
          />
          Password Reset
        </Badge>
        <hgroup>
          <h1 className="text-4xl leading-14 text-center font-medium">
            Password Reset Email Sent
          </h1>
          <p className="text-muted-foreground">
            We have sent an email with a link to reset your password. Please
            check your inbox and follow the instructions.
          </p>
        </hgroup>
        <p className="text-muted-foreground italic">Good luck!</p>
        <nav className="flex gap-2 justify-center">
          <Button asChild>
            <Link href="/sign-in">
              <ArrowLeft />
              Back to Sign in
            </Link>
          </Button>
        </nav>
      </div>
    </section>
  )
}
