import React, { FC, RefObject, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput as RNTextInput } from 'react-native'

import { apiGetBank } from '@/apis/public'
import {
  Box,
  Button,
  Field,
  FieldOptions,
  ImageUploader,
  StretchLoading,
  useForm,
  useToast,
} from '@/components/'
import { SelectInputRefProps } from '@/components/basic/Form/Input/SelectInput'
import { useFetch } from '@/hooks/'
import NextButton from '@/screens/Kyc/NextButton'
import storage from '@/services/storage'

const BANK_COVER_RATIO = 16 / 9

interface BankFormProps {
  kyc?: boolean
  loading?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onComplete?: (data: any) => void
  initialValues?: {
    name: string
    bank: string
    branch: string
    account: string
    cover: string
  }
}

export const BankForm: FC<BankFormProps> = ({ kyc: isKyc, loading, onComplete, initialValues }) => {
  const { t } = useTranslation()
  const isFirstRender = useRef(true)
  const toast = useToast()
  const inputList: FieldOptions[] = [
    {
      name: 'name',
      type: 'text',
      returnKeyType: 'next',
      initialValue: initialValues?.name,
    },
    {
      name: 'bank',
      type: 'select',
      items: [],
      description: t(`bank_input_description_bank`),
      returnKeyType: 'next',
      initialValue: initialValues?.bank,
    },
    {
      name: 'branch',
      type: 'select',
      items: [],
      returnKeyType: 'next',
      initialValue: initialValues?.branch,
    },
    {
      name: 'account',
      type: 'text',
      keyboardType: 'number-pad',
      autoTrim: true,
      initialValue: initialValues?.account,
    },
    { name: 'cover', type: 'custom', initialValue: initialValues?.cover },
  ]
  const [{ fields, isValid, canSubmit }, handleSubmit, updateFormValues] = useForm(inputList)
  const [stateGBank, apiGBank] = useFetch(apiGetBank)
  const inputRefs: Record<string, RefObject<{ focus: () => void }>> = {
    name: useRef<RNTextInput>(null),
    bank: useRef<SelectInputRefProps>(null),
    branch: useRef<RNTextInput>(null),
    account: useRef<RNTextInput>(null),
  }

  useEffect(() => {
    // reset branch when bank was change, avoid re-trigger update branch
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const formData = Object.entries(fields).reduce(
      (obj, [key, attrs]) => ({
        ...obj,
        [key]: attrs.value,
      }),
      {},
    )
    updateFormValues({
      ...formData,
      branch: '',
    })
  }, [fields.bank.value]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const formData = Object.entries(fields).reduce(
      (obj, [key, attrs]) => ({
        ...obj,
        [key]: attrs.value,
      }),
      {},
    )
    const kycStorage = storage.getData(storage.ENTITY.KYC_FORM)
    storage.setData(storage.ENTITY.KYC_FORM, { ...kycStorage, bank: formData })
  }, [fields])

  useEffect(() => {
    apiGBank()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((formData: any) => {
    if (isValid) {
      onComplete && onComplete(formData)
    } else {
      toast({
        type: 'error',
        title: t('common_error_info'),
      })
    }
  })

  if (!stateGBank.data || stateGBank.data?.length <= 0) {
    return <StretchLoading />
  }

  return (
    <Box>
      <Box mx={4} my={4}>
        {inputList.slice(0, -1).map(({ name }, i) => {
          if (name === 'bank' && stateGBank.data) {
            fields[name].items = stateGBank.data.map(({ name: bank }) => ({
              label: bank,
              value: bank,
            }))
          } else if (name === 'branch' && fields.bank.value) {
            fields[name].items = stateGBank.data
              ?.find(({ name: bank }) => bank === fields.bank.value)
              ?.branch.map(({ name: branch }) => ({
                label: branch,
                value: branch,
              }))
          }
          return (
            <Field
              key={name}
              ref={inputRefs[name]}
              label={t(`bank_input_label_${name}`)}
              placeholder={t(`bank_input_placeholder_${name}`)}
              onSubmitEditing={() => {
                if (fields[name].returnKeyType === 'next') {
                  // workaround to focus input
                  setTimeout(() => {
                    inputRefs[inputList[i + 1].name]?.current?.focus()
                  }, 250)
                }
              }}
              {...fields[name]}
            />
          )
        })}

        <ImageUploader
          mb={4}
          showFocusFrame
          label={t('bank_input_label_photo')}
          description={t('bank_uploader_cover_desc')}
          subLabel={t('bank_uploader_cover_sub_label')}
          ratio={BANK_COVER_RATIO}
          watermarkText={t('bank_uploader_cover_watermark')}
          iconType="camera"
          initialValue={initialValues?.cover || ''}
          {...fields.cover}
        />
      </Box>

      {isKyc && (
        <Box mr={4}>
          <NextButton disabled={!canSubmit} onPress={onSubmit} />
        </Box>
      )}
      {!isKyc && (
        <Box borderTopWidth={1} borderColor="gray.3">
          <Button title={t('account_submit')} loading={loading} mx="4" my="4" onPress={onSubmit} />
        </Box>
      )}
    </Box>
  )
}
