import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, RefObject, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput as RNTextInput } from 'react-native'

import { apiSetUpUserPinCode } from '@/apis/user'
import {
  Box,
  Button,
  Field,
  FieldOptions,
  Images,
  ScreenBox,
  Texts,
  useForm,
  useToast,
} from '@/components/'
import { useFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'

export interface RouteParamEditPassword {
  isModifyPassword: boolean
  onVerifySuccess?: () => void
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.EDIT_PASSWORD>> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: isModifyPassword ? t('edit_new_password_title') : t('edit_password_title'),
      headerLeft: () => null,
      // eslint-disable-next-line react/display-name
      headerRight: () => <Images.CloseDark size={24} onPress={() => navigation.goBack()} />,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  const { isModifyPassword, onVerifySuccess } = route.params || {}
  const toast = useToast()
  const { t } = useTranslation()
  const inputList: FieldOptions[] = [
    {
      name: 'password',
      type: 'text',
      label: isModifyPassword ? t('edit_new_password') : t('edit_password'),
      validate: (str: string) => {
        const pattern = /^[0-9]{4}$/
        return !!str.match(pattern)
      },
      autoTrim: true,
    },
    {
      name: 'repeatPassword',
      type: 'text',
      label: isModifyPassword ? t('edit_new_repeatPassword') : t('edit_repeatPassword'),
      validate: (str: string) => {
        return str === fields.password.value
      },
      autoTrim: true,
    },
  ]
  const [{ fields, isValid }, handleSubmit] = useForm(inputList)
  const inputRefs: Record<string, RefObject<{ focus: () => void }>> = {
    password: useRef<RNTextInput>(null),
    repeatPassword: useRef<RNTextInput>(null),
  }
  const [state, api] = useFetch(apiSetUpUserPinCode)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((formData: any) => {
    if (!isValid) {
      toast({
        type: 'error',
        title: t('common_error_info'),
      })
      return
    }

    api({
      password: formData.password,
    })
  })

  useEffect(() => {
    if (!state.isComplete) {
      return
    }

    if (isModifyPassword) {
      toast({
        type: 'success',
        title: t('edit_new_password_success'),
      })
    }

    navigation.goBack()
    onVerifySuccess && onVerifySuccess()
  }, [state.isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScreenBox scrollable withKeyboard autoPadding={false}>
      <Box flex={1} ml={5} mr={3}>
        <Texts.Subtitle2 color="gray.0" mt={4} mb={2}>
          {t('exit_password_common_text')}
        </Texts.Subtitle2>
        {inputList.map(({ name }) => (
          <Field
            ref={inputRefs[name]}
            key={name}
            keyboardType="number-pad"
            placeholder="1234"
            secureTextEntry
            {...fields[name]}
          />
        ))}
      </Box>
      <Box borderTopWidth={1} borderColor="gray.3">
        <Button
          title={t('account_submit')}
          mx="4"
          my="4"
          loading={state.isLoading}
          onPress={onSubmit}
        />
      </Box>
    </ScreenBox>
  )
}

export default Screen
