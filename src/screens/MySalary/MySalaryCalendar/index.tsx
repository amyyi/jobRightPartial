import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { RootStackParamList, SCREENS } from '@/navigator/'
import Calendar from '@/screens/MySchedule/Calendar'
import Day from '@/utils/date'

export interface RouteParamSalaryCalendar {
  initCurDay: number
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.MY_SALARY_CALENDAR>> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation()
  const { initCurDay } = route.params

  useEffect(() => {
    const year_zh = t('common_year')
    const month_zh = t('common_month')
    navigation.setOptions({
      title: new Day(initCurDay).format(`YYYY ${year_zh} MM ${month_zh}`),
    })
  }, [initCurDay, navigation, t])

  return <Calendar withControlBar={false} initCurDay={initCurDay} />
}

export default Screen
