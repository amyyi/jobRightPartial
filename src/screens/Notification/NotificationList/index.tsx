import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SvgUri } from 'react-native-svg'

import { apiGetNotificationList, apiReadAllNotification } from '@/apis/notification'
import images from '@/assets/images'
import {
  Box,
  FlatList,
  Images,
  NotificationLoadingList,
  ScreenBox,
  StretchImage,
  Texts,
} from '@/components/'
import { useCommonError, usePagingFetch } from '@/hooks/'
import { RootStackParamList, SCREENS } from '@/navigator/interfaces'
import Day from '@/utils/date'

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.NOTIFICATION>> = ({ navigation }) => {
  const { t } = useTranslation()
  const { showError } = useCommonError()
  const [state, refreshApi, endReachApi] = usePagingFetch(apiGetNotificationList)
  const [isLoading, setIsLoading] = useState(true)
  const list = state.list || []

  useEffect(() => {
    const lockReadAll = list.length <= 0 || list.every(({ isRead }) => isRead)
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Box disabled={lockReadAll} onPress={readAll}>
          <Texts.Button2 color={lockReadAll ? 'gray.1' : 'dark.0'}>
            {t('notification_read_all')}
          </Texts.Button2>
        </Box>
      ),
    })
  }, [list]) // eslint-disable-line react-hooks/exhaustive-deps

  useFocusEffect(
    useCallback(() => {
      refreshApi({})
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    setIsLoading(state.isLoading)
  }, [state.isLoading])

  const readAll = (): void => {
    apiReadAllNotification()
      .toPromise()
      .then(() => refreshApi({}))
      .catch((err) => showError(err))
  }

  const renderCompanyIcon = (icon: string): Element => {
    const isSvg = icon && icon.split(/[#?]/)[0].split('.').pop()?.trim() === 'svg'
    return isSvg ? (
      <SvgUri width="100%" height="100%" uri={icon} />
    ) : (
      <StretchImage uri={icon} fallbackFile={images.CircleSystem} />
    )
  }

  const renderIcon = (type: string, icon: string): Element => {
    switch (type) {
      case 'complete':
        return <Images.CircleComplete size={66} />
      case 'error':
        return <Images.CircleError size={66} />
      case 'salary':
        return <Images.CircleSalary size={66} />
      case 'company':
        return (
          <Box
            width={66}
            height={66}
            borderRadius={100}
            borderWidth="1"
            borderColor="gray.2"
            overflow={'hidden'}
          >
            {renderCompanyIcon(icon)}
          </Box>
        )
      default:
        return <Images.CircleSystem size={66} />
    }
  }

  const listBg = (isRead: boolean): string => (isRead ? 'light.0' : 'primary.3')

  return (
    <ScreenBox autoPadding={false} insetBottom={false} bg="light.0">
      <FlatList
        data={list}
        renderItem={({ item }) => {
          return (
            <Box
              row
              backgroundColor={listBg(item.isRead)}
              px={4}
              py={3}
              key={item.id}
              onPress={() => navigation.navigate(SCREENS.NOTIFICATION_ITEM, { id: item.id })}
            >
              {renderIcon(item.type, item.icon)}
              <Box ml={2} flex={1} minHeight={66} yalign="center">
                <Texts.Subtitle2 numberOfLines={1}>{item.title}</Texts.Subtitle2>
                <Texts.Body3 my={1} color="dark.1" numberOfLines={3}>
                  {item.content}
                </Texts.Body3>
                <Texts.Caption2 color="gray.0">
                  {new Day(item.publishedTime).format('YYYY/MM/DD HH:mm')}
                </Texts.Caption2>
              </Box>
            </Box>
          )
        }}
        ListEmptyComponent={
          <Box pt={4} xalign="center">
            <Images.EmptyNotification size={80} />
            <Texts.H6 mt={4} mb={2} textAlign="center">
              {t('notification_empty')}
            </Texts.H6>
            <Texts.Body2 color="dark.1" mb={4}>
              {t('notification_empty_subText')}
            </Texts.Body2>
          </Box>
        }
        refreshing={false}
        onRefresh={() => refreshApi({})}
        onEndReached={() => endReachApi({})}
      />
      {!state.list.length && isLoading && <NotificationLoadingList />}
    </ScreenBox>
  )
}

export default Screen
