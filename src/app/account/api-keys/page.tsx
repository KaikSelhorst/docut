import { ApiKeysList } from './api-keys-list'
import { CreateApiKeyForm } from './create-api-key-form'

export default function Page() {
  return (
    <>
      <CreateApiKeyForm />
      <ApiKeysList />
    </>
  )
}
