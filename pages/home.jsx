import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActivityIndicator, Headline, Button, Text, Colors } from 'react-native-paper'
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
    borderRadius: 50 / 2,
    width: 70,
    alignSelf: 'center',
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
      <Button mode="contained" onPress={() => setDialogVisible((newVisibleState) => !newVisibleState)} style={styles.button}>
        <Icon name="exchange" size={20} />
      </Button>
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
