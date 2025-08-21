import { UAParser } from 'ua-parser-js'
import type { Detecter } from './protocols'

export class UAParserAdapter implements Detecter {
  async detect(userAgent: string) {
    const parser = new UAParser(userAgent)

    const result = parser.getResult()

    return {
      browser: { name: result.browser.name?.toLowerCase() || null },
      os: { name: result.os.name?.toLowerCase() || null }
    }
  }
}
