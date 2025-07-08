import { useCallback, useEffect, useState } from 'react'
import { authClient } from 'shared/lib/auth/client'

type APIError = { message?: string }
type Key = {
  id: string
  start: string | null
  name: string | null
  expiresAt: Date | null
  enabled: boolean
}

type ApiState =
  | { data: Key[]; error: null; loading: boolean; refresh: () => void }
  | { data: null; error: APIError; loading: boolean; refresh: () => void }

export function useListApiKeys(): ApiState {
  const [data, setData] = useState<Key[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)
  const [loading, setLoading] = useState(true)

  const ft = useCallback(async () => {
    const { data, error } = await authClient.apiKey.list()
    await new Promise((r) => setTimeout(r, 300))
    setLoading(false)
    setError(error)
    setData(data)
  }, [])

  useEffect(() => {
    ft()
  }, [ft])

  return { data, error, loading, refresh: () => ft() } as ApiState
}
