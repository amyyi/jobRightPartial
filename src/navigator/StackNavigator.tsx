import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components/native'

import { Images, textTypography } from '@/components/'

import { Route } from './routes'

interface StackNavigatorProps {
  mode?: 'card' | 'modal' | undefined
  screens: Route[]
  initialRouteName?: string
  options?: StackNavigationOptions
}

const Stack = createStackNavigator()
const StackNavigator: FC<StackNavigatorProps> = ({
  mode = 'card',
  screens,
  initialRouteName,
  options: stackOptions,
}) => {
  const { space } = useTheme()
  const { t } = useTranslation()

  return (
    <Stack.Navigator mode={mode} initialRouteName={initialRouteName}>
      {screens.map((c, i) => (
        <Stack.Screen
          key={i}
          name={c.name}
          component={c.component}
          options={{
            title: t(`${c.name}_title`),
            headerLeftContainerStyle: {
              paddingHorizontal: space[4],
            },
            headerTitleStyle: {
              paddingHorizontal: space[4],
              ...textTypography.Subtitle2,
            },
            headerRightContainerStyle: {
              paddingHorizontal: space[4],
            },
            headerBackImage: () => <Images.Back size={24} />, // eslint-disable-line react/display-name
            headerBackTitleVisible: false,
            ...stackOptions,
            ...c.options,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}

export default StackNavigator
