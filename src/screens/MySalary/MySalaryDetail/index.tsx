import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'

import { apiGetUserSalaryDetail } from '@/apis/salary'
import { Box, Button, Images, ScreenBox, StretchLoading, Texts } from '@/components/'
import { DataEmpty } from '@/components/project/DataEmpty'
import { useFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'
import UtilsJs from '@/utils/common'
import Day from '@/utils/date'

import { OvertimesModal } from '../OvertimesModal'
import TableRow from '../TableRow'

export interface RouteParamSalaryDetail {
  id: string
}

const SlipBox = styled(Box).attrs({
  p: 3,
  bg: 'light.0',
  borderRadius: 4,
})``

export const Divider = styled(Box).attrs({
  mt: 3,
  flex: 1,
  bg: 'gray.2',
  height: 0.5,
})``

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.MY_SALARY_DETAIL>> = ({
  route,
  navigation,
}) => {
  const [state, api] = useFetch(apiGetUserSalaryDetail)
  const { t } = useTranslation()
  const { colors } = useTheme()
  const salaryDetail = state.data

  const [overtimesModalVisible, setOvertimesModalVisible] = useState(false)

  useEffect(() => {
    api(route.params.id)
  }, [route.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!salaryDetail) {
    return state.isLoading ? (
      <Box flex={1} bg="light.0">
        <StretchLoading />
      </Box>
    ) : (
      <DataEmpty />
    )
  }

  return (
    <ScreenBox scrollable bg={colors.light[1]}>
      <Box>
        <Box row justifyContent="space-between">
          <Box>
            <Texts.H3>{salaryDetail.yyyymm}</Texts.H3>
            <Texts.Subtitle1 color="dark.1" mt={1}>
              {salaryDetail.companyName}
            </Texts.Subtitle1>
          </Box>
          <Button
            type="outline"
            title={t('my_salary_detail_current_calendar')}
            bg="transparent"
            px={2}
            height="40"
            onPress={() => {
              const month = parseInt(salaryDetail.yyyymm.slice(-2), 10)
              navigation.navigate(SCREENS.MY_SALARY_CALENDAR, {
                initCurDay: new Day().setMonth(month - 1).valueOf(),
              })
            }}
          />
        </Box>

        <SlipBox mt={4}>
          <Texts.H6>{t('my_salary_detail_income')}</Texts.H6>
          <Divider />
          <TableRow>
            <Texts.Label color="gray.0">{t('my_salary_detail_per_item')}</Texts.Label>
            <Texts.Label color="gray.0">{t('common_amount')}</Texts.Label>
          </TableRow>
          {salaryDetail.salaryItems?.map((income) => {
            if (income.name === t('my_salary_detail_overtimes_fee')) {
              return (
                <React.Fragment key={income.name}>
                  <TableRow>
                    <Texts.Subtitle1 color="dark.1">{income.name}</Texts.Subtitle1>
                    <Texts.Subtitle1 color="gray.0">
                      {UtilsJs.withComma(income.amount)}
                    </Texts.Subtitle1>
                  </TableRow>
                  <Box mt={4} row yalign="center" onPress={() => setOvertimesModalVisible(true)}>
                    <Texts.Button2 color="gray.0">
                      {t('my_salary_detail_check_overtime')}
                    </Texts.Button2>
                    <Images.ArrowDown ml={1} size={16} />
                  </Box>
                </React.Fragment>
              )
            }
            return (
              <TableRow key={income.name}>
                <Texts.Subtitle1 color="dark.1">{income.name}</Texts.Subtitle1>
                <Texts.Subtitle1 color="gray.0">{UtilsJs.withComma(income.amount)}</Texts.Subtitle1>
              </TableRow>
            )
          })}
          <TableRow mt={6}>
            <Texts.Subtitle1 color="dark.1">
              {t('my_salary_detail_income_subtitle')}
            </Texts.Subtitle1>
            <Texts.H6>{UtilsJs.withComma(salaryDetail.totalSalaryAmount)}</Texts.H6>
          </TableRow>
        </SlipBox>

        <SlipBox mt={2}>
          <Texts.H6>{t('my_salary_detail_outcome')}</Texts.H6>
          <Divider />
          <TableRow>
            <Texts.Label color="gray.0">{t('my_salary_detail_outcome_item')}</Texts.Label>
            <Texts.Label color="gray.0">{t('common_amount')}</Texts.Label>
          </TableRow>
          {salaryDetail.deductionItems?.map((deductionItem) => (
            <TableRow key={deductionItem.name}>
              <Texts.Subtitle1 color="dark.1">{deductionItem.name}</Texts.Subtitle1>
              <Texts.Subtitle1 color="gray.0">
                {UtilsJs.withComma(deductionItem.amount)}
              </Texts.Subtitle1>
            </TableRow>
          ))}
          <Divider />
          <TableRow>
            <Box flex={40}>
              <Texts.Label color="gray.0">{t('my_salary_detail_pay_off_item')}</Texts.Label>
            </Box>
            <Box flex={40}>
              <Texts.Label color="gray.0">{t('common_time')}</Texts.Label>
            </Box>
            <Box flex={20}>
              <Texts.Label color="gray.0" textAlign="right">
                {t('common_amount')}
              </Texts.Label>
            </Box>
          </TableRow>
          {salaryDetail.absencesItems?.map((absencesItem) => (
            <TableRow key={absencesItem.name}>
              <Box flex={40}>
                <Texts.Subtitle1 color="dark.1">{absencesItem.name}</Texts.Subtitle1>
              </Box>
              <Box flex={40}>
                <Texts.Subtitle1 color="gray.0">
                  {t('common_hour', { hr: Day.duration(absencesItem.sec * 1000).asHours })}
                </Texts.Subtitle1>
              </Box>
              <Box flex={20}>
                <Texts.Subtitle1 color="gray.0" textAlign="right">
                  {UtilsJs.withComma(absencesItem.amount)}
                </Texts.Subtitle1>
              </Box>
            </TableRow>
          ))}
          <TableRow mt={6}>
            <Texts.Subtitle1 color="dark.1">
              {t('my_salary_detail_outcome_subtitle')}
            </Texts.Subtitle1>
            <Texts.H6>{UtilsJs.withComma(salaryDetail.totalDeductionAmount)}</Texts.H6>
          </TableRow>
        </SlipBox>

        <Box mt={4}>
          <Texts.Subtitle1 color="dark.1">{t('my_salary_detail_notice')}</Texts.Subtitle1>
          <Texts.Body2 color="gray.0" mt={2}>
            {t('my_salary_detail_notice_description')}
          </Texts.Body2>
        </Box>

        <Box mt={4} mb={1}>
          <Texts.Subtitle2 color="dark.1">{t('my_salary_detail_summary_title')}</Texts.Subtitle2>
          <TableRow mt={1}>
            <Texts.H3>{t('my_salary_detail_total_amount')}</Texts.H3>
            <Texts.H3 color="primary.0">
              {t('common_money', { money: UtilsJs.withComma(salaryDetail.totalPayAmount) })}
            </Texts.H3>
          </TableRow>
        </Box>

        <Divider />

        <Texts.Body3 color="gray.0" textAlign="center" mt={4}>
          {t('my_salary_detail_salary_period')}
        </Texts.Body3>
        <Texts.Body3 color="gray.0" textAlign="center">
          {t('my_salary_detail_work_time_period')}
        </Texts.Body3>
      </Box>

      <OvertimesModal
        visible={overtimesModalVisible}
        onCancel={() => setOvertimesModalVisible(false)}
        list={salaryDetail.overtimeItems}
      />
    </ScreenBox>
  )
}

export default Screen
