import { UpdatePassword } from './update-password-form'

export default async function Page() {
  await new Promise((r) => setTimeout(r, 300))
  return <UpdatePassword />
}
