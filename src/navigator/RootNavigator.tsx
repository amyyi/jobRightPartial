import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { enableScreens } from 'react-native-screens'
import { useTheme } from 'styled-components/native'

import { useUserStore } from '@/stores/user'

import { SCREEN_TYPE, SCREENS } from './interfaces'
import { bottomTabRoutes, modalRoutes, privateRoutes, publicRoutes } from './routes'
import StackNavigator from './StackNavigator'

enableScreens()

const Tab = createBottomTabNavigator()
const publicInitialRouteName = SCREENS.AUTHENTICATION
const privateInitialRouteName = SCREENS.HOME

const TabNavigator: FC = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName={privateInitialRouteName}
      tabBarOptions={{
        activeTintColor: colors.primary[0],
        allowFontScaling: false,
        tabStyle: {
          marginBottom: 4,
        },
      }}
    >
      {bottomTabRoutes.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          options={{
            tabBarLabel: t(`${screen.name}_title`),
            tabBarIcon: function renderIcon({ focused, size }) {
              if (!screen.icons) return null
              const Icon = screen.icons[focused ? 'active' : 'inactive']
              return <Icon width={size} height={size} />
            },
          }}
        >
          {() => <StackNavigator screens={[screen]} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  )
}

const PrivateMainNavigator: FC = () => (
  <StackNavigator
    screens={[
      {
        name: SCREENS.TAB,
        component: TabNavigator,
        options: { headerShown: false },
        type: SCREEN_TYPE.INTERNAL,
      },
      ...privateRoutes,
    ]}
  />
)

const PublicMainNavigator: FC = () => (
  <StackNavigator initialRouteName={publicInitialRouteName} screens={publicRoutes} />
)

const Navigator: FC = () => {
  const {
    state: { isAuth },
  } = useUserStore()
  const isAuthenticated = isAuth

  return (
    <NavigationContainer>
      <StackNavigator
        screens={[
          {
            name: SCREENS.MAIN,
            component: isAuthenticated ? PrivateMainNavigator : PublicMainNavigator,
            options: { headerShown: false },
            type: SCREEN_TYPE.INTERNAL,
          },
          ...modalRoutes,
        ]}
        mode="modal"
      />
    </NavigationContainer>
  )
}

export default Navigator
