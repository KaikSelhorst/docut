import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from './button'

interface CopyInputProps {
  text: string
}

export function CopyInput({ text }: CopyInputProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="text-muted-foreground p-1 pl-2 bg-secondary border rounded-md flex gap-2 items-center justify-between font-mono">
      <input defaultValue={text} className="grow outline-0" disabled />
      <Button
        className="size-8"
        type="button"
        variant="outline"
        aria-label="Copy API key"
        onClick={() => copyToClipboard(text)}
      >
        {isCopied ? <Check size={12} /> : <Copy size={12} />}
      </Button>
    </div>
  )
}
