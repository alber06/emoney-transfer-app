// @generated: @expo/next-adapter@2.1.0
import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, DefaultTheme, Colors } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import ETTopBar from '../components/ETTopBar'
import LogInPage from './login'
import SignUpPage from './signup'
import HomePage from './home'
import useUser from '../utils/auth/useUser'

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
})

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blueA700,
  },
}

const AppNavigator = () => {
  const [isReady, setIsReady] = useState()
  const { authUser } = useUser()

  const getAuthStack = () => (
    <>
      <Stack.Screen
        name="LogIn"
        component={LogInPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{
          headerShown: false,
        }}
      />
    </>
  )

  const getMainStack = () => (
    <>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: true,
        }}
      />
    </>
  )

  return (
    <PaperProvider theme={theme}>
      {!authUser ? (
        <AppLoading onError={console.warn} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            headerMode="screen"
            screenOptions={{
              header: (props) => <ETTopBar {...props} />,
              cardStyle: styles.container,
            }}
          >
            {authUser && authUser.token ? getMainStack() : getAuthStack()}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </PaperProvider>
  )
}

export default AppNavigator
