import { SignUpForm } from '../auth-form'

export const metadata = {
  title: 'Sign-up'
}

export default function Page() {
  return (
    <section className="h-screen flex justify-center items-center">
      <SignUpForm />
    </section>
  )
}
