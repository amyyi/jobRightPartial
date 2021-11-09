import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { RespGetUserProfile } from '@/apis/user'
import { Box, Images, ScreenBox, Texts } from '@/components/'
import { RootStackParamList, SCREENS } from '@/navigator/'
import { useUserStore } from '@/stores/user'

const CanEditFields: {
  labelI18nKey: string
  field: keyof RespGetUserProfile
  screens: SCREENS.EDIT_CITY | SCREENS.EDIT_EMAIL
}[] = [
  {
    labelI18nKey: 'city',
    field: 'city',
    screens: SCREENS.EDIT_CITY,
  },
  {
    labelI18nKey: 'email',
    field: 'email',
    screens: SCREENS.EDIT_EMAIL,
  },
]

const CanNotEditFields: {
  labelI18nKey: string
  field: keyof RespGetUserProfile
}[] = [
  {
    labelI18nKey: 'name',
    field: 'name',
  },
  {
    labelI18nKey: 'phone',
    field: 'mobile',
  },
  {
    labelI18nKey: 'identity',
    field: 'identity',
  },
  {
    labelI18nKey: 'birthday',
    field: 'birthday',
  },
]

const Profile: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, SCREENS.ACCOUNT>>()
  const { t } = useTranslation()
  const {
    state: { profile },
  } = useUserStore()

  return (
    <Box flex={1}>
      <ScreenBox scrollable autoPadding={false} insetBottom={false} bg="light.1">
        <Box bg="light.0" mt={2}>
          {CanEditFields.map((item) => (
            <Box
              row
              justifyContent="space-between"
              yalign="center"
              py="3"
              px="4"
              borderBottomWidth={2}
              borderColor="light.1"
              key={item.field}
              onPress={() => {
                navigation.navigate(item.screens, {
                  initialValue: profile?.[item.field] as string,
                })
              }}
            >
              <Texts.Subtitle1 color="dark.0">
                {t(`account_profile_${item.labelI18nKey}`)}
              </Texts.Subtitle1>
              <Box row yalign="center">
                <Texts.Subtitle1 color="gray.0">{profile?.[item.field]}</Texts.Subtitle1>
                <Images.ArrowRight size={20} ml="2" />
              </Box>
            </Box>
          ))}
        </Box>
        <Box px="4" pt="8" pb="2">
          <Texts.Subtitle2 color="gray.0">{t('account_profile_text')}</Texts.Subtitle2>
        </Box>
        <Box bg="light.0">
          {CanNotEditFields.map((item) => (
            <Box
              row
              justifyContent="space-between"
              yalign="center"
              py="3"
              px="4"
              borderBottomWidth={2}
              borderColor="light.1"
              key={item.field}
            >
              <Texts.Subtitle1 color="dark.0">
                {t(`account_profile_${item.labelI18nKey}`)}
              </Texts.Subtitle1>
              <Texts.Body2 color="gray.0">{profile?.[item.field]}</Texts.Body2>
            </Box>
          ))}
        </Box>
      </ScreenBox>
    </Box>
  )
}

export default Profile
