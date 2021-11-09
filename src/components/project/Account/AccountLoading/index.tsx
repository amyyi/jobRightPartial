import React, { FC } from 'react'
import { Rect } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

import { Box } from '@/components/basic/Box'
import { ScrollBox } from '@/components/basic/Scroll'
import { SkeletonLoader } from '@/components/basic/SkeletonLoader'

const topSkeletonValues = [
  { Tag: Rect, x: 20, y: 20, r: 11, w: 80, h: 80 },
  { Tag: Rect, x: 123, y: 21, r: 11, w: 71, h: 22 },
  { Tag: Rect, x: 123, y: 58, r: 11, w: 150, h: 14 },
  { Tag: Rect, x: 123, y: 79, r: 11, w: 150, h: 14 },
  { Tag: Rect, x: 30, y: 132, r: 11, w: 83, h: 26 },
  { Tag: Rect, x: 146, y: 132, r: 11, w: 83, h: 26 },
  { Tag: Rect, x: 262, y: 132, r: 11, w: 83, h: 26 },
]
const itemSkeletonValues = [
  { Tag: Rect, x: 20, y: 15, r: 11, w: 169, h: 22 },
  { Tag: Rect, x: 20, y: 45, r: 11, w: 260, h: 14 },
  { Tag: Rect, x: 20, y: 85, r: 11, w: 150, h: 14 },
  { Tag: Rect, x: 20, y: 106, r: 11, w: 150, h: 14 },
  { Tag: Rect, x: 20, y: 135, r: 11, w: 50, h: 14 },
  { Tag: Rect, x: 75, y: 135, r: 11, w: 50, h: 14 },
]

const AccountLoadingTop: FC = () => {
  const { colors } = useTheme()
  const bg = colors.gray[3]
  const fg = colors.light[1]
  return (
    <Box mb={1} bg="light.0">
      <SkeletonLoader width={375} height={171} bg={bg} fg={fg}>
        {topSkeletonValues.map(({ Tag, r, w, h, ...rest }, i) => (
          <Tag key={i} rx={r} width={w} height={h} {...rest} fill={bg} />
        ))}
      </SkeletonLoader>
    </Box>
  )
}

const AccountLoadingItem: FC = () => {
  const { colors } = useTheme()
  const bg = colors.gray[3]
  const fg = colors.light[1]

  return (
    <Box mb={1} bg="light.0">
      <SkeletonLoader width={375} height={164} bg={bg} fg={fg}>
        {itemSkeletonValues.map(({ Tag, r, w, h, ...rest }, i) => (
          <Tag key={i} rx={r} width={w} height={h} {...rest} fill={bg} />
        ))}
      </SkeletonLoader>
    </Box>
  )
}

export const AccountLoading: FC = () => {
  return (
    <Box position="absolute" width="100%" height="100%" bg="light.1">
      <ScrollBox>
        <AccountLoadingTop />
        {Array.from(new Array(10)).map((v, i) => (
          <AccountLoadingItem key={i} />
        ))}
      </ScrollBox>
    </Box>
  )
}
