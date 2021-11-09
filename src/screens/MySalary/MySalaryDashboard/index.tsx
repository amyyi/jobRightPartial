import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components/native'

import { apiGetUserSalaryOverview } from '@/apis/salary/api'
import { RespUserSalaryOverview } from '@/apis/salary/interfaces'
import { Box, Images, Loading, ScreenBox, Texts } from '@/components/'
import { DataEmpty } from '@/components/project/DataEmpty'
import { useFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'
import UtilsJs from '@/utils/common'
import Day from '@/utils/date'

import { MySalaryHistoryItem } from '../MySalaryHistoryItem'

const PER_MINUTE = 60

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.MY_SALARY>> = ({ navigation }) => {
  const [state, api] = useFetch(apiGetUserSalaryOverview)
  const { t } = useTranslation()
  const { colors } = useTheme()
  const data = state.data
  const isEmptyHistory = state.isComplete && !data?.history.data.length
  const now = new Day()

  useFocusEffect(
    useCallback(() => {
      api()
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  )

  const renderTotal = (type: keyof RespUserSalaryOverview): ReactNode => {
    const isPresent = type === 'present'

    if (!data) {
      if (state.isLoading) {
        return <Loading />
      } else if (state.isComplete) {
        return <DataEmpty />
      }
      return null
    }

    return (
      <Box row>
        <Box width="50%" pr={4}>
          <Texts.Subtitle2>
            {isPresent ? t('my_salary_month_fee') : t('my_salary_total_fee')}
          </Texts.Subtitle2>
          <Box row yalign="flex-end">
            <Texts.Label mb={1} color="gray.0">
              {t('common_dollar_sign')}
            </Texts.Label>
            <Texts.H4 color="primary.0">
              {UtilsJs.withComma(data[type].totalAmountSalary || 0)}
            </Texts.H4>
          </Box>
        </Box>
        <Box width="50%">
          <Texts.Subtitle2>
            {isPresent ? t('my_salary_month_hours') : t('my_salary_total_hours')}
          </Texts.Subtitle2>
          {(() => {
            const totalWorkMinutes = data[type]?.totalWorkMinutes
            const hour = Math.floor((totalWorkMinutes || 0) / PER_MINUTE)
            const minute = Math.floor(((totalWorkMinutes || 0) - PER_MINUTE * hour) / PER_MINUTE)
            return (
              <Box row yalign="flex-end">
                <Texts.H4 color="primary.0" mr={1}>
                  {UtilsJs.withComma(hour)}
                </Texts.H4>
                <Texts.Label color="gray.0" mr={1} mb={1}>
                  {t('my_salary_hour')}
                </Texts.Label>
                <Texts.H4 color="primary.0" mr={1}>
                  {minute}
                </Texts.H4>
                <Texts.Label color="gray.0" mr={1} mb={1}>
                  {t('my_salary_minute')}
                </Texts.Label>
              </Box>
            )
          })()}
        </Box>
      </Box>
    )
  }

  return (
    <ScreenBox autoPadding={false} insetBottom={false} scrollable bg={colors.light[1]}>
      <Box mb={2} p={4} pb={0} bg="light.0">
        <Box row alignItems="center">
          <Images.SalarySubtitleMonth size={40} />
          <Texts.H6 ml="2">{t('my_salary_in_month')}</Texts.H6>
        </Box>
        <Texts.Subtitle1 my="4">
          {now.format('YYYY')}
          {t('my_salary_year')}
          {now.format('MM')}
          {t('my_salary_month')}
        </Texts.Subtitle1>

        {renderTotal('present')}

        <Box row my={4}>
          <Images.InfoGray0 width={16} />
          <Texts.Caption2 color="gray.0" ml={1}>
            {t('my_salary_info')}
          </Texts.Caption2>
        </Box>
        <Box
          row
          justifyContent="space-between"
          alignItems="center"
          py={7}
          borderTopWidth={1}
          borderColor="gray.2"
          onPress={() =>
            navigation.navigate(SCREENS.MY_SALARY_CALENDAR, {
              initCurDay: now.valueOf(),
            })
          }
        >
          <Texts.Subtitle1 color="dark.1">{t('my_salary_month_check')}</Texts.Subtitle1>
          <Images.ArrowRight size={20} />
        </Box>
      </Box>
      <Box p={4} bg="light.0">
        <Box row alignItems="center" mb={4}>
          <Images.SalarySubtitleHistory size={40} />
          <Texts.H6 ml="2">{t('my_salary_history')}</Texts.H6>
        </Box>
        {renderTotal('history')}
        {data?.history.data.map((item, idx) => (
          <MySalaryHistoryItem
            key={idx}
            data={item}
            onPress={(id) => {
              navigation.navigate(SCREENS.MY_SALARY_DETAIL, { id })
            }}
          />
        ))}
        {isEmptyHistory && (
          <Box mt={4} pt={4} borderTopWidth={1} borderColor="gray.2">
            <Texts.Caption1 color="gray.0">{t('my_salary_empty_history')}</Texts.Caption1>
          </Box>
        )}
      </Box>
    </ScreenBox>
  )
}

export default Screen
