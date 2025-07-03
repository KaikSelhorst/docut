import { getUser } from 'shared/lib/auth/utils'
import {
  DeleteAccount,
  UpdateDisplayName,
  UpdateEmailForm
} from './update-account-form'

export default async function Page() {
  const user = await getUser()

  if (!user) return null

  return (
    <>
      <UpdateDisplayName displayName={user.name} />
      <UpdateEmailForm email={user.email} />
      <DeleteAccount />
    </>
  )
}
