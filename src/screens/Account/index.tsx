import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Images, ScreenBox, TabGroup } from '@/components/'
import { AccountLoading } from '@/components/project/Account/AccountLoading'
import { RootStackParamList, SCREENS } from '@/navigator/'
import PWTrigger from '@/screens/Account/passwordTrigger'
import { getUserProfile, useUserStore } from '@/stores/user'
import { KYC_STATUS } from '@/stores/user/reducers'

import FavoriteJobs from './FavoriteJobs'
import Profile from './Profile'
import Transfer from './Transfer'
import Valuation from './Valuation'

enum ACCOUNT_TABS_STATUS {
  FAVORITE_JOBS = 'favorite jobs',
  TRANSFER = 'transfer',
  PROFILE = 'profile',
}

export interface RouteParamAccount {
  initialCurTab: number
}

const Screen: FC<StackScreenProps<RootStackParamList, SCREENS.ACCOUNT>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()
  const { state: userState, dispatch: userDispatch } = useUserStore()
  const { initialCurTab = 0 } = route.params || {}
  const [curTab, setCurTab] = useState(initialCurTab)
  const [loading, setLoading] = useState(true)
  const refNextTab = useRef(curTab)

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Images.MorePoint size={24} onPress={() => navigation.navigate(SCREENS.ACCOUNT_MORE)} />
      ),
    })
  }, [navigation])

  const tabList = useMemo(() => {
    let tabs = [
      {
        name: t('account_tab_fav_job'),
        value: ACCOUNT_TABS_STATUS.FAVORITE_JOBS,
      },
    ]
    if (userState.kycStatus !== KYC_STATUS.NONE) {
      tabs = [
        ...tabs,
        ...[
          {
            name: t('account_tab_transfer'),
            value: ACCOUNT_TABS_STATUS.TRANSFER,
          },
          {
            name: t('account_tab_profile'),
            value: ACCOUNT_TABS_STATUS.PROFILE,
          },
        ],
      ]
    }
    return tabs
  }, [userState.kycStatus, t])

  useFocusEffect(
    useCallback(() => {
      userDispatch(getUserProfile())
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    if (userState.profile) {
      setLoading(false)
    }
  }, [userState.profile])

  // if verify password success, change tab
  const onVerifySuccess = useCallback(() => {
    if (refNextTab.current !== curTab) {
      setCurTab(refNextTab.current)
      PWTrigger.setCounter()
    }
  }, [curTab])

  if (loading) {
    return <AccountLoading />
  }

  return (
    <ScreenBox backgroundColor="light.1" autoPadding={false} insetBottom={false}>
      <Valuation />
      <Box py={2} bg="light.0">
        <TabGroup
          tabs={tabList}
          curTabIndex={curTab}
          tabWidth={120}
          onTabChange={(index) => {
            if (index === 0 || PWTrigger.getVerifyStatus()) {
              setCurTab(index)
              return
            }
            refNextTab.current = index
            navigation.navigate(SCREENS.INPUT_PASSWORD, {
              isModifyPassword: false,
              onVerifySuccess,
            })
          }}
        />
      </Box>

      {(() => {
        switch (curTab) {
          case 1:
            return <Transfer />
          case 2:
            return <Profile />
          default:
            return <FavoriteJobs />
        }
      })()}
    </ScreenBox>
  )
}

export default Screen
