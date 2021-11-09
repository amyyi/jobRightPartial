import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { apiGetMySchedule } from '@/apis/job'
import { Box, Images, ScreenBox, StretchLoading, Texts } from '@/components/'
import { DataEmpty } from '@/components/project/DataEmpty'
import { useFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'
import { formatMySchedule } from '@/stores/formatter'
import UtilsJs from '@/utils/common'
import Day from '@/utils/date'

export interface RouteParamCheckSuccess {
  id: string
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.CHECK_IN_SUCCESS>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()
  const [state, api] = useFetch(apiGetMySchedule)
  const data = state.data && formatMySchedule(state.data)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      // eslint-disable-next-line react/display-name
      headerRight: () => <Images.CloseDark size={24} onPress={() => navigation.goBack()} />,
    })
  }, [navigation])

  useEffect(() => {
    api(route.params.id)
  }, [route.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (state.isLoading) {
    return (
      <Box flex={1} bg="light.0">
        <StretchLoading />
      </Box>
    )
  } else if (!data) {
    return <DataEmpty />
  }

  const renderCheckTime = (type: 'in' | 'out'): ReactNode => {
    const isCheckIn = type === 'in'
    const checkTime = isCheckIn ? data.clockedInAt : data.clockedOutAt
    const isAbnormalCheckTime = !checkTime || (isCheckIn ? data.isLate : data.isEarly)
    return (
      <Texts.Subtitle1 color="gray.0">
        {!!checkTime && new Day(checkTime).format('HH:mm')}
        {isAbnormalCheckTime && (
          <Texts.Subtitle1 color="gray.0">{t('check_summary_late')}</Texts.Subtitle1>
        )}
      </Texts.Subtitle1>
    )
  }

  return (
    <ScreenBox scrollable autoPadding={false}>
      <Box mt={4} alignItems="center">
        <Images.HighFive width={116} height={80} />
        <Texts.H4 mt={3} mb={1}>
          {t('check_summary_title', { time: new Day(data.workTime.startTime).format('MM/DD') })}
        </Texts.H4>
        <Texts.Subtitle1 color="dark.1" mb={3}>
          {t('check_summary_title_note')}
        </Texts.Subtitle1>
      </Box>

      <Box mx={4} py={4} borderTopWidth={1} borderColor="gray.3">
        <Box row justifyContent="space-between" mb={4}>
          <Texts.Subtitle1 color="dark.1">{t('check_summary_start_time')}</Texts.Subtitle1>
          {renderCheckTime('in')}
        </Box>
        <Box row justifyContent="space-between" mb={4}>
          <Texts.Subtitle1 color="dark.1">{t('check_summary_end_time')}</Texts.Subtitle1>
          {renderCheckTime('out')}
        </Box>
        <Box mb={4}>
          <Box row justifyContent="space-between">
            <Texts.Subtitle1 color="dark.1">{t('check_summary_total_work_time')}</Texts.Subtitle1>
            <Texts.Subtitle1 color="gray.0">
              {t('common_hour', { hr: data.workHr })}
            </Texts.Subtitle1>
          </Box>
          <Texts.Body3 color="gray.0">{t('check_summary_total_work_note')}</Texts.Body3>
        </Box>
        <Box mb={4}>
          <Box row justifyContent="space-between">
            <Texts.Subtitle1 color="dark.1">{t('check_summary_overtime_time')}</Texts.Subtitle1>
            <Texts.Subtitle1 color="gray.0">
              {t('common_hour', { hr: data.overtimeHr })}
            </Texts.Subtitle1>
          </Box>
          <Texts.Body3 color="gray.0">{t('check_summary_overtime_note')}</Texts.Body3>
        </Box>
        <Box row justifyContent="space-between" mb={4}>
          <Texts.Subtitle1 color="dark.1">{t('check_summary_hour_fee')}</Texts.Subtitle1>
          <Texts.Subtitle1 color="gray.0">
            {t('common_money', { money: UtilsJs.withComma(data.pay.amount) })}
          </Texts.Subtitle1>
        </Box>
        <Box mb={4}>
          <Box row justifyContent="space-between">
            <Texts.Subtitle1 color="dark.1">{t('check_summary_total_fee')}</Texts.Subtitle1>
            <Texts.Subtitle1 color="primary.0">
              {t('common_money', { money: UtilsJs.withComma(data.totalPayAmount) })}
            </Texts.Subtitle1>
          </Box>
          <Texts.Body3 color="gray.0">{t('check_summary_total_note')}</Texts.Body3>
        </Box>
      </Box>

      <Box p={4} bg="primary.3">
        <Texts.Subtitle1 color="dark.1">{t('check_summary_bottom_note_title')}</Texts.Subtitle1>
        <Texts.Body2 color="gray.0">{t('check_summary_bottom_note')}</Texts.Body2>
      </Box>
    </ScreenBox>
  )
}

export default Screen
