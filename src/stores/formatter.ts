import { RespMySchedule } from '@/apis/job'
import { MS_UNITS } from '@/utils/date'

export interface UiMySchedule extends RespMySchedule {
  totalPayAmount: number
  workHr: number
  breakHr: number
  overtimeHr: number
  enableCheckStartTime: number
  enableCheckEndTime: number
  lateClockedInAt: number
  earlyClockedOutAt: number
  isLate: boolean
  isEarly: boolean
  isEnableCheckNow: boolean
  isLateNow: boolean
  isEarlyNow: boolean
  isShowInShortcut: boolean
}

const PER_HOUR = 60
const min2hr = (min: number): number => {
  return parseFloat((min / PER_HOUR).toFixed(2))
}

export const formatMySchedule = (data: RespMySchedule): UiMySchedule => {
  const {
    pay: { amount },
    workTime: { startTime: workStartTime, endTime: workEndTime, breakMinutes },
    clockedInAt = 0,
    clockedOutAt = 0,
    workMinutes,
    overtimeMinutes,
    totalPayAmount,
  } = data
  const now = new Date().getTime()
  const enableCheckStartTime = workStartTime - MS_UNITS.HOUR
  const enableCheckEndTime = workEndTime + MS_UNITS.HOUR
  const lateClockedInAt = workStartTime + MS_UNITS.MIN
  const earlyClockedOutAt = workEndTime - 1
  let workHr = 0
  if (workMinutes) {
    workHr = min2hr(workMinutes)
  } else {
    workHr = min2hr((workEndTime - workStartTime) / breakMinutes)
  }

  return {
    ...data,

    workHr,
    breakHr: min2hr(breakMinutes),
    overtimeHr: min2hr(overtimeMinutes || 0),
    totalPayAmount: totalPayAmount || workHr * amount,

    enableCheckStartTime,
    enableCheckEndTime,
    lateClockedInAt,
    earlyClockedOutAt,
    isLate: !!clockedInAt && clockedInAt >= lateClockedInAt,
    isEarly: !!clockedOutAt && clockedOutAt <= earlyClockedOutAt,
    isEnableCheckNow: enableCheckStartTime <= now && now <= enableCheckEndTime,
    isLateNow: !clockedInAt && now >= lateClockedInAt,
    isEarlyNow: now <= earlyClockedOutAt,
    isShowInShortcut: workStartTime - MS_UNITS.DAY <= now && now <= enableCheckEndTime,
  }
}

export const formatMyScheduleList = (list: RespMySchedule[]): UiMySchedule[] => {
  return list.map(formatMySchedule)
}
