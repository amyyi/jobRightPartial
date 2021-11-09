import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import { Box, Button, ScreenBox, Texts } from '@/components/'
import { DataEmpty } from '@/components/project/DataEmpty'
import { RootStackParamList, SCREENS } from '@/navigator/'
import { useUserStore } from '@/stores/user'
import { KYC_STATUS } from '@/stores/user/reducers'

interface AccountTransfer {
  name: string
  bank: string
  branch: string
  account: string
  cover: string
}

export interface DataFields extends FieldsType {
  data: string
}

interface FieldsType {
  labelI18nKey: string
  field: keyof AccountTransfer
}

const Fields: FieldsType[] = [
  {
    labelI18nKey: 'name',
    field: 'name',
  },
  {
    labelI18nKey: 'bank',
    field: 'bank',
  },
  {
    labelI18nKey: 'branch',
    field: 'branch',
  },
  {
    labelI18nKey: 'account',
    field: 'account',
  },
]

const Transfer: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, SCREENS.ACCOUNT>>()
  const {
    state: { profile, kycStatus, images },
  } = useUserStore()
  const bankFormObj = profile?.bank

  if (!bankFormObj) {
    return <DataEmpty />
  }

  const transferData: DataFields[] = Fields.map((item) => ({
    ...item,
    data: bankFormObj?.[item.field],
  }))

  const handlePressChange = (): void => {
    Alert.alert(
      t('account_transfer_change_alert_title'),
      t('account_transfer_change_alert_message'),
      [
        { text: t('common_wait'), style: 'cancel' },
        {
          text: t('common_ok'),
          onPress: () => {
            navigation.navigate(SCREENS.TRANSFER_FORM, {
              bankFormObj: {
                ...bankFormObj,
                cover: images.bankCover,
              },
            })
          },
        },
      ],
    )
  }

  return (
    <Box flex={1}>
      <ScreenBox scrollable autoPadding={false} insetBottom={false}>
        <Texts.Subtitle2 color="gray.0" px="4" pt="4" pb="2" bg="light.1">
          {kycStatus === KYC_STATUS.VERIFIED
            ? t('account_transfer_verify_status', { context: profile?.bank?.verifyStatus })
            : t('account_transfer_verify_status_unverified')}
        </Texts.Subtitle2>
        <Box flex={1} justifyContent="space-between" bg="light.0">
          <Box>
            {transferData.map((item, idx) => (
              <Box
                row
                justifyContent="space-between"
                yalign="center"
                py="3"
                px="4"
                borderBottomWidth={2}
                borderColor="light.1"
                key={idx}
              >
                <Texts.Subtitle1 color="dark.0">
                  {t(`bank_input_label_${item.labelI18nKey}`)}
                </Texts.Subtitle1>
                <Texts.Body2 color="gray.0">{item.data}</Texts.Body2>
              </Box>
            ))}
          </Box>
          <Button
            title={t('account_change_transfer')}
            m="4"
            mt="8"
            disabled={!profile?.bank?.verifiedAt}
            onPress={handlePressChange}
          />
        </Box>
      </ScreenBox>
    </Box>
  )
}

export default Transfer
