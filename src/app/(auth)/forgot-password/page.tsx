import { ForgotPasswordForm } from '../auth-form'

export const metadata = {
  title: 'Forgot Password'
}

export default function Page() {
  return (
    <section className="grow flex justify-center items-center">
      <ForgotPasswordForm />
    </section>
  )
}
