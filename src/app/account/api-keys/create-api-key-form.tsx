'use client'
import { DefaultField, DefaultSelectField } from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createApiKeySchema } from 'client/schemas/api-key-schema'
import dayjs from 'dayjs'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authClient } from 'shared/lib/auth/client'
import { toast } from 'sonner'

export function CreateApiKeyForm() {
  const [isCopied, setIsCopied] = useState(false)
  const [generatedApiKey, setGeneratedApiKey] = useState('')

  const form = useForm({ resolver: zodResolver(createApiKeySchema) })

  const expirationDates = [
    {
      label: '1 Day',
      value: dayjs().add(1, 'day').diff(dayjs(), 's').toString()
    },
    {
      label: '7 Days',
      value: dayjs().add(7, 'day').diff(dayjs(), 's').toString()
    },
    {
      label: '30 Days',
      value: dayjs().add(30, 'day').diff(dayjs(), 's').toString()
    },
    {
      label: '60 Days',
      value: dayjs().add(60, 'day').diff(dayjs(), 's').toString()
    },
    {
      label: '90 Days',
      value: dayjs().add(90, 'day').diff(dayjs(), 's').toString()
    },
    {
      label: '180 Days',
      value: dayjs().add(180, 'day').diff(dayjs(), 's').toString()
    },
    {
      label: '1 Year',
      value: dayjs().add(1, 'year').diff(dayjs(), 's').toString()
    },
    { label: 'No Expiration', value: 'no-expire' }
  ]

  const copyToClipboard = async (value?: string) => {
    try {
      await navigator.clipboard.writeText(value || generatedApiKey)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Form {...form}>
      <form
        className="border rounded-md not-first:mt-6"
        onSubmit={form.handleSubmit(async (body) => {
          toast.loading('Creating API key...')
          const { error, data } = await authClient.apiKey.create({
            name: body.name,
            expiresIn: body.expire_in
          })
          toast.dismiss()

          if (error) {
            toast.error(error.message)
            return
          }

          toast.success('API key created successfully!')
          setGeneratedApiKey(data.key)
          copyToClipboard(data.key)
        })}
      >
        <div className="p-4 space-y-3 i **:data-input-container:max-w-md">
          <h2 className="text-xl font-semibold">Create API Key</h2>
          <p className="text-sm text-muted-foreground">
            Provide a unique name for this key to help you identify it later.
          </p>
          <div className="grid grid-cols-2 gap-3 items-start">
            <DefaultField
              name="name"
              label="Key Name"
              placeholder="my-secret-key"
            />
            <DefaultSelectField
              name="expire_in"
              label="Expiration"
              values={expirationDates}
              placeholder="Select expiration"
            />
          </div>
        </div>
        <div className="grid gap-3 border-t p-4 items-center sm:flex sm:justify-between">
          <div className="text-sm text-muted-foreground p-1 pl-2 bg-secondary border rounded-md sm:max-w-sm w-full flex gap-2 items-center justify-between font-mono">
            <p className="truncate">
              {generatedApiKey
                ? generatedApiKey.slice(0, 12).padEnd(24, '*')
                : 'Your API key will appear here'}
            </p>
            <Button
              className="size-8"
              type="button"
              variant="outline"
              onClick={() => copyToClipboard()}
              aria-label="Copy API key"
            >
              {isCopied ? <Check size={12} /> : <Copy size={12} />}
            </Button>
          </div>
          <Button size="sm" type="submit">
            Generate Key
          </Button>
        </div>
      </form>
    </Form>
  )
}
