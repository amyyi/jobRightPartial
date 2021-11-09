import React, { FC } from 'react'
import { Rect } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

import { Box } from '@/components/basic/Box'
import { ScrollBox } from '@/components/basic/Scroll'
import { SkeletonLoader } from '@/components/basic/SkeletonLoader'

// TODO combine with JobLoadingList
const skeletonValues = [
  { Tag: Rect, x: 20, y: 16, r: 11, w: 66, h: 66 },
  { Tag: Rect, x: 100, y: 15, r: 11, w: 69, h: 19 },
  { Tag: Rect, x: 100, y: 45, r: 11, w: 260, h: 21 },
  { Tag: Rect, x: 100, y: 85, r: 11, w: 150, h: 15 },
]

const NotificationLoadingItem: FC = () => {
  const { colors } = useTheme()
  const bg = colors.gray[3]
  const fg = colors.light[1]

  return (
    <Box mb={1} bg="light.0">
      <SkeletonLoader width={375} height={120} bg={bg} fg={fg}>
        {skeletonValues.map(({ Tag, r, w, h, ...rest }, i) => (
          <Tag key={i} rx={r} width={w} height={h} {...rest} fill={bg} />
        ))}
      </SkeletonLoader>
    </Box>
  )
}

export const NotificationLoadingList: FC = () => {
  return (
    <Box position="absolute" width="100%" height="100%" bg="light.1">
      <ScrollBox>
        {Array.from(new Array(10)).map((v, i) => (
          <NotificationLoadingItem key={i} />
        ))}
      </ScrollBox>
    </Box>
  )
}
