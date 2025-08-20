import { UAParserAdapter } from './adapters/unparser-adapter'

export function makeUserDevice() {
  return new UAParserAdapter()
}
