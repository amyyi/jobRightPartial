import React, { FC } from 'react'
import { Modal as RNModal } from 'react-native'

import { Box } from '@/components/basic/Box'
import { Button } from '@/components/basic/Button'
import { Images } from '@/components/basic/Image'
import { ScreenBox } from '@/components/basic/ScreenBox'
import { Texts } from '@/components/basic/Text'

interface ModalProps {
  title: string
  visible: boolean
  onCancel: () => void
  onConfirm: () => void
  confirmText: string
}

export const WorkTimeModal: FC<ModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  title,
  children,
  confirmText,
}) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onCancel}
    >
      <ScreenBox autoPadding={false} insetBottom>
        <Box pt={7} px={4} pb={3} borderBottomWidth={1} borderColor="gray.3">
          <Box row justifyContent="flex-end" yalign="center">
            <Box position="absolute" width="100%" height="100%" xalign="center" yalign="center">
              <Texts.Subtitle2 allowFontScaling={false} numberOfLines={1}>
                {title}
              </Texts.Subtitle2>
            </Box>

            <Images.CloseDark size={24} onPress={onCancel} />
          </Box>
        </Box>

        <Box flex={1} p={4}>
          {children}
        </Box>

        <Box p={4} borderTopWidth={1} borderColor="gray.3">
          <Button title={confirmText} onPress={onConfirm} />
        </Box>
      </ScreenBox>
    </RNModal>
  )
}
