import { ResetPasswordForm } from '../../auth-form'

export const metadata = {
  title: 'Reset Password'
}

export default function Page() {
  return (
    <section className="grow flex justify-center items-center">
      <ResetPasswordForm />
    </section>
  )
}
