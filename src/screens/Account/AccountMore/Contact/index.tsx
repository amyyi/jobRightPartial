import { StackScreenProps } from '@react-navigation/stack'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Texts } from '@/components/'
import { RootStackParamList, SCREENS } from '@/navigator/'

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.ACCOUNT_MORE>> = () => {
  const { t } = useTranslation()
  return (
    <Box flex={1} pt={173} xalign="center" bg="light.0">
      <Texts.Caption1 color="gray.0" textAlign="center">
        {t('contact_text')}
      </Texts.Caption1>
    </Box>
  )
}

export default Screen
