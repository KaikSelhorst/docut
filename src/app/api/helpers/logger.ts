import { createLogger } from 'shared/logger'

class Logger {
  private logger: ReturnType<typeof createLogger>

  constructor(indicator?: string) {
    this.logger = createLogger({ indicator })
  }
  error(data: string) {
    this.logger.error(data)
  }
  info(data: string) {
    this.logger.info(data)
  }
  debug(data: string) {
    this.logger.warn(data)
  }
  success(data: string) {
    this.logger.success(data)
  }
}

export { Logger }
