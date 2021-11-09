import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import appConfig from '@/app-config'
import { Box, Images, ScreenBox, Texts } from '@/components/'
import { LocalImageProps } from '@/components/basic/Image/LocalImages'
import { RootStackParamList, SCREENS } from '@/navigator/'
import PWTrigger from '@/screens/Account/passwordTrigger'
import { signOut, useUserStore } from '@/stores/user'

type MORE_SCREENS = SCREENS.INPUT_PASSWORD | SCREENS.CONTACT

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.ACCOUNT_MORE>> = ({ navigation }) => {
  const { t } = useTranslation()
  const { dispatch: userDispatch } = useUserStore()

  const moreList: {
    icon: FC<LocalImageProps>
    text: string
    more?: MORE_SCREENS
    isLogout?: boolean
  }[] = [
    {
      icon: Images.Lock,
      text: 'edit_password',
      more: SCREENS.INPUT_PASSWORD,
    },
    {
      icon: Images.Switch,
      text: 'switch_account',
    },
    {
      icon: Images.Switch,
      text: 'work_overtime_record',
    },
    {
      icon: Images.Switch,
      text: 'patch_checkIn',
    },
    // TODO 待 UI 補 隱私權政策
    {
      icon: Images.Shield,
      text: 'private_policy',
    },
    {
      icon: Images.Microphone,
      text: 'contact_us',
      more: SCREENS.CONTACT,
    },
    {
      icon: Images.Logout,
      text: 'logout',
      isLogout: true,
    },
  ]

  const logout = useCallback(() => {
    PWTrigger.reset()
    userDispatch(signOut())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScreenBox insetBottom={false} autoPadding={false} bg="light.1">
      {moreList.map((item, idx) => {
        const { text, icon: Icon, isLogout, more } = item
        return (
          <Box
            row
            yalign="center"
            justifyContent="space-between"
            py={4}
            px={4}
            borderBottomWidth={2}
            borderColor="light.1"
            bg="light.0"
            key={idx}
            disabled={!more && !isLogout}
            onPress={() => (isLogout ? logout() : navigation.navigate(more as MORE_SCREENS))}
          >
            <Box row yalign="center">
              <Icon size={24} mr={4} />
              <Texts.Button2 color="dark.0">{t(`account_more_${text}`)}</Texts.Button2>
            </Box>
            {more && <Images.ArrowRight size={20} />}
          </Box>
        )
      })}
      <Box xalign="center" mt={4}>
        <Texts.Subtitle1 color="gray.0">{appConfig.displayName}</Texts.Subtitle1>
        <Texts.Body3 color="gray.1" mt={1}>
          {appConfig.version}
        </Texts.Body3>
      </Box>
    </ScreenBox>
  )
}

export default Screen
