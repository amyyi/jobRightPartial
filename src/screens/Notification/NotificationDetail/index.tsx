import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useEffect } from 'react'

import { apiGetNotification, apiReadNotification } from '@/apis/notification'
import { ScreenBox, StretchLoading, Texts } from '@/components/'
import { DataEmpty } from '@/components/project/DataEmpty'
import { useFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/interfaces'
import Day from '@/utils/date'

export interface RouteParamNotificationItem {
  id: string
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.NOTIFICATION_ITEM>> = ({ route }) => {
  const [state, api] = useFetch(apiGetNotification)
  const detail = state.data

  useEffect(() => {
    api(route.params.id)
    apiReadNotification(route.params.id)
  }, [route.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (state.isLoading) {
    return (
      <ScreenBox>
        <StretchLoading />
      </ScreenBox>
    )
  }

  if (!detail) {
    return <DataEmpty />
  }

  return (
    <ScreenBox scrollable>
      <Texts.H5>{detail?.title}</Texts.H5>
      <Texts.Body2 color="dark.1" my={3}>
        {detail?.content}
      </Texts.Body2>
      <Texts.Body3 color="gray.0">
        {detail?.publishedTime && new Day(detail?.publishedTime).format('YYYY/MM/DD HH:mm')}
      </Texts.Body3>
    </ScreenBox>
  )
}

export default Screen
