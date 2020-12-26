import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, StyleSheet } from 'react-native'
import { Headline, Avatar } from 'react-native-paper'

const styles = StyleSheet.create({
  headline: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const ETHeadline = () => (
  <View style={styles.headline}>
    <Avatar.Image size={60} source={require('../../assets/icon.png')} style={{ backgroundColor: '#fff' }} />
    <Headline>Emoney Transfer</Headline>
  </View>
)

export default ETHeadline
