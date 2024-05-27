import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Colors } from 'react-native-paper'
import { ETTextInput, ETHeadline, ETFooter } from '../components/auth'
import useUser from '../utils/auth/useUser'
import { ETSnackbar } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  form: { flex: 3 },
})

const Login = ({ navigation }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const { login, loading } = useUser()

  const onSubmit = async () => {
    try {
      await login(email, password)
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('')
      setPassword('')
    })

    return unsubscribe
  }, [navigation])

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
        />
        <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
          Login
        </Button>
        <ETFooter text="Not registered?&nbsp;" linkText="SignUp" linkName="SignUp" />
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

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default Login
