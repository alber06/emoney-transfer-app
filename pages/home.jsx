import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Headline, FAB, Text, Colors } from 'react-native-paper'
import useUser from '../utils/auth/useUser'
import { ETDialog } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    top: '30%',
  },
  text: {
    fontSize: 16,
  },
  username: {
    color: Colors.grey500,
  },
  headline: {
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: '20%',
    alignSelf: 'center',
    backgroundColor: Colors.blueA700,
  },
})

const Home = () => {
  const { user, loading } = useUser()
  const [dialogVisible, setDialogVisible] = useState(false)

  const hideDialog = () => {
    setDialogVisible(false)
  }

  const getLoggedUserContent = () => (
    <View>
      <Text style={styles.text}>
        Hi&nbsp;
        <Text style={styles.username}>{user.email}</Text>
        &nbsp;👋
      </Text>
      <Headline style={styles.headline}>
        {user.amount}
        &nbsp; SPH
      </Headline>
      <FAB style={styles.button} icon="bank-transfer" onPress={() => setDialogVisible((newVisibleState) => !newVisibleState)} />
    </View>
  )

  const getEmptyContent = () =>
    loading ? <ActivityIndicator animating={loading} /> : <Text style={styles.text}>Setting up your account. Please wait...</Text>

  return (
    <View style={styles.container}>
      <View style={styles.content}>{user.email ? getLoggedUserContent() : getEmptyContent()}</View>
      <ETDialog visible={dialogVisible} hideDialog={hideDialog} />
    </View>
  )
}

export default Home
