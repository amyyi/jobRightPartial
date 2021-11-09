import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PAY_STATUS, RespUserSalaryHistoryData } from '@/apis/salary/interfaces'
import { Box, Images, Texts } from '@/components/'
import UtilsJs from '@/utils/common'

const PER_MINUTE = 60

interface SalaryHistoryProps {
  data: RespUserSalaryHistoryData
  onPress: (id: string) => void
}

export const MySalaryHistoryItem: FC<SalaryHistoryProps> = ({ data, onPress }) => {
  const { t } = useTranslation()

  return (
    <Box mt={4} pt={4} borderTopWidth={1} borderColor="gray.2">
      <Box mb={1} row alignItems="center">
        <Texts.Subtitle1>{data.yyyymm}</Texts.Subtitle1>
        <Box
          bg={data.status === PAY_STATUS.WAITING ? 'gray.3' : 'primary.3'}
          borderRadius={5}
          ml={2}
          px={2}
          py={1}
        >
          <Texts.Label color={data.status === PAY_STATUS.WAITING ? 'gray.0' : 'primary.0'}>
            {data.status === PAY_STATUS.WAITING ? t('my_salary_waiting') : t('my_salary_paid')}
          </Texts.Label>
        </Box>
      </Box>
      {data.list.map((subItem, subIdx) => {
        return (
          <Box key={subIdx} row alignItems="center" py={2} onPress={() => onPress(subItem.id)}>
            <Box width="50%" pr={4}>
              <Texts.Subtitle2 color="dark.1" numberOfLines={1}>
                {subItem.companyName}
              </Texts.Subtitle2>
              <Texts.Subtitle1 color="gray.0">
                {t('common_money', { money: UtilsJs.withComma(subItem.amountSalary) })}
              </Texts.Subtitle1>
            </Box>
            <Box width="50%" row justifyContent="space-between" yalign="center">
              <Box>
                <Texts.Subtitle2 color="dark.1">{t('my_salary_history_hour')}</Texts.Subtitle2>
                {(() => {
                  const hour = Math.floor((subItem.workMinutes || 0) / PER_MINUTE)
                  const minute = Math.floor(
                    ((subItem.workMinutes || 0) - PER_MINUTE * hour) / PER_MINUTE,
                  )
                  return (
                    <Box row>
                      <Texts.Subtitle1 color="gray.0">
                        {t('common_hour', { hr: hour })}
                      </Texts.Subtitle1>
                      {!!minute && (
                        <Texts.Subtitle1 color="gray.0" ml={1}>
                          {t('common_min', { min: minute })}
                        </Texts.Subtitle1>
                      )}
                    </Box>
                  )
                })()}
              </Box>
              <Images.ArrowRight size={20} />
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
