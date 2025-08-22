import { UAParser } from 'ua-parser-js'
import { getDevice } from '../helpers'
import type { Detecter } from './protocols'

export class UAParserAdapter implements Detecter {
  async detect(userAgent: string) {
    const parser = new UAParser(userAgent)

    const result = parser.getResult()

    const device = getDevice(result.os.name || null)

    return {
      browser: { name: result.browser.name?.toLowerCase() || null },
      os: { name: result.os.name?.toLowerCase() || null },
      device: { type: device }
    }
  }
}
