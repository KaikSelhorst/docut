import { SignInForm } from '../auth-form'

export const metadata = {
  title: 'Sign-in'
}

export default function Page() {
  return (
    <section className="h-screen flex justify-center items-center">
      <SignInForm />
    </section>
  )
}
