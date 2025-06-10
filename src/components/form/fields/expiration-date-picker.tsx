import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { dateUtils } from '@/lib/date'
import { CalendarIcon, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar/calendar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface DefaultFieldProps {
  name: string
  defaultValue: string
  description: string
  label: string
}

export function ExpirationDatePicker({
  defaultValue = '',
  description = '',
  label = '',
  name = ''
}: Partial<DefaultFieldProps>) {
  const form = useFormContext()
  return (
    <FormField
      defaultValue={defaultValue}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'pl-3 text-left font-normal grow',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      dateUtils.format(field.value)
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          'duration-150 transition-all',
                          !field.value && 'w-0 px-0! overflow-hidden opacity-0'
                        )}
                        onClick={field.onChange}
                      >
                        <X size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear</TooltipContent>
                  </Tooltip>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  minDate={new Date()}
                  onChange={(date) => field.onChange(date.toDate())}
                  date={field.value}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
