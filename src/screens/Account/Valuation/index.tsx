import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { apiUpdateUserProfile } from '@/apis/user'
import { Box, Button, Images, ImageUploader, Texts } from '@/components/'
import { SCREENS } from '@/navigator/interfaces'
import storage from '@/services/storage'
import { useUserStore } from '@/stores/user'
import { KYC_STATUS } from '@/stores/user/reducers'

const Valuation: FC = () => {
  const { t } = useTranslation()
  const { state: userState } = useUserStore()
  const splitValue = (Math.round(userState.reviewScore * 2) / 2).toString().split('.')
  const navigation = useNavigation()
  return (
    <Box
      row
      yalign="center"
      my={0}
      px={4}
      py={4}
      backgroundColor="light.0"
      borderColor="light.1"
      borderBottomWidth={1}
    >
      <Box>
        <Box overflow="hidden" size={80} borderWidth={1} borderRadius={3} borderColor="gray.2">
          <ImageUploader
            ratio={1}
            iconSize="small"
            disabled={userState.kycStatus !== KYC_STATUS.VERIFIED}
            initialValue={userState.images.avatar}
            onValueChange={(file) => apiUpdateUserProfile({ avatar: file })}
            defaultComponent={<Images.DefAvatar stretched />}
          />
        </Box>
        <Texts.Caption2 color="gray.0" mt={1} align="center">
          {t('account_mid', { id: userState.id })}
        </Texts.Caption2>
      </Box>
      <Box ml={4}>
        <Texts.Subtitle1 color="dark.0">
          {userState.profile?.name || t('account_not_verify')}
        </Texts.Subtitle1>
        {userState.kycStatus !== KYC_STATUS.VERIFIED && (
          <Button
            mt={2}
            title={t('account_verify_action', { context: userState.kycStatus })}
            alignSelf="flex-start"
            height="auto"
            px={3}
            py={2}
            disabled={userState.kycStatus === KYC_STATUS.PROCEEDING}
            onPress={() => {
              navigation.navigate(SCREENS.KYC, {
                name: storage.getData(storage.ENTITY.KYC_INTERRUPTED_SCREEN),
              })
            }}
          />
        )}
        {userState.kycStatus === KYC_STATUS.VERIFIED && (
          <Box row mt={2}>
            {[0, 1, 2, 3, 4].map((item, idx) => {
              if (Number(splitValue[0]) > idx) {
                return <Images.StarBlue size={16} key={idx} />
              } else if (Number(splitValue[0]) === idx && splitValue[1]) {
                return <Images.StarHalfBlue size={16} key={idx} />
              } else {
                return <Images.StarGray size={16} key={idx} />
              }
            })}
            <Texts.Caption2 color="dark.0" ml={1}>
              {userState.reviewScore || t('account_empty_value')}
            </Texts.Caption2>
          </Box>
        )}
        <Box row yalign="center" mt={2}>
          <Images.InfoGray1 size={16} mr={1} />
          <Texts.Caption2 color="gray.1">
            {t('account_verify_desc', { context: userState.kycStatus })}
          </Texts.Caption2>
        </Box>
      </Box>
    </Box>
  )
}

export default Valuation
