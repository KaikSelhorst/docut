import * as fs from 'node:fs'
import type * as http from 'node:http' // Import http for IncomingMessage
import * as https from 'node:https'
import * as path from 'node:path'
import * as tar from 'tar'
import * as zlib from 'zlib'

const DB_FILE = 'GeoLite2-City'
const url = `https://raw.githubusercontent.com/GitSquared/node-geolite2-redist/master/redist/${DB_FILE}.tar.gz`
const destDir = path.resolve(process.cwd(), 'tmp')

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

async function downloadAndExtract(url: string, destDir: string): Promise<void> {
  console.log(`Starting download from ${url}`)

  ensureDir(destDir)

  const response = await new Promise<http.IncomingMessage>(
    (resolve, reject) => {
      https
        .get(url, (res) => {
          if (res.statusCode !== 200) {
            reject(
              new Error(
                `Request failed: ${res.statusCode} ${res.statusMessage}`
              )
            )
            return
          }
          resolve(res)
        })
        .on('error', reject)
    }
  )

  const gunzip = zlib.createGunzip()
  const tarExtract = tar.t()

  return new Promise((resolve, reject) => {
    response.pipe(gunzip).pipe(tarExtract)

    tarExtract.on('entry', (entry: tar.ReadEntry) => {
      if (entry.path.endsWith('.mmdb')) {
        const filename = path.join(destDir, path.basename(entry.path))
        const writeStream = fs.createWriteStream(filename)

        entry.pipe(writeStream)

        writeStream.on('finish', () => {
          console.log(`Database saved: ${filename}`)
        })

        writeStream.on('error', (err: Error) => {
          reject(new Error(`Error saving ${filename}: ${err.message}`))
        })
      } else {
        entry.resume()
      }
    })

    tarExtract.on('error', reject)
    tarExtract.on('finish', resolve)

    response.on('error', reject)
    gunzip.on('error', reject)
  })
}

async function main() {
  if (process.env.VERCEL) {
    console.log('Vercel environment detected. Skipping geo setup.')
    return
  }
  if (process.env.VERCEL) {
    console.log('Vercel environment detected. Skipping geo setup.')
    return
  }

  try {
    await downloadAndExtract(url, destDir)
    console.log('Download and extraction completed successfully.')
  } catch (error) {
    console.error(
      'Error during the process:',
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  }
}

main()
