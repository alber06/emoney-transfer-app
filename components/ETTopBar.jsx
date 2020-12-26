import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import useUser from '../utils/auth/useUser'

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
})

const ETTopBar = () => {
  const { logout } = useUser()

  return (
    <Appbar.Header>
      <Appbar.Content title="Emoney Transfer" titleStyle={styles.title} />
      <Appbar.Action icon="logout" onPress={logout} />
    </Appbar.Header>
  )
}

export default ETTopBar
