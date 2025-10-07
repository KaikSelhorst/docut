import { qrcodegen } from '@/lib/qrcode'

// The main application program.
export function generateQRCode(
  data: string,
  outputElem: HTMLDivElement,
  scale: number
) {
  while (outputElem.firstChild !== null)
    outputElem.removeChild(outputElem.firstChild)
  // Creates a single QR Code, then appends it to the document.
  const text: string = data // User-supplied Unicode text
  const errCorLvl: qrcodegen.QrCode.Ecc = qrcodegen.QrCode.Ecc.LOW // Error correction level
  const qr: qrcodegen.QrCode = qrcodegen.QrCode.encodeText(text, errCorLvl) // Make the QR Code symbol
  const canvas = appendCanvas('', outputElem)
  drawCanvas(qr, scale, 2, '#FFFFFF', '#000000', canvas)
  const canvasDownload = document.createElement('canvas')
  drawCanvas(qr, 40, 2, '#FFFFFF', '#000000', canvasDownload)
  return canvasDownload
}

function appendCanvas(
  caption: string,
  outputElem: HTMLDivElement
): HTMLCanvasElement {
  const p = outputElem.appendChild(document.createElement('p'))
  p.textContent = caption
  const result = document.createElement('canvas')
  outputElem.appendChild(result)
  return result
}

// Draws the given QR Code, with the given module scale and border modules, onto the given HTML
// canvas element. The canvas's width and height is resized to (qr.size + border * 2) * scale.
// The drawn image is purely dark and light, and fully opaque.
// The scale must be a positive integer and the border must be a non-negative integer.
function drawCanvas(
  qr: qrcodegen.QrCode,
  scale: number,
  border: number,
  lightColor: string,
  darkColor: string,
  canvas: HTMLCanvasElement
) {
  if (scale <= 0 || border < 0) throw new RangeError('Value out of range')
  const width: number = (qr.size + border * 2) * scale
  canvas.width = width
  canvas.height = width
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  for (let y = -border; y < qr.size + border; y++) {
    for (let x = -border; x < qr.size + border; x++) {
      ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor
      ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale)
    }
  }
}
