import React, { FC, RefObject, useRef } from 'react'
import { useTranslation } from 'react-i18next/'
import { TextInput as RNTextInput } from 'react-native'

import { Field, FieldOptions, Texts, useForm, useToast, WorkTimeModal } from '@/components/'
import { SelectInputRefProps } from '@/components/basic/Form/Input/SelectInput'

export enum REMEDY_TYPE {
  CHECK_IN,
  CHECK_OUT,
}

interface RemedyWorkTimeProps {
  visible: boolean
  onCancel: () => void
  type?: REMEDY_TYPE
}
export const RemedyWorkTime: FC<RemedyWorkTimeProps> = ({
  visible,
  onCancel,
  type = REMEDY_TYPE.CHECK_IN,
}) => {
  const { t } = useTranslation()
  const toast = useToast()
  const inputFields: FieldOptions[] = [
    {
      name: 'date',
      type: 'datetime',
      label: t('remedy_work_time_date'),
      placeholder: t('remedy_work_time_placeholder_date'),
      format: 'YYYY-MM-DD',
    },
    {
      name: 'clock',
      type: 'datetime',
      label: t('remedy_work_time_clock'),
      placeholder: t('remedy_work_time_placeholder_clock'),
      format: 'HH:mm',
      mode: 'time',
    },
    {
      name: 'reason',
      type: 'text',
      label: t('remedy_work_time_reason'),
      placeholder: t('remedy_work_time_placeholder_reason'),
    },
  ]
  const [{ fields, canSubmit }, handleSubmit, updateFormValues] = useForm(inputFields)
  const inputRefs: Record<string, RefObject<{ focus: () => void }>> = {
    date: useRef<SelectInputRefProps>(null),
    clock: useRef<SelectInputRefProps>(null),
    reason: useRef<RNTextInput>(null),
  }

  const typeText =
    type === REMEDY_TYPE.CHECK_IN ? t('remedy_work_time_checkIn') : t('remedy_work_time_checkOut')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onConfirm = handleSubmit((formData: any) => {
    // TODO API
    if (canSubmit) {
      toast({
        type: 'success',
        title: t('remedy_work_time_success', { type: typeText }),
      })
      handleClose()
    }
  })

  const handleClose = (): void => {
    onCancel()
    updateFormValues({
      date: null,
      time: null,
      reason: '',
    })
  }

  return (
    <WorkTimeModal
      visible={visible}
      title={t('remedy_work_time_title', { type: typeText })}
      onCancel={handleClose}
      onConfirm={onConfirm}
      confirmText={t('common_ok')}
    >
      <Texts.Caption1 mb={4} color="#000">
        {t('remedy_work_time_subTitle', { type: typeText })}
      </Texts.Caption1>
      {inputFields.map(({ name, label, placeholder }, id) => {
        return (
          <Field
            key={name}
            ref={inputRefs[name]}
            label={label}
            placeholder={placeholder}
            height={id === 2 ? 116 : 44}
            multiline={id === 2}
            py={id === 2 ? 2 : 0}
            textAlignVertical="top"
            {...fields[name]}
          />
        )
      })}
    </WorkTimeModal>
  )
}
