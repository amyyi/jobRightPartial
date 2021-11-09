import appConfig from '@/app-config'

const TIMER = appConfig.pwTimer

class PWTrigger {
  hasVerified: boolean
  private timerId: NodeJS.Timeout | null
  constructor() {
    this.hasVerified = false
    this.timerId = null
  }

  setCounter(): void {
    this.hasVerified = true
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
    this.timerId = setTimeout(() => {
      this.hasVerified = false
    }, TIMER)
  }

  getVerifyStatus(): boolean {
    return this.hasVerified
  }

  reset(): void {
    this.hasVerified = false
    this.timerId = null
  }
}

export default new PWTrigger()
