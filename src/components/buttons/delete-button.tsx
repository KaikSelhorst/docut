import { useTransition } from 'react'
import { Button } from '../ui/button'

interface DeleteButtonProps {
  action: () => void
  children: React.ReactNode
}

export function DeleteButton({ action, children }: DeleteButtonProps) {
  const [loading, setLoading] = useTransition()

  return (
    <Button
      disabled={loading}
      className="cursor-pointer"
      variant="destructive"
      type="button"
      onClick={() => setLoading(action)}
    >
      {children}
    </Button>
  )
}
