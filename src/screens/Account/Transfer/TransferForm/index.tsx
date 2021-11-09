import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { apiUpdateUserBank, ParamsUpdateUserBank } from '@/apis/user'
import { ScreenBox, useToast } from '@/components/'
import BankForm from '@/components/project/BankForm'
import { useFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/'

export interface RouteParamTransferForm {
  bankFormObj: {
    name: string
    bank: string
    branch: string
    account: string
    cover: string
  }
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.TRANSFER_FORM>> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation()
  const { bankFormObj } = route.params
  const [state, api] = useFetch(apiUpdateUserBank)
  const toast = useToast()

  useEffect(() => {
    if (state.isComplete) {
      toast({ type: 'info', title: t('account_transfer_submit_toast') })
      navigation.goBack()
    }
  }, [state.isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = (data: ParamsUpdateUserBank): void => {
    // not need to modify when cover is not uploaded
    if (typeof data.cover === 'string') {
      data.cover = undefined
    }
    api(data)
  }

  return (
    <ScreenBox scrollable withKeyboard autoPadding={false}>
      <BankForm initialValues={bankFormObj} loading={state.isLoading} onComplete={handleUpdate} />
    </ScreenBox>
  )
}

export default Screen
