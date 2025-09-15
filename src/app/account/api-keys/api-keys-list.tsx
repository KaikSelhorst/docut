'use client'
import { useListApiKeys } from 'client/hooks/use-api-keys'
import dayjs from 'dayjs'
import { useState } from 'react'
import { authClient } from 'shared/lib/auth/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export function ApiKeysList() {
  const { data, error, loading, refresh } = useListApiKeys()
  const [deletingKey, setDeletingKey] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  if (loading) return <ListSkeleton />

  if (error) return error.message

  return (
    <div className="not-first:mt-6 border rounded-md overflow-clip">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Key</TableHead>
            <TableHead className="w-[150px]">Expires At</TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data.length && (
            <TableRow>
              <TableCell colSpan={4} className="text-muted-foreground">
                No API key found!
              </TableCell>
            </TableRow>
          )}
          {data.map((key) => (
            <TableRow key={key.id}>
              <TableCell className="font-medium">{key.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {key.start?.padEnd(20, '•')}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {key.expiresAt ? dayjs(key.expiresAt).fromNow() : 'Permanent'}
              </TableCell>

              <TableCell className="text-right">
                <Dialog
                  open={modalOpen}
                  onOpenChange={(b) => setModalOpen(b && !deletingKey)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="hover:text-destructive text-destructive"
                      variant="ghost"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete API Token</DialogTitle>
                      <DialogDescription>
                        The following token will be permanently deleted, are you
                        sure you want to continue?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Back</Button>
                      </DialogClose>
                      <Button
                        disabled={deletingKey}
                        variant="destructive"
                        onClick={async () => {
                          toast.loading('Deleting key...')
                          setDeletingKey(true)

                          const { error } = await authClient.apiKey.delete({
                            keyId: key.id
                          })

                          toast.dismiss()
                          setDeletingKey(false)
                          setModalOpen(false)
                          if (error) {
                            toast.error(error.message)
                            return
                          }
                          refresh()
                          toast.success('API Key deleted successfully!')
                        }}
                      >
                        Delete Key
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ListSkeleton() {
  const data = new Array(8).fill(null)
  return (
    <div className="not-first:mt-6 border rounded-md">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Key</TableHead>
            <TableHead className="w-[150px]">Expires At</TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((_, i) => (
            <TableRow key={String(i)}>
              <TableCell>
                <Skeleton className="w-40 h-5" />
              </TableCell>
              <TableCell className="text-muted-foreground">
                <Skeleton className="w-42 h-5" />
              </TableCell>
              <TableCell className="text-muted-foreground">
                <Skeleton className="w-20 h-5" />
              </TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="w-14 h-5 my-2 mr-2" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
