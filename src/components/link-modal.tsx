'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { generateQRCode } from '@/helpers/generate-qrcode'
import { useLinkModal } from '@/hooks'
import { CopyInput } from './ui/copy-input'

interface ShortedLinkModalProps {
  originalUrl: string
  shortedUrl: string
}

export function LinkModal({ originalUrl, shortedUrl }: ShortedLinkModalProps) {
  const [state, setState] = useState(true)

  const ref = useRef<HTMLDivElement>(null)

  const canShare = useMemo(
    () => typeof navigator !== 'undefined' && Boolean(navigator.share),
    []
  )

  const generate = useCallback(() => {
    if (ref.current === null) return
    generateQRCode(shortedUrl, ref.current, 12)
  }, [shortedUrl])

  useEffect(() => {
    const t = setTimeout(() => generate(), 0)
    return () => clearTimeout(t)
  }, [generate])

  function getCanvas() {
    const canvas = ref.current?.querySelector('canvas')
    if (!canvas) return null
    return canvas
  }

  function shareQrcode() {
    const canvas = getCanvas()
    if (!canvas || !canShare) return

    canvas.toBlob((blob) => {
      if (!blob) return
      const f = new File([blob], 'qrcode.png', { type: 'image/png' })
      navigator.share({
        files: [f],
        title: 'My link',
        text: 'Hello World'
      })
    })
  }

  function downloadQrcode() {
    const canvas = getCanvas()
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'qrcode.png'
      a.click()
    })
  }

  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent className="md:min-w-[800px] md:min-h-[400px] max-w-screen">
        <DialogHeader>
          <DialogTitle>Your shortened link</DialogTitle>
          <DialogDescription>
            Copy and share your link. Generate, share, or download the QR code.
          </DialogDescription>
        </DialogHeader>
        <main className="grid md:grid-cols-2 gap-3">
          <section className="mx-auto">
            <div ref={ref} />
            <div className="mt-3 grid gap-3">
              {canShare && (
                <Button size="sm" onClick={shareQrcode}>
                  Share
                </Button>
              )}
              <Button size="sm" onClick={downloadQrcode}>
                Download
              </Button>
            </div>
          </section>
          <section className="space-y-4 text-sm">
            <div>
              <h2 className="font-medium mb-2">Original URL</h2>
              <CopyInput text={originalUrl} />
            </div>
            <h2 className="font-medium mb-2">Shorted URL</h2>
            <CopyInput text={shortedUrl} />
          </section>
        </main>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function LinkModalRoot() {
  const { state } = useLinkModal()

  return state.map((link) => (
    <LinkModal
      originalUrl={link.originalUrl}
      shortedUrl={link.shortedUrl}
      key={link.id}
    />
  ))
}
