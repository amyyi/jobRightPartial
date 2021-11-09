import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { apiCheckMySchedule, apiGetMySchedule } from '@/apis/job'
import {
  Box,
  Button,
  CompanyAddress,
  CompanyContact,
  ScreenBox,
  StretchLoading,
  Texts,
} from '@/components/'
import { DataEmpty } from '@/components/project/DataEmpty'
import { useFetch, useInterval } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'
import { formatMySchedule } from '@/stores/formatter'
import Day, { MS_UNITS } from '@/utils/date'

export enum CHECK_PAGE_TYPE {
  CHECK_IN,
  CHECK_OUT,
}
export interface RouteParamCheckDetail {
  id: string
  type: CHECK_PAGE_TYPE
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.CHECK_IN_DETAIL>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()
  const [nowTime, setNowTime] = useState(new Date().getTime())
  const [lock, setLock] = useState(false)
  const [state, api] = useFetch(apiGetMySchedule)
  const [stateCheck, apiCheck] = useFetch(apiCheckMySchedule)
  const isCheckIn = route.params.type === CHECK_PAGE_TYPE.CHECK_IN
  const data = state.data && formatMySchedule(state.data)

  useEffect(() => {
    api(route.params.id)
  }, [route.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useInterval(() => setNowTime(new Date().getTime()), MS_UNITS.SEC)

  useEffect(() => {
    if (!stateCheck.isComplete) {
      return
    }

    if (isCheckIn) {
      navigation.goBack()
    } else {
      navigation.navigate(SCREENS.CHECK_IN_SUCCESS, { id: data?.id || '' })
      setTimeout(() => navigation.goBack(), 500) // !workaround
    }
  }, [stateCheck.isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  if (state.isLoading) {
    return (
      <Box flex={1} bg="light.0">
        <StretchLoading />
      </Box>
    )
  } else if (!data) {
    return <DataEmpty />
  }

  return (
    <ScreenBox scrollable autoPadding={false}>
      <Box flex={1} p={4} bg="light.0">
        <Texts.H5 mb={4}>{data.title}</Texts.H5>
        <Box borderWidth={1} borderColor="gray.2" borderRadius={4} p={3} mb={4}>
          <Box row mb={1}>
            <Box flex={1}>
              <Texts.Label color="gray.0">
                {isCheckIn ? t('check_in_start_text') : t('check_out_start_text')}
              </Texts.Label>
              <Texts.H3 color={isCheckIn ? 'primary.0' : 'gray.1'}>
                {new Day(isCheckIn ? nowTime : data.clockedInAt).format('HH:mm')}
              </Texts.H3>
            </Box>
            {!isCheckIn && (
              <Box flex={1}>
                <Texts.Label color="gray.0">{t('check_out_time_text')}</Texts.Label>
                <Texts.H3 color="primary.0">{new Day(nowTime).format('HH:mm')}</Texts.H3>
              </Box>
            )}
          </Box>
          <Texts.Body3 color="gray.0">
            {isCheckIn
              ? t('check_in_dt_regular_text', {
                  time: new Day(data.workTime.startTime).format('HH:mm'),
                })
              : t('check_out_summary', {
                  start: new Day(data.workTime.startTime).format('HH:mm'),
                  end: new Day(data.workTime.endTime).format('HH:mm'),
                  hour: data.workHr,
                })}
          </Texts.Body3>
        </Box>
        <Box borderWidth={1} borderColor="gray.2" borderRadius={4} p={3} mb={4}>
          <Texts.H6>{new Day(data.workTime.startTime).format('MM/DD (w)')}</Texts.H6>

          <Texts.Label mt={2} color="gray.0">
            {t(`job_shift_${data.shiftType}`)}
          </Texts.Label>
          <Texts.Subtitle1 color="dark.1">
            {t('job_info_work_time', {
              start: new Day(data.workTime.startTime).format('HH:mm'),
              end: new Day(data.workTime.endTime).format('HH:mm'),
              hour: data.breakHr,
            })}
          </Texts.Subtitle1>

          <Texts.Label mt={2} color="gray.0">
            {data.companyName}
          </Texts.Label>
          <CompanyAddress data={data} enableAction />

          <Texts.Label mt={2} color="gray.0">
            {t('check_contact')}
          </Texts.Label>
          <CompanyContact data={data} enableAction />
        </Box>
      </Box>
      <Box alignItems="center" py={2} px={4} borderTopWidth={1} borderColor="gray.3">
        <Texts.Caption1 textAlign="center">
          {isCheckIn ? t('check_in_dt_text') : t('check_out_note')}
        </Texts.Caption1>
        <Button
          mt={2}
          title={isCheckIn ? t('check_in_btn') : t('check_out_btn')}
          loading={lock}
          onPress={() => {
            setLock(true)
            apiCheck(data.id)
          }}
        />
      </Box>
    </ScreenBox>
  )
}

export default Screen
