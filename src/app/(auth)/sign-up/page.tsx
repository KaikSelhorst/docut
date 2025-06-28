import { enableEmailVerification } from 'shared/env'
import { SignUpForm } from '../auth-form'

export const metadata = {
  title: 'Sign-up'
}

export default function Page() {
  return (
    <section className="grow flex justify-center items-center">
      <SignUpForm needEmailVerification={enableEmailVerification} />
    </section>
  )
}
