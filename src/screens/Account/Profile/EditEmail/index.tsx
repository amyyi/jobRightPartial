import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput as RNTextInput } from 'react-native'

import { apiUpdateUserProfile } from '@/apis/user'
import { Box, Button, Field, FieldOptions, ScreenBox, useForm, useToast } from '@/components/'
import { useCommonError } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'

export interface RouteParamEditEmail {
  initialValue: string
}
const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.EDIT_EMAIL>> = ({
  route,
  navigation,
}) => {
  const { initialValue } = route.params
  const { t } = useTranslation()
  const { showError } = useCommonError()
  const toast = useToast()
  const inputList: FieldOptions[] = [
    {
      name: 'email',
      type: 'text',
      validate: (str: string) => {
        const pattern = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
        return !!str.match(pattern)
      },
      autoTrim: true,
      initialValue,
    },
  ]
  const [{ fields, isValid }, handleSubmit] = useForm(inputList)
  const emailRef = useRef<RNTextInput>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((formData: any) => {
    if (!isValid) {
      toast({
        type: 'error',
        title: t('common_error_info'),
      })
      return
    }
    apiUpdateUserProfile({ email: formData.email })
      .toPromise()
      .then(() => {
        navigation.goBack()
      })
      .catch((err) => showError(err))
  })

  return (
    <ScreenBox scrollable withKeyboard autoPadding={false}>
      <Box mx={4} my={4} flex={1}>
        <Field
          ref={emailRef}
          label={t('account_profile_input_label_email')}
          placeholder={t('account_profile_input_placeholder_email')}
          {...fields.email}
          footnote={t('account_profile_input_footnote_email')}
        />
      </Box>
      <Box borderTopWidth={1} borderColor="gray.3">
        <Button title={t('account_submit')} mx="4" my="4" onPress={onSubmit} />
      </Box>
    </ScreenBox>
  )
}

export default Screen
