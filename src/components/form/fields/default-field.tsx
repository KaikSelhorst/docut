import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface DefaultFieldProps {
  type: React.ComponentProps<'input'>['type']
  name: string
  defaultValue: string
  description: string
  placeholder: string
  label: string
}

export function DefaultField({
  type = 'text',
  defaultValue = '',
  description = '',
  label = '',
  name = '',
  placeholder = ''
}: Partial<DefaultFieldProps>) {
  const form = useFormContext()
  return (
    <FormField
      defaultValue={defaultValue}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
