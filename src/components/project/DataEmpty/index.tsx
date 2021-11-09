import React, { FC } from 'react'
import { useTranslation } from 'react-i18next/'

import { Box } from '@/components/basic/Box'
import { Images } from '@/components/basic/Image'
import { Texts } from '@/components/basic/Text'

export const DataEmpty: FC = () => {
  const { t } = useTranslation()

  return (
    <Box pt={4} xalign="center">
      <Images.ImageEmpty size={80} />
      <Texts.H6 mt={4} mb={2} textAlign="center">
        {t('common_empty')}
      </Texts.H6>
    </Box>
  )
}
