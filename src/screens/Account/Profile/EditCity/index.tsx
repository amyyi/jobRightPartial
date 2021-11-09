import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { apiUpdateUserProfile, TW_CITY } from '@/apis/user'
import { Box, Button, Field, FieldOptions, ScreenBox, useForm, useToast } from '@/components/'
import { SelectInputRefProps } from '@/components/basic/Form/Input/SelectInput'
import { useCommonError } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'

export interface RouteParamEditCity {
  initialValue: string
}

const TW_CITY_ITEMS = TW_CITY.map((v) => ({ label: v, value: v }))

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.EDIT_CITY>> = ({
  route,
  navigation,
}) => {
  const { initialValue } = route.params
  const { t } = useTranslation()
  const { showError } = useCommonError()
  const toast = useToast()
  const inputList: FieldOptions[] = [
    {
      name: 'city',
      type: 'select',
      items: TW_CITY_ITEMS,
      initialValue,
    },
  ]

  const [{ fields, isValid }, handleSubmit] = useForm(inputList)
  const cityRef = useRef<SelectInputRefProps>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((formData: any) => {
    if (!isValid) {
      toast({
        type: 'error',
        title: t('common_error_info'),
      })
      return
    }
    apiUpdateUserProfile({ city: formData.city })
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
          ref={cityRef}
          label={t('account_profile_input_label_city')}
          placeholder={t('account_profile_input_placeholder_city')}
          {...fields.city}
        />
      </Box>
      <Box borderTopWidth={1} borderColor="gray.3">
        <Button title={t('account_submit')} mx="4" my="4" onPress={onSubmit} />
      </Box>
    </ScreenBox>
  )
}

export default Screen
