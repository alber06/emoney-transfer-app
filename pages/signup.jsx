import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Colors } from 'react-native-paper'
import { ETTextInput, ETHeadline, ETFooter } from '../components/auth'
import { ETSnackbar } from '../components'
import useUser from '../utils/auth/useUser'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headline: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: { flex: 3 },
})

const SignUp = ({ navigation }) => {
  const { signup, loading } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordsError, setPasswordsError] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('')
      setPassword('')
      setRepeatPassword('')
    })

    return unsubscribe
  }, [navigation])

  const onSubmit = async () => {
    if (password !== repeatPassword) {
      setErrorMessage('Passwords does not match')
      setPasswordsError(true)
      return
    }

    setErrorMessage('')
    setPasswordsError(false)

    try {
      await signup(email, password)
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ETHeadline />
      <View style={styles.form}>
        <ETTextInput label="Email" icon="envelope" value={email} onChangeText={(newEmail) => setEmail(newEmail)} />
        <ETTextInput
          label="Password"
          icon="lock"
          value={password}
          onChangeText={(newPassword) => setPassword(newPassword)}
          secureTextEntry
          error={Boolean(passwordsError)}
        />
        <ETTextInput
          label="Repeat Password"
          icon="lock"
          value={repeatPassword}
          onChangeText={(newRepeatPassword) => setRepeatPassword(newRepeatPassword)}
          secureTextEntry
          error={Boolean(passwordsError)}
        />
        <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
          SignUp
        </Button>
        <ETFooter text="Already registered?&nbsp;" linkText="LogIn" linkName="LogIn" />
      </View>
      <ETSnackbar
        onDismiss={() => {
          setErrorMessage('')
        }}
        text={errorMessage}
        color={Colors.redA700}
      />
    </KeyboardAvoidingView>
  )
}

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default SignUp
