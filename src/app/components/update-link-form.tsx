import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface UpdateLinkFormProps {
  expiration: null | string
  url: string
  seo: {
    title: string | null
    description: string | null
  }
}

export function UpdateLinkForm({ expiration, seo, url }: UpdateLinkFormProps) {
  return (
    <>
      <fieldset className="space-y-3">
        <legend>General info</legend>
        <Input placeholder="URL" name="url" defaultValue={url} />
        <Input
          placeholder="expiration"
          name="expiration"
          type="date"
          defaultValue={expiration ? expiration.split('T')[0] : ''}
        />
      </fieldset>
      <fieldset className="space-y-3">
        <legend>SEO</legend>
        <Input
          placeholder="Title"
          name="seo.title"
          defaultValue={seo.title ?? ''}
        />
        <Textarea
          name="seo.description"
          placeholder="Description"
          defaultValue={seo.description ?? ''}
          rows={8}
          className="resize-none"
        />
      </fieldset>
      <Button className="cursor-pointer">Save changes</Button>
    </>
  )
}
