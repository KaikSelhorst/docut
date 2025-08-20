import { MaxmindAdapter } from './adapters/maxmind-adapter'

export function makeGeolocalization() {
  return new MaxmindAdapter()
}
